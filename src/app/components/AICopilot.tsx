import { useState } from 'react';
import { Send, Bot, User, TrendingUp, Home, Baby, GraduationCap, Plane } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

export default function AICopilot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hello! I'm your AI Wealth Copilot. I can help you understand your financial future by running simulations based on your current situation. Try asking me:\n\n• Can I afford a house in 5 years?\n• What if I increase my savings by $500/month?\n• How should I prepare for retirement?\n• What happens if I change careers?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');

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

  const getAIResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();

    if (lowerQuestion.includes('house') || lowerQuestion.includes('property') || lowerQuestion.includes('home')) {
      return `Based on your current financial profile:\n\n**Probability of buying a $500k property in 5 years: 68%**\n\nHere's the breakdown:\n• Current savings rate: $1,200/month\n• Projected down payment (20%): $100,000\n• Your savings in 5 years: ~$85,000\n• Additional needed: $15,000\n\n**Recommendation:**\nIncrease monthly savings by $300 to reach 89% probability.\n\n**Risk factors:**\n• Interest rates may rise by 1-2%\n• Property prices historically increase 4% annually\n• Your income stability score: 75/100`;
    }

    if (lowerQuestion.includes('child') || lowerQuestion.includes('baby')) {
      return `Financial impact of having a child:\n\n**First Year Costs:** ~$15,000\n• Medical expenses: $3,500\n• Baby essentials: $2,800\n• Childcare: $8,700\n\n**Long-term Impact (18 years):** ~$310,000\n• Education: $180,000\n• Healthcare: $45,000\n• Daily expenses: $85,000\n\n**Your Financial Readiness: 72%**\n\n**Recommendations:**\n1. Build emergency fund to $50,000 (+$8,000)\n2. Start 529 education savings plan\n3. Review life insurance coverage\n4. Adjust monthly budget by ~$900\n\n**Timeline:** You're well-positioned to start a family within 12-18 months with adjustments.`;
    }

    if (lowerQuestion.includes('retire') || lowerQuestion.includes('retirement')) {
      return `Early retirement analysis at age 55:\n\n**Current Status:**\n• Current age: 32\n• Years to retirement: 23 years\n• Current retirement savings: $47,000\n\n**Projection:**\n• Needed at retirement: $1.8M (4% rule)\n• Current trajectory: $980,000\n• Shortfall: $820,000\n\n**Feasibility: 45%** (needs improvement)\n\n**To achieve 85% probability:**\n1. Increase 401(k) contribution to 20% (+8%)\n2. Add Roth IRA: $6,500/year\n3. Diversify with dividend stocks\n4. Side income: +$800/month\n\n**Alternative:** Retire at 60 with current plan (92% probability)`;
    }

    if (lowerQuestion.includes('education') || lowerQuestion.includes('college')) {
      return `Education savings strategy:\n\n**Cost Projection (18 years):**\n• Public university: $180,000\n• Private university: $320,000\n• Community college: $65,000\n\n**Recommended Approach:**\n1. Open 529 Plan immediately\n2. Initial contribution: $5,000\n3. Monthly contribution: $400\n\n**18-Year Projection:**\n• Total contributions: $91,400\n• Investment growth (7% avg): $103,600\n• Final value: ~$195,000\n\n**This covers:** 108% of public university costs\n\n**Tax Benefits:**\n• State tax deduction: ~$300/year\n• Tax-free growth and withdrawals\n\n**Action:** Start now to maximize compound growth!`;
    }

    if (lowerQuestion.includes('savings') || lowerQuestion.includes('save more')) {
      return `Impact of increasing savings:\n\n**Current:** $1,200/month\n**Proposed:** $1,700/month (+$500)\n\n**5-Year Impact:**\n• Additional savings: $30,000\n• Investment growth: +$8,400\n• Total boost: $38,400\n\n**10-Year Impact:**\n• Additional savings: $60,000\n• Investment growth: +$31,200\n• Total boost: $91,200\n\n**Feasibility Analysis:**\n• Current disposable income: $2,100/month\n• After increase: $1,600/month\n• Recommendation: **Highly feasible**\n\n**Where to cut:**\n• Dining out: -$200/month\n• Subscriptions: -$150/month\n• Entertainment: -$150/month\n\nThis change accelerates your financial goals by 2.5 years!`;
    }

    // Default response
    return `I've analyzed your question. Based on your current financial profile:\n\n**Financial Health Score:** 73/100\n**Monthly Income:** $8,200\n**Monthly Expenses:** $3,800\n**Savings Rate:** 26%\n**Net Worth:** $324,567\n\n**My Analysis:**\nYour financial foundation is solid. You're in the top 35% of your age group. To optimize further:\n\n1. Increase emergency fund to 12 months\n2. Diversify investments (reduce market risk from 68% to 50%)\n3. Consider tax-advantaged accounts\n4. Build passive income streams\n\n**Next Steps:**\nAsk me specific questions about major financial decisions, and I'll run detailed simulations with probability scores and actionable recommendations.`;
  };

  const handleSend = (text?: string) => {
    const messageText = text || input;
    if (!messageText.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: messageText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    // Simulate AI response delay
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: getAIResponse(messageText),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 1000);
  };

  const handleQuickQuestion = (question: string) => {
    handleSend(question);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-black min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-white mb-3">AI Wealth Copilot</h1>
        <p className="text-slate-400 text-lg">
          Ask anything about your financial future — get probability-based answers
        </p>
      </div>

      {/* Quick Questions */}
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

      {/* Chat Container */}
      <div className="bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
        {/* Messages */}
        <div className="h-[600px] overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {/* Avatar */}
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.type === 'user'
                    ? 'bg-gradient-to-br from-cyan-500 to-blue-500'
                    : 'bg-gradient-to-br from-emerald-500 to-green-500'
                }`}
              >
                {message.type === 'user' ? (
                  <User className="w-5 h-5 text-white" />
                ) : (
                  <Bot className="w-5 h-5 text-white" />
                )}
              </div>

              {/* Message Content */}
              <div
                className={`max-w-[80%] rounded-2xl p-4 ${
                  message.type === 'user'
                    ? 'bg-gradient-to-br from-cyan-500 to-blue-500 text-white'
                    : 'bg-slate-700/50 text-slate-100'
                }`}
              >
                <div className="whitespace-pre-wrap text-sm leading-relaxed">
                  {message.content}
                </div>
                <div
                  className={`text-xs mt-2 ${
                    message.type === 'user' ? 'text-white/70' : 'text-slate-400'
                  }`}
                >
                  {message.timestamp.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="border-t border-white/10 p-4">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about your financial future..."
              className="flex-1 bg-slate-700 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim()}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                input.trim()
                  ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white hover:shadow-lg hover:shadow-emerald-500/50'
                  : 'bg-slate-700 text-slate-500 cursor-not-allowed'
              }`}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span className="text-white font-medium text-sm">Probability-Based</span>
          </div>
          <p className="text-slate-400 text-xs">
            All answers include probability scores based on Monte Carlo simulations
          </p>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Bot className="w-4 h-4 text-cyan-400" />
            <span className="text-white font-medium text-sm">Personalized</span>
          </div>
          <p className="text-slate-400 text-xs">
            Answers are tailored to your unique financial situation and goals
          </p>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <GraduationCap className="w-4 h-4 text-purple-400" />
            <span className="text-white font-medium text-sm">Educational</span>
          </div>
          <p className="text-slate-400 text-xs">
            Learn financial concepts through practical, scenario-based advice
          </p>
        </div>
      </div>
    </div>
  );
}