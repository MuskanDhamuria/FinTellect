import { AlertTriangle, TrendingDown, TrendingUp, DollarSign, Zap, CheckCircle, XCircle } from 'lucide-react';

interface BehaviorPattern {
  id: string;
  type: 'warning' | 'good' | 'critical';
  pattern: string;
  description: string;
  impact: string;
  frequency: number;
  icon: any;
}

export function BehavioralInsights() {
  const patterns: BehaviorPattern[] = [
    {
      id: '1',
      type: 'critical',
      pattern: 'Panic Selling',
      description: 'You tend to sell assets within 3 days of price drops >5%',
      impact: 'This behavior historically reduces returns by ~4.2%',
      frequency: 8,
      icon: TrendingDown,
    },
    {
      id: '2',
      type: 'warning',
      pattern: 'Concentration Bias',
      description: '45% of your portfolio is in stocks from your employer\'s industry',
      impact: 'High correlation risk could amplify losses by 2x',
      frequency: 1,
      icon: AlertTriangle,
    },
    {
      id: '3',
      type: 'warning',
      pattern: 'FOMO Buying',
      description: 'You purchased 6 assets after they gained >20% in a month',
      impact: 'Late entries reduced potential gains by ~$3,400',
      frequency: 6,
      icon: Zap,
    },
    {
      id: '4',
      type: 'good',
      pattern: 'Consistent Investing',
      description: 'You maintain regular monthly contributions regardless of market conditions',
      impact: 'Dollar-cost averaging improved returns by ~2.8%',
      frequency: 24,
      icon: TrendingUp,
    },
    {
      id: '5',
      type: 'good',
      pattern: 'Long-term Holding',
      description: 'Average holding period: 18 months, above optimal threshold',
      impact: 'Reduced transaction costs and captured compound growth',
      frequency: 12,
      icon: DollarSign,
    },
  ];

  return (
    <div className="space-y-4">
      {patterns.map((pattern) => {
        const Icon = pattern.icon;
        return (
          <div
            key={pattern.id}
            className={`border rounded-xl p-4 ${
              pattern.type === 'critical'
                ? 'bg-red-500/10 border-red-500/30'
                : pattern.type === 'warning'
                ? 'bg-amber-500/10 border-amber-500/30'
                : 'bg-emerald-500/10 border-emerald-500/30'
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  pattern.type === 'critical'
                    ? 'bg-red-500/20'
                    : pattern.type === 'warning'
                    ? 'bg-amber-500/20'
                    : 'bg-emerald-500/20'
                }`}
              >
                <Icon
                  className={`w-5 h-5 ${
                    pattern.type === 'critical'
                      ? 'text-red-400'
                      : pattern.type === 'warning'
                      ? 'text-amber-400'
                      : 'text-emerald-400'
                  }`}
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-white font-bold">{pattern.pattern}</h4>
                  <span className="text-xs text-slate-400">
                    Detected {pattern.frequency}x
                  </span>
                </div>
                <p className="text-slate-300 text-sm mb-2">{pattern.description}</p>
                <p
                  className={`text-sm font-medium ${
                    pattern.type === 'critical'
                      ? 'text-red-400'
                      : pattern.type === 'warning'
                      ? 'text-amber-400'
                      : 'text-emerald-400'
                  }`}
                >
                  {pattern.impact}
                </p>
              </div>
              {pattern.type === 'good' ? (
                <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              ) : (
                <XCircle
                  className={`w-5 h-5 flex-shrink-0 ${
                    pattern.type === 'critical' ? 'text-red-400' : 'text-amber-400'
                  }`}
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
