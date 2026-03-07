import { useState } from 'react';
import { Send, Bot, User, TrendingUp, Home, Baby, GraduationCap, Plane } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

const SYSTEM_INSTRUCTION =
  'You are a concise financial copilot. Give practical, educational guidance and clearly state assumptions. Do not claim certainty.';

export default function AICopilot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content:
        "Hello! I'm your AI Wealth Copilot. I can help you think through financial decisions. Try asking me:\n\n- Can I afford a house in 5 years?\n- What if I increase my savings by $500/month?\n- How should I prepare for retirement?\n- What happens if I change careers?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const quickQuestions = [
    {
      icon: Home,
      text: 'Can I afford a $500k house in 5 years?',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Baby,
      text: 'What if I have a child next year?',
      color: 'from-pink-500 to-rose-500',
    },
    {
      icon: GraduationCap,
      text: 'How do I save for education costs?',
      color: 'from-purple-500 to-violet-500',
    },
    {
      icon: Plane,
      text: 'Can I retire at 55?',
      color: 'from-amber-500 to-orange-500',
    },
  ];

  const getGeminiResponse = async (history: Message[], question: string): Promise<string> => {
    const response = await fetch('/api/gemini', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: SYSTEM_INSTRUCTION,
        messages: [...history, { type: 'user' as const, content: question }].map((message) => ({
          type: message.type,
          content: message.content,
        })),
      }),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      const errorMessage = typeof data?.error === 'string' ? data.error : `Request failed with status ${response.status}`;
      throw new Error(errorMessage);
    }

    const text = typeof data?.reply === 'string' ? data.reply.trim() : '';
    if (!text) {
      throw new Error('Gemini returned an empty response.');
    }

    return text;
  };

  const handleSend = async (text?: string) => {
    const messageText = text || input;
    if (!messageText.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: messageText,
      timestamp: new Date(),
    };

    const historyBeforeUserMessage = [...messages];
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const aiText = await getGeminiResponse(historyBeforeUserMessage, messageText);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiText,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content:
          error instanceof Error
            ? `I couldn't reach Gemini right now.\n\n${error.message}`
            : "I couldn't reach Gemini right now. Please try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickQuestion = (question: string) => {
    void handleSend(question);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-black min-h-screen">
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-white mb-3">AI Wealth Copilot</h1>
        <p className="text-slate-400 text-lg">Ask anything about your financial future - get probability-based answers</p>
      </div>

      {messages.length === 1 && (
        <div className="mb-6">
          <h2 className="text-sm font-medium text-slate-400 mb-3">Quick Questions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {quickQuestions.map((q, idx) => {
              const Icon = q.icon;
              return (
                <button
                  key={idx}
                  onClick={() => handleQuickQuestion(q.text)}
                  className={`flex items-center gap-3 p-4 bg-gradient-to-r ${q.color} bg-opacity-10 border border-white/10 rounded-xl hover:border-white/20 transition-all text-left`}
                >
                  <div className={`w-10 h-10 bg-gradient-to-br ${q.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-white font-medium text-sm">{q.text}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
        <div className="h-[600px] overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex gap-3 ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.type === 'user'
                    ? 'bg-gradient-to-br from-cyan-500 to-blue-500'
                    : 'bg-gradient-to-br from-emerald-500 to-green-500'
                }`}
              >
                {message.type === 'user' ? <User className="w-5 h-5 text-white" /> : <Bot className="w-5 h-5 text-white" />}
              </div>

              <div
                className={`max-w-[80%] rounded-2xl p-4 ${
                  message.type === 'user'
                    ? 'bg-gradient-to-br from-cyan-500 to-blue-500 text-white'
                    : 'bg-slate-700/50 text-slate-100'
                }`}
              >
                <div className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</div>
                <div className={`text-xs mt-2 ${message.type === 'user' ? 'text-white/70' : 'text-slate-400'}`}>
                  {message.timestamp.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-emerald-500 to-green-500">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="max-w-[80%] rounded-2xl p-4 bg-slate-700/50 text-slate-100 text-sm">Thinking...</div>
            </div>
          )}
        </div>

        <div className="border-t border-white/10 p-4">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && void handleSend()}
              placeholder="Ask about your financial future..."
              className="flex-1 bg-slate-700 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
            <button
              onClick={() => void handleSend()}
              disabled={!input.trim() || isLoading}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                input.trim() && !isLoading
                  ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white hover:shadow-lg hover:shadow-emerald-500/50'
                  : 'bg-slate-700 text-slate-500 cursor-not-allowed'
              }`}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span className="text-white font-medium text-sm">Probability-Based</span>
          </div>
          <p className="text-slate-400 text-xs">All answers include probability scores based on Monte Carlo simulations</p>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Bot className="w-4 h-4 text-cyan-400" />
            <span className="text-white font-medium text-sm">Personalized</span>
          </div>
          <p className="text-slate-400 text-xs">Answers are tailored to your unique financial situation and goals</p>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <GraduationCap className="w-4 h-4 text-purple-400" />
            <span className="text-white font-medium text-sm">Educational</span>
          </div>
          <p className="text-slate-400 text-xs">Learn financial concepts through practical, scenario-based advice</p>
        </div>
      </div>
    </div>
  );
}
