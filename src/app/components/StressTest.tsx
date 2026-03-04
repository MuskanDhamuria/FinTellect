import { useState } from 'react';
import { TrendingDown, AlertTriangle, DollarSign, Briefcase, Activity, Home, Zap, ChevronRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts';

export default function StressTest() {
  const [selectedScenarios, setSelectedScenarios] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);

  const scenarios = [
    {
      id: 'market-crash',
      name: 'Market Crash',
      description: 'Stocks drop by 40%',
      icon: TrendingDown,
      impact: 'severe',
      color: 'from-red-500 to-rose-600',
    },
    {
      id: 'job-loss',
      name: 'Job Loss',
      description: '6 months without income',
      icon: Briefcase,
      impact: 'severe',
      color: 'from-orange-500 to-red-600',
    },
    {
      id: 'inflation-spike',
      name: 'Inflation Spike',
      description: '+5% inflation rate',
      icon: Activity,
      impact: 'moderate',
      color: 'from-amber-500 to-orange-600',
    },
    {
      id: 'medical-emergency',
      name: 'Medical Emergency',
      description: '$30,000 unexpected expense',
      icon: AlertTriangle,
      impact: 'moderate',
      color: 'from-yellow-500 to-amber-600',
    },
    {
      id: 'housing-crash',
      name: 'Housing Market Crash',
      description: 'Real estate value -25%',
      icon: Home,
      impact: 'moderate',
      color: 'from-purple-500 to-pink-600',
    },
    {
      id: 'interest-hike',
      name: 'Interest Rate Hike',
      description: 'Rates increase by 3%',
      icon: Zap,
      impact: 'mild',
      color: 'from-cyan-500 to-blue-600',
    },
  ];

  const toggleScenario = (id: string) => {
    setSelectedScenarios((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const runStressTest = () => {
    if (selectedScenarios.length > 0) {
      setShowResults(true);
    }
  };

  // Results data
  const survivalData = [
    { scenario: 'Current', months: 11 },
    { scenario: 'Market Crash', months: 9 },
    { scenario: 'Job Loss', months: 5 },
    { scenario: 'Combined', months: 3 },
  ];

  const impactData = [
    { metric: 'Net Worth', current: 100, afterStress: 62 },
    { metric: 'Liquidity', current: 100, afterStress: 45 },
    { metric: 'Monthly Income', current: 100, afterStress: 35 },
    { metric: 'Emergency Fund', current: 100, afterStress: 25 },
  ];

  const resilienceScore = [
    { subject: 'Liquidity', A: 65, fullMark: 100 },
    { subject: 'Diversification', A: 78, fullMark: 100 },
    { subject: 'Income Stability', A: 55, fullMark: 100 },
    { subject: 'Debt Management', A: 82, fullMark: 100 },
    { subject: 'Emergency Fund', A: 60, fullMark: 100 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-black min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-3">Financial Stress Test</h1>
        <p className="text-slate-400 text-lg">
          Simulate worst-case scenarios to understand your financial resilience
        </p>
      </div>

      {/* Current Health Snapshot */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:border-white/20 transition-all">
          <div className="text-slate-400 text-sm mb-1">Current Net Worth</div>
          <div className="text-2xl font-bold text-white">$324,567</div>
        </div>
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:border-white/20 transition-all">
          <div className="text-slate-400 text-sm mb-1">Emergency Fund</div>
          <div className="text-2xl font-bold text-white">$42,000</div>
        </div>
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:border-white/20 transition-all">
          <div className="text-slate-400 text-sm mb-1">Monthly Expenses</div>
          <div className="text-2xl font-bold text-white">$3,800</div>
        </div>
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:border-white/20 transition-all">
          <div className="text-slate-400 text-sm mb-1">Survival Time</div>
          <div className="text-2xl font-bold text-emerald-400">11 months</div>
        </div>
      </div>

      {!showResults ? (
        <>
          {/* Scenario Selection */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Select Scenarios to Test</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {scenarios.map((scenario) => {
                const Icon = scenario.icon;
                const isSelected = selectedScenarios.includes(scenario.id);
                return (
                  <button
                    key={scenario.id}
                    onClick={() => toggleScenario(scenario.id)}
                    className={`relative overflow-hidden rounded-xl p-6 text-left transition-all ${
                      isSelected
                        ? 'bg-gradient-to-br ' + scenario.color + ' shadow-lg scale-105'
                        : 'bg-slate-800/50 border border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <Icon className={`w-8 h-8 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
                      {isSelected && (
                        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                          <ChevronRight className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                    <h3 className={`font-bold mb-1 ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                      {scenario.name}
                    </h3>
                    <p className={`text-sm ${isSelected ? 'text-white/80' : 'text-slate-400'}`}>
                      {scenario.description}
                    </p>
                    <div className="mt-3">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          isSelected
                            ? 'bg-white/20 text-white'
                            : scenario.impact === 'severe'
                            ? 'bg-red-500/20 text-red-400'
                            : scenario.impact === 'moderate'
                            ? 'bg-amber-500/20 text-amber-400'
                            : 'bg-cyan-500/20 text-cyan-400'
                        }`}
                      >
                        {scenario.impact.toUpperCase()} IMPACT
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Run Test Button */}
          <div className="flex justify-center">
            <button
              onClick={runStressTest}
              disabled={selectedScenarios.length === 0}
              className={`px-8 py-4 rounded-xl font-bold text-lg transition-all ${
                selectedScenarios.length > 0
                  ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white hover:shadow-lg hover:shadow-emerald-500/50'
                  : 'bg-slate-700 text-slate-500 cursor-not-allowed'
              }`}
            >
              {selectedScenarios.length === 0
                ? 'Select at least one scenario'
                : `Run Stress Test (${selectedScenarios.length} scenario${selectedScenarios.length > 1 ? 's' : ''})`}
            </button>
          </div>
        </>
      ) : (
        <>
          {/* Results */}
          <div className="space-y-6">
            {/* Overall Score */}
            <div className="bg-gradient-to-br from-red-500/20 to-orange-500/20 backdrop-blur-sm border border-red-500/30 rounded-2xl p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">Stress Test Results</h2>
                  <p className="text-slate-300">Testing {selectedScenarios.length} scenario(s)</p>
                </div>
                <button
                  onClick={() => {
                    setShowResults(false);
                    setSelectedScenarios([]);
                  }}
                  className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
                >
                  Reset Test
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <div className="text-slate-300 text-sm mb-2">Financial Survival Time</div>
                  <div className="text-5xl font-bold text-white mb-1">3 months</div>
                  <div className="text-red-400 text-sm">-73% from current</div>
                </div>
                <div>
                  <div className="text-slate-300 text-sm mb-2">Net Worth Impact</div>
                  <div className="text-5xl font-bold text-white mb-1">-38%</div>
                  <div className="text-red-400 text-sm">$201,234 remaining</div>
                </div>
                <div>
                  <div className="text-slate-300 text-sm mb-2">Recovery Time</div>
                  <div className="text-5xl font-bold text-white mb-1">24 mo</div>
                  <div className="text-amber-400 text-sm">To restore current level</div>
                </div>
              </div>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Survival Time Comparison */}
              <div className="bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Survival Time by Scenario</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={survivalData} layout="vertical">
                      <XAxis type="number" stroke="#94a3b8" />
                      <YAxis type="category" dataKey="scenario" stroke="#94a3b8" width={100} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'rgba(15, 23, 42, 0.9)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: '8px',
                        }}
                      />
                      <Bar dataKey="months" fill="#10b981" radius={[0, 8, 8, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Financial Resilience Radar */}
              <div className="bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Financial Resilience Profile</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={resilienceScore}>
                      <PolarGrid stroke="#475569" />
                      <PolarAngleAxis dataKey="subject" stroke="#94a3b8" />
                      <PolarRadiusAxis stroke="#94a3b8" />
                      <Radar name="Your Score" dataKey="A" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Impact Analysis */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Impact Analysis</h3>
              <div className="space-y-4">
                {impactData.map((item) => (
                  <div key={item.metric}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-slate-300">{item.metric}</span>
                      <span className="text-white font-medium">
                        {item.afterStress}% remaining
                      </span>
                    </div>
                    <div className="relative w-full bg-slate-700/50 rounded-full h-3">
                      <div
                        className="absolute h-3 bg-slate-600 rounded-full"
                        style={{ width: `${item.current}%` }}
                      />
                      <div
                        className={`absolute h-3 rounded-full ${
                          item.afterStress > 60 ? 'bg-emerald-500' :
                          item.afterStress > 30 ? 'bg-amber-500' :
                          'bg-red-500'
                        }`}
                        style={{ width: `${item.afterStress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-sm border border-cyan-500/30 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Recommended Actions</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-cyan-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm font-bold">1</span>
                  </div>
                  <div>
                    <div className="text-white font-medium mb-1">Increase Emergency Fund</div>
                    <p className="text-slate-300 text-sm">
                      Build your emergency fund to $57,000 (15 months of expenses) to improve resilience.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-cyan-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm font-bold">2</span>
                  </div>
                  <div>
                    <div className="text-white font-medium mb-1">Diversify Income Sources</div>
                    <p className="text-slate-300 text-sm">
                      Consider developing passive income streams to reduce job loss impact.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-cyan-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm font-bold">3</span>
                  </div>
                  <div>
                    <div className="text-white font-medium mb-1">Reduce Market Exposure</div>
                    <p className="text-slate-300 text-sm">
                      Shift 10% of stocks to bonds to reduce volatility impact by ~15%.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}