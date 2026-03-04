import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, Legend, XAxis, YAxis, Tooltip } from 'recharts';
import { TrendingUp, AlertTriangle, CheckCircle, DollarSign, Shield, Zap, Target, Brain, Sparkles, Activity } from 'lucide-react';
import { Link } from 'react-router';
import { BehavioralInsights } from './BehavioralInsights';
import { motion } from 'motion/react';

export default function Dashboard() {
  // Mock data for asset distribution
  const assetData = [
    { name: 'Stocks', value: 45, color: '#10b981' },
    { name: 'Bonds', value: 20, color: '#3b82f6' },
    { name: 'Real Estate', value: 15, color: '#8b5cf6' },
    { name: 'Cash', value: 12, color: '#f59e0b' },
    { name: 'Crypto', value: 8, color: '#ec4899' },
  ];

  // Risk exposure data
  const riskData = [
    { category: 'Market Risk', value: 68, max: 100 },
    { category: 'Liquidity Risk', value: 35, max: 100 },
    { category: 'Concentration Risk', value: 52, max: 100 },
    { category: 'Inflation Risk', value: 45, max: 100 },
  ];

  // Future simulation data
  const simulationData = [
    { year: '2025', conservative: 85000, moderate: 92000, aggressive: 105000 },
    { year: '2026', conservative: 91000, moderate: 108000, aggressive: 135000 },
    { year: '2027', conservative: 98000, moderate: 125000, aggressive: 170000 },
    { year: '2028', conservative: 105000, moderate: 145000, aggressive: 215000 },
    { year: '2029', conservative: 113000, moderate: 168000, aggressive: 270000 },
    { year: '2030', conservative: 122000, moderate: 195000, aggressive: 340000 },
  ];

  // Health metrics
  const healthMetrics = [
    { label: 'Diversification', score: 78, status: 'good', icon: Target },
    { label: 'Liquidity', score: 65, status: 'moderate', icon: DollarSign },
    { label: 'Risk Exposure', score: 72, status: 'good', icon: Shield },
    { label: 'Behavioral Discipline', score: 58, status: 'warning', icon: Zap },
  ];

  const wealthWellnessScore = 73;

  return (
    <div className="min-h-screen bg-black">
      {/* Animated background blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          {/* Net Worth Card - Unique design */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all opacity-60" />
            <div className="relative bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border-2 border-emerald-500/30 rounded-3xl p-6 backdrop-blur-sm hover:border-emerald-500/50 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="text-slate-400 text-sm font-semibold uppercase tracking-wider">Total Net Worth</span>
                  <div className="text-4xl font-black text-white mt-2">$324,567</div>
                </div>
                <div className="w-12 h-12 bg-emerald-500/20 rounded-2xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-emerald-400" strokeWidth={2.5} />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full">
                  <span className="text-emerald-400 text-sm font-bold">+12.3%</span>
                </div>
                <span className="text-slate-400 text-sm">this year</span>
              </div>
            </div>
          </div>

          {/* Cash Flow Card */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all opacity-60" />
            <div className="relative bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border-2 border-cyan-500/30 rounded-3xl p-6 backdrop-blur-sm hover:border-cyan-500/50 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="text-slate-400 text-sm font-semibold uppercase tracking-wider">Monthly Cash Flow</span>
                  <div className="text-4xl font-black text-white mt-2">+$4,200</div>
                </div>
                <div className="w-12 h-12 bg-cyan-500/20 rounded-2xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-cyan-400" strokeWidth={2.5} />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="px-3 py-1 bg-cyan-500/20 border border-cyan-500/30 rounded-full">
                  <span className="text-cyan-400 text-sm font-bold">Positive</span>
                </div>
                <span className="text-slate-400 text-sm">cash flow</span>
              </div>
            </div>
          </div>

          {/* Survival Time Card */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all opacity-60" />
            <div className="relative bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-2 border-amber-500/30 rounded-3xl p-6 backdrop-blur-sm hover:border-amber-500/50 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="text-slate-400 text-sm font-semibold uppercase tracking-wider">Survival Time</span>
                  <div className="text-4xl font-black text-white mt-2">11 months</div>
                </div>
                <div className="w-12 h-12 bg-amber-500/20 rounded-2xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-amber-400" strokeWidth={2.5} />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="px-3 py-1 bg-amber-500/20 border border-amber-500/30 rounded-full">
                  <span className="text-amber-400 text-sm font-bold">No Income</span>
                </div>
                <span className="text-slate-400 text-sm">scenario</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          {/* Asset Distribution - Left */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-4 relative group"
          >
            <div className="absolute inset-0 bg-purple-500/10 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all" />
            <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 hover:border-purple-500/30 transition-all h-full">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center">
                  <Target className="w-5 h-5 text-purple-400" />
                </div>
                <h2 className="text-xl font-black text-white">Asset Distribution</h2>
              </div>
              <div className="h-64 relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={assetData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {assetData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2 mt-4">
                {assetData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-lg shadow-lg" style={{ backgroundColor: item.color }} />
                      <span className="text-slate-300 font-medium">{item.name}</span>
                    </div>
                    <span className="text-white font-black text-lg">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Wealth Wellness Score - Center (Hero Card) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-4 relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/30 to-cyan-500/30 rounded-3xl blur-2xl" />
            <div className="relative bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border-2 border-emerald-500/30 rounded-3xl p-6 backdrop-blur-sm h-full">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-emerald-400 animate-pulse" />
                <h2 className="text-xl font-black text-white">Wealth Wellness Score</h2>
              </div>
              <p className="text-slate-300 text-sm mb-6">Your Financial Health Index</p>
              
              <div className="flex flex-col items-center justify-center mb-6">
                <div className="relative w-48 h-48">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full blur-2xl opacity-30 animate-pulse" />
                  <svg className="transform -rotate-90 w-48 h-48 relative">
                    <circle
                      cx="96"
                      cy="96"
                      r="80"
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth="14"
                      fill="none"
                    />
                    <circle
                      cx="96"
                      cy="96"
                      r="80"
                      stroke="url(#gradient-dash)"
                      strokeWidth="14"
                      fill="none"
                      strokeDasharray={`${(wealthWellnessScore / 100) * 502.4} 502.4`}
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="gradient-dash" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#10b981" />
                        <stop offset="50%" stopColor="#06b6d4" />
                        <stop offset="100%" stopColor="#10b981" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-6xl font-black text-white mb-1">{wealthWellnessScore}</div>
                    <div className="text-slate-300 font-bold">/ 100</div>
                  </div>
                </div>
              </div>

              <div className="bg-black/40 border border-emerald-500/30 rounded-2xl p-4 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                  <span className="text-white font-bold">Moderately Healthy</span>
                </div>
                <p className="text-slate-400 text-sm">
                  Top 35% of your age group. Focus on improving behavioral discipline.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {healthMetrics.map((metric) => {
                  const Icon = metric.icon;
                  return (
                    <div key={metric.label} className="bg-black/40 border border-white/10 rounded-xl p-3 hover:border-emerald-500/30 transition-all">
                      <Icon className={`w-5 h-5 mb-2 ${
                        metric.status === 'good' ? 'text-emerald-400' :
                        metric.status === 'moderate' ? 'text-amber-400' :
                        'text-orange-400'
                      }`} />
                      <div className="text-2xl font-black text-white">{metric.score}</div>
                      <div className="text-xs text-slate-400 font-semibold">{metric.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Risk Exposure - Right */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-4 relative group"
          >
            <div className="absolute inset-0 bg-red-500/10 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all" />
            <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 hover:border-red-500/30 transition-all h-full">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 bg-red-500/20 rounded-xl flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                </div>
                <h2 className="text-xl font-black text-white">Risk Exposure</h2>
              </div>
              <div className="space-y-6 mb-6">
                {riskData.map((risk) => (
                  <div key={risk.category}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-slate-300 font-medium">{risk.category}</span>
                      <span className="text-white font-black">{risk.value}%</span>
                    </div>
                    <div className="relative w-full bg-white/5 rounded-full h-3 overflow-hidden">
                      <div
                        className={`h-3 rounded-full transition-all ${
                          risk.value > 60 ? 'bg-gradient-to-r from-red-500 to-orange-500' :
                          risk.value > 40 ? 'bg-gradient-to-r from-amber-500 to-yellow-500' :
                          'bg-gradient-to-r from-emerald-500 to-cyan-500'
                        }`}
                        style={{ width: `${risk.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <div className="bg-amber-500/10 border-l-4 border-amber-500 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-white font-bold mb-1">High Market Risk</div>
                      <p className="text-slate-400 text-sm">
                        68% exposure. Consider diversifying.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-emerald-500/10 border-l-4 border-emerald-500 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-white font-bold mb-1">Good Liquidity</div>
                      <p className="text-slate-400 text-sm">
                        Sufficient liquid assets available.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Behavioral Finance Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="relative group mb-8"
        >
          <div className="absolute inset-0 bg-purple-500/10 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all" />
          <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 hover:border-purple-500/30 transition-all">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-purple-500/20 rounded-2xl flex items-center justify-center">
                  <Brain className="w-6 h-6 text-purple-400" strokeWidth={2.5} />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-white">Behavioral Finance Analysis</h2>
                  <p className="text-slate-400 text-sm">AI-detected patterns in your investment behavior</p>
                </div>
              </div>
            </div>
            <BehavioralInsights />
          </div>
        </motion.div>

        {/* Future Projections */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="relative group mb-8"
        >
          <div className="absolute inset-0 bg-blue-500/10 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all" />
          <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 hover:border-blue-500/30 transition-all">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-black text-white mb-1">Future Wealth Projections</h2>
                <p className="text-slate-400 text-sm">Based on current savings rate and investment strategy</p>
              </div>
              <Link
                to="/app/time-machine"
                className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-xl hover:shadow-lg hover:shadow-emerald-500/50 transition-all font-bold"
              >
                Explore Scenarios
              </Link>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={simulationData}>
                  <XAxis dataKey="year" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" tickFormatter={(value) => `$${value / 1000}k`} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(0, 0, 0, 0.9)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '12px',
                    }}
                    labelStyle={{ color: '#fff' }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="conservative"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    name="Conservative"
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="moderate"
                    stroke="#10b981"
                    strokeWidth={3}
                    name="Moderate"
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="aggressive"
                    stroke="#8b5cf6"
                    strokeWidth={3}
                    name="Aggressive"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/30 to-cyan-500/30 rounded-3xl blur-2xl" />
          <div className="relative bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border-2 border-emerald-500/30 rounded-3xl p-10 text-center backdrop-blur-sm hover:border-emerald-500/50 transition-all">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 border border-emerald-500/50 rounded-full mb-6">
              <Shield className="w-5 h-5 text-emerald-400" />
              <span className="text-emerald-400 font-bold uppercase tracking-wide text-sm">Test Your Resilience</span>
            </div>
            <h2 className="text-3xl font-black text-white mb-4">Ready to Stress Test Your Finances?</h2>
            <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
              Simulate market crashes, job loss, and other scenarios to understand your financial resilience.
            </p>
            <Link
              to="/app/stress-test"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-2xl hover:shadow-xl hover:shadow-emerald-500/50 transition-all font-black text-lg hover:scale-105"
            >
              <Shield className="w-6 h-6" />
              Run Financial Stress Test
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
