import { defineConfig, loadEnv } from 'vite';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';

const parseJsonBody = async (req: any): Promise<any> => {
  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  if (chunks.length === 0) return {};
  return JSON.parse(Buffer.concat(chunks).toString('utf8'));
};

const devGeminiApiPlugin = (env: Record<string, string>) => ({
  name: 'dev-gemini-api',
  configureServer(server: any) {
    server.middlewares.use('/api/gemini', async (req: any, res: any) => {
      if (req.method !== 'POST') {
        res.statusCode = 405;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'Method not allowed' }));
        return;
      }

      const apiKey = env.GEMINI_API_KEY || process.env.GEMINI_API_KEY;
      const model = env.GEMINI_MODEL || process.env.GEMINI_MODEL || 'gemini-3-flash-preview';
      if (!apiKey) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'Missing GEMINI_API_KEY in server env' }));
        return;
      }

      try {
        const body = await parseJsonBody(req);
        const messages = Array.isArray(body?.messages) ? body.messages : [];
        const systemInstruction =
          typeof body?.systemInstruction === 'string' && body.systemInstruction.trim().length > 0
            ? body.systemInstruction
            : 'You are a concise financial copilot. Give practical, educational guidance and clearly state assumptions. Do not claim certainty.';

        const contents = messages
          .filter((message: any) => (message?.type === 'user' || message?.type === 'ai') && typeof message?.content === 'string')
          .map((message: any) => ({
            role: message.type === 'user' ? 'user' : 'model',
            parts: [{ text: message.content }],
          }));

        if (contents.length === 0) {
          res.statusCode = 400;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'At least one valid message is required' }));
          return;
        }

        const geminiResponse = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              systemInstruction: { parts: [{ text: systemInstruction }] },
              contents,
            }),
          },
        );

        const geminiData = await geminiResponse.json().catch(() => ({}));

        if (!geminiResponse.ok) {
          res.statusCode = geminiResponse.status;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: geminiData?.error?.message || 'Gemini API request failed' }));
          return;
        }

        const reply = geminiData?.candidates?.[0]?.content?.parts
          ?.map((part: { text?: string }) => part.text || '')
          .join('')
          .trim();

        if (!reply) {
          res.statusCode = 502;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Gemini returned an empty response' }));
          return;
        }

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ reply }));
      } catch (error) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(
          JSON.stringify({
            error: error instanceof Error ? error.message : 'Unexpected server error',
          }),
        );
      }
    });
  },
});

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
      tailwindcss(),
      devGeminiApiPlugin(env),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    assetsInclude: ['**/*.svg', '**/*.csv'],
  };
});
