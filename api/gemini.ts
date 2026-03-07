interface ChatMessage {
  type: 'user' | 'ai';
  content: string;
}

const DEFAULT_MODEL = process.env.GEMINI_MODEL || 'gemini-3-flash-preview';

const json = (res: any, status: number, payload: unknown) => {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(payload));
};

const parseBody = async (req: any): Promise<any> => {
  if (req.body && typeof req.body === 'object') {
    return req.body;
  }

  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }

  if (chunks.length === 0) {
    return {};
  }

  return JSON.parse(Buffer.concat(chunks).toString('utf8'));
};

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return json(res, 405, { error: 'Method not allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return json(res, 500, { error: 'Missing GEMINI_API_KEY on server' });
  }

  try {
    const body = await parseBody(req);
    const inputMessages = Array.isArray(body?.messages) ? body.messages : [];
    const systemInstruction =
      typeof body?.systemInstruction === 'string' && body.systemInstruction.trim().length > 0
        ? body.systemInstruction
        : 'You are a concise financial copilot. Give practical, educational guidance and clearly state assumptions. Do not claim certainty. Output plain text only. Do not use markdown symbols such as #, *, **, -, or backticks. Keep responses easy to scan using short paragraphs and numbered steps when useful.';

    const safeMessages: ChatMessage[] = inputMessages
      .filter((m: any) => (m?.type === 'user' || m?.type === 'ai') && typeof m?.content === 'string' && m.content.trim().length > 0)
      .map((m: any) => ({ type: m.type, content: m.content }));

    if (safeMessages.length === 0) {
      return json(res, 400, { error: 'At least one valid message is required' });
    }

    const contents = safeMessages.map((message) => ({
      role: message.type === 'user' ? 'user' : 'model',
      parts: [{ text: message.content }],
    }));

    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${DEFAULT_MODEL}:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: systemInstruction }] },
          contents,
        }),
      },
    );

    const geminiBody = await geminiResponse.json().catch(() => ({}));

    if (!geminiResponse.ok) {
      return json(res, geminiResponse.status, {
        error: geminiBody?.error?.message || `Gemini API request failed (${geminiResponse.status})`,
      });
    }

    const reply = geminiBody?.candidates?.[0]?.content?.parts
      ?.map((part: { text?: string }) => part?.text || '')
      .join('')
      .trim();

    if (!reply) {
      return json(res, 502, { error: 'Gemini returned an empty response' });
    }

    return json(res, 200, { reply });
  } catch (error) {
    return json(res, 500, {
      error: error instanceof Error ? error.message : 'Unexpected server error',
    });
  }
}

