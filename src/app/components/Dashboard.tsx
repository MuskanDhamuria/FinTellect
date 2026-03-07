import { useMemo, useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, Legend, XAxis, YAxis, Tooltip } from 'recharts';
import { TrendingUp, AlertTriangle, CheckCircle, DollarSign, Shield, Zap, Target, Brain, Sparkles } from 'lucide-react';
import { Link } from 'react-router';
import { BehavioralInsights } from './BehavioralInsights';
import { motion } from 'motion/react';

type RiskProfile = 'conservative' | 'moderate' | 'aggressive';

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);

const projectFutureValue = (principal: number, monthlyContribution: number, annualRate: number, years: number) => {
  const monthlyRate = annualRate / 12;
  const months = years * 12;

  if (monthlyRate === 0) {
    return principal + monthlyContribution * months;
  }

  const growthFactor = Math.pow(1 + monthlyRate, months);
  return principal * growthFactor + monthlyContribution * ((growthFactor - 1) / monthlyRate);
};

const riskAllocations: Record<RiskProfile, Array<{ name: string; value: number; color: string }>> = {
  conservative: [
    { name: 'Stocks', value: 25, color: '#10b981' },
    { name: 'Bonds', value: 45, color: '#3b82f6' },
    { name: 'Real Estate', value: 15, color: '#8b5cf6' },
    { name: 'Cash', value: 13, color: '#f59e0b' },
    { name: 'Crypto', value: 2, color: '#ec4899' },
  ],
  moderate: [
    { name: 'Stocks', value: 45, color: '#10b981' },
    { name: 'Bonds', value: 20, color: '#3b82f6' },
    { name: 'Real Estate', value: 15, color: '#8b5cf6' },
    { name: 'Cash', value: 12, color: '#f59e0b' },
    { name: 'Crypto', value: 8, color: '#ec4899' },
  ],
  aggressive: [
    { name: 'Stocks', value: 62, color: '#10b981' },
    { name: 'Bonds', value: 10, color: '#3b82f6' },
    { name: 'Real Estate', value: 12, color: '#8b5cf6' },
    { name: 'Cash', value: 8, color: '#f59e0b' },
    { name: 'Crypto', value: 8, color: '#ec4899' },
  ],
};

export default function Dashboard() {
  const [monthlyIncome, setMonthlyIncome] = useState(8200);
  const [monthlyExpenses, setMonthlyExpenses] = useState(3800);
  const [totalSavings, setTotalSavings] = useState(324567);
  const [age, setAge] = useState(32);
  const [riskProfile, setRiskProfile] = useState<RiskProfile>('moderate');

  //local storage saving
  useEffect(() => {
    const saved = localStorage.getItem('fintellect-financial-inputs');
    if (!saved) return;

    try {
      const parsed = JSON.parse(saved);

      if (typeof parsed.monthlyIncome === 'number') {
        setMonthlyIncome(parsed.monthlyIncome);
      }

      if (typeof parsed.monthlyExpenses === 'number') {
        setMonthlyExpenses(parsed.monthlyExpenses);
      }

      if (typeof parsed.totalSavings === 'number') {
        setTotalSavings(parsed.totalSavings);
      }

      if (typeof parsed.age === 'number') {
        setAge(parsed.age);
      }

      if (typeof parsed.riskProfile === 'string') {
        setRiskProfile(parsed.riskProfile);
      }
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem(
      'fintellect-financial-inputs',
      JSON.stringify({
        monthlyIncome,
        monthlyExpenses,
        totalSavings,
        age,
        riskProfile,
      })
    );
  }, [monthlyIncome, monthlyExpenses, totalSavings, age, riskProfile]);

  const derived = useMemo(() => {
    const assetData = riskAllocations[riskProfile];
    const stocks = assetData.find((a) => a.name === 'Stocks')?.value ?? 0;
    const cash = assetData.find((a) => a.name === 'Cash')?.value ?? 0;
    const crypto = assetData.find((a) => a.name === 'Crypto')?.value ?? 0;

    const monthlyCashFlow = monthlyIncome - monthlyExpenses;
    const monthlyContribution = Math.max(0, monthlyCashFlow * 0.6);
    const annualNetSavings = monthlyCashFlow * 12;
    const survivalMonths = monthlyExpenses > 0 ? totalSavings / monthlyExpenses : 0;

    const marketRisk = clamp(Math.round(stocks + crypto * 1.6 + (riskProfile === 'aggressive' ? 8 : riskProfile === 'conservative' ? -10 : 0)), 10, 95);
    const liquidityRisk = clamp(Math.round(78 - survivalMonths * 6 + (cash < 10 ? 10 : 0)), 5, 95);
    const concentrationRisk = clamp(Math.round(42 + Math.abs(stocks - 40) / 2 + (crypto > 7 ? 8 : 0)), 10, 95);
    const inflationRisk = clamp(Math.round(65 - stocks * 0.3 + (age > 55 ? 10 : 0)), 10, 95);

    const riskData = [
      { category: 'Market Risk', value: marketRisk, max: 100 },
      { category: 'Liquidity Risk', value: liquidityRisk, max: 100 },
      { category: 'Concentration Risk', value: concentrationRisk, max: 100 },
      { category: 'Inflation Risk', value: inflationRisk, max: 100 },
    ];
    const topRisk = [...riskData].sort((a, b) => b.value - a.value)[0];

    const savingsRate = monthlyIncome > 0 ? monthlyCashFlow / monthlyIncome : 0;
    const diversificationScore = clamp(100 - concentrationRisk, 0, 100);
    const liquidityScore = clamp(100 - liquidityRisk, 0, 100);
    const riskExposureScore = clamp(100 - Math.round((marketRisk + inflationRisk) / 2), 0, 100);
    const disciplineScore = clamp(Math.round(45 + savingsRate * 120 + (riskProfile === 'aggressive' ? -4 : 4)), 0, 100);

    const getStatus = (score: number) => (score >= 70 ? 'good' : score >= 55 ? 'moderate' : 'warning');

    const healthMetrics = [
      { label: 'Diversification', score: diversificationScore, status: getStatus(diversificationScore), icon: Target },
      { label: 'Liquidity', score: liquidityScore, status: getStatus(liquidityScore), icon: DollarSign },
      { label: 'Risk Exposure', score: riskExposureScore, status: getStatus(riskExposureScore), icon: Shield },
      { label: 'Behavioral Discipline', score: disciplineScore, status: getStatus(disciplineScore), icon: Zap },
    ];

    const wealthWellnessScore = Math.round((diversificationScore + liquidityScore + riskExposureScore + disciplineScore) / 4);
    const percentileTop = clamp(Math.round((100 - wealthWellnessScore) * 1.2), 5, 95);
    const currentYear = new Date().getFullYear();

    const simulationData = Array.from({ length: 6 }, (_, index) => {
      const yearsOut = index + 1;
      return {
        year: String(currentYear + index),
        conservative: Math.round(projectFutureValue(totalSavings, monthlyContribution, 0.04, yearsOut)),
        moderate: Math.round(projectFutureValue(totalSavings, monthlyContribution, 0.07, yearsOut)),
        aggressive: Math.round(projectFutureValue(totalSavings, monthlyContribution, 0.1, yearsOut)),
      };
    });

    return {
      assetData,
      monthlyCashFlow,
      annualNetSavings,
      survivalMonths,
      riskData,
      topRisk,
      healthMetrics,
      wealthWellnessScore,
      percentileTop,
      simulationData,
      monthlyContribution,
    };
  }, [monthlyIncome, monthlyExpenses, totalSavings, age, riskProfile]);

  const scoreLabel =
    derived.wealthWellnessScore >= 80
      ? 'Strong Financial Position'
      : derived.wealthWellnessScore >= 65
        ? 'Moderately Healthy'
        : 'Needs Attention';

  return (
    <div className="min-h-screen bg-black">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-cyan-500/20 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <h2 className="text-xl font-black text-white">Financial Inputs</h2>
                <p className="text-slate-400 text-sm">Update these assumptions to drive all dashboard calculations</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <label className="block">
                <span className="text-xs text-slate-400 uppercase tracking-wide">Monthly Income</span>
                <input
                  type="number"
                  min={0}
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(Math.max(0, Number(e.target.value) || 0))}
                  className="mt-2 w-full bg-slate-800 border border-slate-600 rounded-xl px-3 py-2 text-white"
                />
              </label>

              <label className="block">
                <span className="text-xs text-slate-400 uppercase tracking-wide">Monthly Expenses</span>
                <input
                  type="number"
                  min={0}
                  value={monthlyExpenses}
                  onChange={(e) => setMonthlyExpenses(Math.max(0, Number(e.target.value) || 0))}
                  className="mt-2 w-full bg-slate-800 border border-slate-600 rounded-xl px-3 py-2 text-white"
                />
              </label>

              <label className="block">
                <span className="text-xs text-slate-400 uppercase tracking-wide">Total Savings</span>
                <input
                  type="number"
                  min={0}
                  value={totalSavings}
                  onChange={(e) => setTotalSavings(Math.max(0, Number(e.target.value) || 0))}
                  className="mt-2 w-full bg-slate-800 border border-slate-600 rounded-xl px-3 py-2 text-white"
                />
              </label>

              <label className="block">
                <span className="text-xs text-slate-400 uppercase tracking-wide">Age</span>
                <input
                  type="number"
                  min={18}
                  max={90}
                  value={age}
                  onChange={(e) => setAge(clamp(Number(e.target.value) || 18, 18, 90))}
                  className="mt-2 w-full bg-slate-800 border border-slate-600 rounded-xl px-3 py-2 text-white"
                />
              </label>

              <label className="block">
                <span className="text-xs text-slate-400 uppercase tracking-wide">Risk Profile</span>
                <select
                  value={riskProfile}
                  onChange={(e) => setRiskProfile(e.target.value as RiskProfile)}
                  className="mt-2 w-full bg-slate-800 border border-slate-600 rounded-xl px-3 py-2 text-white"
                >
                  <option value="conservative">Conservative</option>
                  <option value="moderate">Moderate</option>
                  <option value="aggressive">Aggressive</option>
                </select>
              </label>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all opacity-60" />
            <div className="relative bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border-2 border-emerald-500/30 rounded-3xl p-6 backdrop-blur-sm hover:border-emerald-500/50 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="text-slate-400 text-sm font-semibold uppercase tracking-wider">Total Net Worth</span>
                  <div className="text-4xl font-black text-white mt-2">{formatCurrency(totalSavings)}</div>
                </div>
                <div className="w-12 h-12 bg-emerald-500/20 rounded-2xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-emerald-400" strokeWidth={2.5} />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full">
                  <span className="text-emerald-400 text-sm font-bold">{derived.annualNetSavings >= 0 ? '+' : ''}{formatCurrency(derived.annualNetSavings)}</span>
                </div>
                <span className="text-slate-400 text-sm">annual net savings</span>
              </div>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all opacity-60" />
            <div className="relative bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border-2 border-cyan-500/30 rounded-3xl p-6 backdrop-blur-sm hover:border-cyan-500/50 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="text-slate-400 text-sm font-semibold uppercase tracking-wider">Monthly Cash Flow</span>
                  <div className="text-4xl font-black text-white mt-2">{derived.monthlyCashFlow >= 0 ? '+' : ''}{formatCurrency(derived.monthlyCashFlow)}</div>
                </div>
                <div className="w-12 h-12 bg-cyan-500/20 rounded-2xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-cyan-400" strokeWidth={2.5} />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="px-3 py-1 bg-cyan-500/20 border border-cyan-500/30 rounded-full">
                  <span className="text-cyan-400 text-sm font-bold">{derived.monthlyCashFlow >= 0 ? 'Positive' : 'Negative'}</span>
                </div>
                <span className="text-slate-400 text-sm">cash flow</span>
              </div>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all opacity-60" />
            <div className="relative bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-2 border-amber-500/30 rounded-3xl p-6 backdrop-blur-sm hover:border-amber-500/50 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="text-slate-400 text-sm font-semibold uppercase tracking-wider">Survival Time</span>
                  <div className="text-4xl font-black text-white mt-2">{derived.survivalMonths.toFixed(1)} months</div>
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-4 relative group">
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
                    <Pie data={derived.assetData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={3} dataKey="value">
                      {derived.assetData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2 mt-4">
                {derived.assetData.map((item) => (
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

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="lg:col-span-4 relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/30 to-cyan-500/30 rounded-3xl blur-2xl" />
            <div className="relative bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border-2 border-emerald-500/30 rounded-3xl p-6 backdrop-blur-sm h-full">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-emerald-400 animate-pulse" />
                <h2 className="text-xl font-black text-white">Wealth Wellness Score</h2>
              </div>
              <p className="text-slate-300 text-sm mb-6">Derived from liquidity, risk, diversification, and savings discipline</p>

              <div className="flex flex-col items-center justify-center mb-6">
                <div className="relative w-48 h-48">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full blur-2xl opacity-30 animate-pulse" />
                  <svg className="transform -rotate-90 w-48 h-48 relative">
                    <circle cx="96" cy="96" r="80" stroke="rgba(255,255,255,0.1)" strokeWidth="14" fill="none" />
                    <circle
                      cx="96"
                      cy="96"
                      r="80"
                      stroke="url(#gradient-dash)"
                      strokeWidth="14"
                      fill="none"
                      strokeDasharray={`${(derived.wealthWellnessScore / 100) * 502.4} 502.4`}
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
                    <div className="text-6xl font-black text-white mb-1">{derived.wealthWellnessScore}</div>
                    <div className="text-slate-300 font-bold">/ 100</div>
                  </div>
                </div>
              </div>

              <div className="bg-black/40 border border-emerald-500/30 rounded-2xl p-4 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                  <span className="text-white font-bold">{scoreLabel}</span>
                </div>
                <p className="text-slate-400 text-sm">Estimated top {derived.percentileTop}% for your age cohort based on current inputs.</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {derived.healthMetrics.map((metric) => {
                  const Icon = metric.icon;
                  return (
                    <div key={metric.label} className="bg-black/40 border border-white/10 rounded-xl p-3 hover:border-emerald-500/30 transition-all">
                      <Icon
                        className={`w-5 h-5 mb-2 ${
                          metric.status === 'good' ? 'text-emerald-400' : metric.status === 'moderate' ? 'text-amber-400' : 'text-orange-400'
                        }`}
                      />
                      <div className="text-2xl font-black text-white">{metric.score}</div>
                      <div className="text-xs text-slate-400 font-semibold">{metric.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="lg:col-span-4 relative group">
            <div className="absolute inset-0 bg-red-500/10 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all" />
            <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 hover:border-red-500/30 transition-all h-full">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 bg-red-500/20 rounded-xl flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                </div>
                <h2 className="text-xl font-black text-white">Risk Exposure</h2>
              </div>
              <div className="space-y-6 mb-6">
                {derived.riskData.map((risk) => (
                  <div key={risk.category}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-slate-300 font-medium">{risk.category}</span>
                      <span className="text-white font-black">{risk.value}%</span>
                    </div>
                    <div className="relative w-full bg-white/5 rounded-full h-3 overflow-hidden">
                      <div
                        className={`h-3 rounded-full transition-all ${
                          risk.value > 60
                            ? 'bg-gradient-to-r from-red-500 to-orange-500'
                            : risk.value > 40
                              ? 'bg-gradient-to-r from-amber-500 to-yellow-500'
                              : 'bg-gradient-to-r from-emerald-500 to-cyan-500'
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
                      <div className="text-white font-bold mb-1">Biggest Risk Driver</div>
                      <p className="text-slate-400 text-sm">
                        {derived.topRisk?.category} at {derived.topRisk?.value}%.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-emerald-500/10 border-l-4 border-emerald-500 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-white font-bold mb-1">Actionable Move</div>
                      <p className="text-slate-400 text-sm">Allocate at least {formatCurrency(derived.monthlyContribution)} monthly to long-term investing.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="relative group mb-8">
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

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="relative group mb-8">
          <div className="absolute inset-0 bg-blue-500/10 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all" />
          <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 hover:border-blue-500/30 transition-all">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-black text-white mb-1">Future Wealth Projections</h2>
                <p className="text-slate-400 text-sm">
                  Projection assumes {formatCurrency(derived.monthlyContribution)} invested per month from current cash flow.
                </p>
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
                <LineChart data={derived.simulationData}>
                  <XAxis dataKey="year" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" tickFormatter={(value) => `$${Math.round(value / 1000)}k`} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(0, 0, 0, 0.9)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '12px',
                    }}
                    labelStyle={{ color: '#fff' }}
                    formatter={(value: number) => formatCurrency(value)}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="conservative" stroke="#3b82f6" strokeWidth={3} name="Conservative" dot={false} />
                  <Line type="monotone" dataKey="moderate" stroke="#10b981" strokeWidth={3} name="Moderate" dot={false} />
                  <Line type="monotone" dataKey="aggressive" stroke="#8b5cf6" strokeWidth={3} name="Aggressive" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/30 to-cyan-500/30 rounded-3xl blur-2xl" />
          <div className="relative bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border-2 border-emerald-500/30 rounded-3xl p-10 text-center backdrop-blur-sm hover:border-emerald-500/50 transition-all">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 border border-emerald-500/50 rounded-full mb-6">
              <Shield className="w-5 h-5 text-emerald-400" />
              <span className="text-emerald-400 font-bold uppercase tracking-wide text-sm">Test Your Resilience</span>
            </div>
            <h2 className="text-3xl font-black text-white mb-4">Ready to Stress Test Your Finances?</h2>
            <p className="text-slate-300 mb-8 max-w-2xl mx-auto">Simulate market crashes, job loss, and other scenarios to understand your financial resilience.</p>
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
