import { Link } from 'react-router';
import { Activity, Shield, Brain, Clock, MessageSquare, Baby, TrendingUp, Zap, Target, CheckCircle, ArrowRight, Sparkles, CircuitBoard, Waves, BarChart3, TrendingDown, AlertTriangle } from 'lucide-react';
import { motion } from 'motion/react';

export default function Landing() {
  const features = [
    {
      icon: Shield,
      title: 'Financial Stress Test',
      description: 'Simulate market crashes, job loss, and emergencies to calculate your survival time.',
      color: 'from-red-500 to-orange-500',
    },
    {
      icon: Activity,
      title: 'Wealth Wellness Score',
      description: 'Holistic health index measuring diversification, liquidity, risk, and behavior.',
      color: 'from-emerald-500 to-cyan-500',
    },
    {
      icon: Clock,
      title: 'Time Machine',
      description: 'See what your portfolio would be worth with different past investment decisions.',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: MessageSquare,
      title: 'AI Wealth Copilot',
      description: 'Ask any financial question and get probability-based, actionable answers.',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Baby,
      title: 'Life Event Simulator',
      description: 'Plan for major life changes with detailed financial impact analysis.',
      color: 'from-pink-500 to-rose-500',
    },
    {
      icon: Brain,
      title: 'Behavioral Analysis',
      description: 'AI detects patterns like panic selling and FOMO to improve your returns.',
      color: 'from-violet-500 to-purple-500',
    },
  ];

  const stats = [
    { value: '73/100', label: 'Avg Wellness Score' },
    { value: '11mo', label: 'Survival Time' },
    { value: '6', label: 'Stress Scenarios' },
    { value: '95%', label: 'Accuracy Rate' },
  ];

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Gradient orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Hero Section */}
      <div className="relative">
        {/* Circuit pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <CircuitBoard className="w-full h-full" strokeWidth={0.5} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          {/* Logo and Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="flex flex-col items-center mb-8"
          >
            {/* Unique hexagonal logo */}
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-2xl blur-xl opacity-60 animate-pulse" />
              <div className="relative w-24 h-24 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-2xl flex items-center justify-center shadow-2xl transform rotate-6 hover:rotate-12 transition-transform duration-300">
                <Activity className="w-12 h-12 text-white" strokeWidth={2.5} />
              </div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-500/50 rounded-full mb-4 backdrop-blur-sm"
            >
              <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span className="text-emerald-400 text-sm font-bold tracking-wide">THE FUTURE OF FINANCIAL HEALTH</span>
              <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" style={{ animationDelay: '0.5s' }} />
            </motion.div>
          </motion.div>

          {/* Main Headline with unique typography */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-12"
          >
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black text-white mb-6 leading-[0.9] tracking-tight">
              Your Finances,
              <br />
              <span className="relative inline-block">
                <span className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 blur-2xl opacity-50" />
                <span className="relative bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent animate-pulse">
                  Diagnosed
                </span>
              </span>
              {' '}Like Health
            </h1>
            <p className="text-xl sm:text-2xl text-slate-400 max-w-3xl mx-auto mb-8 font-light">
              Not just portfolio tracking. FinTellect creates a{' '}
              <span className="text-emerald-400 font-semibold">Digital Financial Twin</span> that simulates 
              your entire financial life — predicting outcomes, detecting risks, and guiding decisions.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/dashboard"
                className="group relative inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-2xl font-bold text-lg overflow-hidden shadow-2xl shadow-emerald-500/50 hover:shadow-emerald-500/70 transition-all"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative">Launch Dashboard</span>
                <ArrowRight className="relative w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </Link>
              
            </div>
          </motion.div>

          {/* Stats with unique design */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="relative group"
              >
                
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Core Concept with diagonal sections */}
      <div className="relative py-32">
        {/* Diagonal background */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/30 to-transparent transform -skew-y-3" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full mb-6"
            >
              <Waves className="w-5 h-5 text-emerald-400" />
              <span className="text-emerald-400 font-bold text-sm">THE CONCEPT</span>
            </motion.div>
            <h2 className="text-5xl sm:text-6xl font-black text-white mb-6 tracking-tight">
              What If Your Finances<br />Had a{' '}
              <span className="text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text">
                Medical Checkup?
              </span>
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto font-light">
              We don't just show you numbers. We diagnose your financial health, run stress tests, 
              and simulate your future — like a doctor for your wealth.
            </p>
          </div>

          {/* Features Grid with staggered layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative"
                >
                  {/* Glow effect on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-all duration-500`} />
                  
                  <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 hover:border-white/30 transition-all h-full">
                    {/* Icon */}
                    <div className={`relative w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-2xl`}>
                      <div className="absolute inset-0 bg-white/20 rounded-2xl blur" />
                      <Icon className="relative w-8 h-8 text-white" strokeWidth={2.5} />
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                    <p className="text-slate-400 leading-relaxed">{feature.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>

      {/* Key Features Deep Dive with split screen design */}
      <div className="relative py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32">
          {/* Stress Test Feature */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-full mb-6">
                <Shield className="w-5 h-5 text-red-400" />
                <span className="text-red-400 font-bold text-sm uppercase tracking-wide">Stress Test</span>
              </div>
              <h3 className="text-5xl font-black text-white mb-6 tracking-tight leading-tight">
                Financial<br />
                <span className="text-transparent bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text">
                  Survival Time
                </span>
              </h3>
              <p className="text-xl text-slate-400 mb-8 leading-relaxed">
                How long can you survive without income? What happens in a market crash? 
                We simulate worst-case scenarios and calculate your exact survival time.
              </p>
              <div className="space-y-4">
                {[
                  { title: 'Market Crash Simulation', desc: 'Stocks -40%, immediate impact analysis', icon: TrendingDown },
                  { title: 'Job Loss Scenario', desc: '6 months without income planning', icon: Zap },
                  { title: 'Emergency Expenses', desc: '$30k medical emergency impact', icon: AlertTriangle },
                ].map((item, idx) => {
                  const ItemIcon = item.icon;
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-start gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl hover:border-emerald-500/30 transition-all group"
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <ItemIcon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-white font-bold mb-1">{item.title}</div>
                        <div className="text-slate-400 text-sm">{item.desc}</div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Unique card design */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/30 to-orange-500/30 rounded-3xl blur-2xl" />
              <div className="relative bg-gradient-to-br from-red-500/20 to-orange-500/20 border-2 border-red-500/30 rounded-3xl p-10 backdrop-blur-sm">
                <div className="text-center mb-8">
                  <div className="text-slate-300 text-sm uppercase tracking-wider mb-3 font-bold">Your Financial Survival Time</div>
                  <div className="text-8xl font-black text-white mb-3 tracking-tighter">11</div>
                  <div className="text-2xl text-red-400 font-bold">MONTHS</div>
                  <div className="text-slate-400 text-sm mt-2">Without income</div>
                </div>
                <div className="space-y-4">
                  {[
                    { label: 'Market Crash', value: 9, percent: 75 },
                    { label: 'Job Loss', value: 5, percent: 42 },
                  ].map((item, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white font-bold">{item.label}</span>
                        <span className="text-2xl font-black text-emerald-400">{item.value}mo</span>
                      </div>
                      <div className="relative w-full bg-black/30 rounded-full h-3 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.percent}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.5 + idx * 0.2 }}
                          className="h-3 bg-gradient-to-r from-red-500 to-orange-500 rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Wealth Wellness Score - reversed layout */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1 relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/30 to-cyan-500/30 rounded-3xl blur-2xl" />
              <div className="relative bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border-2 border-emerald-500/30 rounded-3xl p-10 backdrop-blur-sm">
                <div className="flex items-center justify-center mb-8">
                  <div className="relative w-64 h-64">
                    {/* Outer glow ring */}
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full blur-2xl opacity-30 animate-pulse" />
                    
                    <svg className="transform -rotate-90 w-64 h-64 relative">
                      <circle
                        cx="128"
                        cy="128"
                        r="100"
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth="16"
                        fill="none"
                      />
                      <circle
                        cx="128"
                        cy="128"
                        r="100"
                        stroke="url(#gradient-landing-unique)"
                        strokeWidth="16"
                        fill="none"
                        strokeDasharray="458 628"
                        strokeLinecap="round"
                      />
                      <defs>
                        <linearGradient id="gradient-landing-unique" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#10b981" />
                          <stop offset="50%" stopColor="#06b6d4" />
                          <stop offset="100%" stopColor="#10b981" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="text-7xl font-black text-white mb-2">73</div>
                      <div className="text-slate-300 font-bold">/ 100</div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Diversification', score: 78, color: 'emerald' },
                    { label: 'Liquidity', score: 65, color: 'cyan' },
                    { label: 'Risk', score: 72, color: 'blue' },
                    { label: 'Behavior', score: 58, color: 'amber' },
                  ].map((item, idx) => (
                    <div key={idx} className="bg-black/40 rounded-2xl p-5 text-center border border-white/10 hover:border-white/20 transition-all">
                      <div className={`text-4xl font-black text-${item.color}-400 mb-1`}>{item.score}</div>
                      <div className="text-xs text-slate-400 uppercase tracking-wider font-bold">{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
            
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full mb-6">
                <Activity className="w-5 h-5 text-emerald-400" />
                <span className="text-emerald-400 font-bold text-sm uppercase tracking-wide">Health Score</span>
              </div>
              <h3 className="text-5xl font-black text-white mb-6 tracking-tight leading-tight">
                Wealth<br />
                <span className="text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text">
                  Wellness Score
                </span>
              </h3>
              <p className="text-xl text-slate-400 mb-8 leading-relaxed">
                Instead of just net worth, we calculate a holistic financial health score based on 
                diversification, liquidity, risk exposure, and behavioral discipline.
              </p>
              <div className="bg-emerald-500/10 border-l-4 border-emerald-500 rounded-2xl p-6">
                <div className="text-emerald-400 font-bold text-lg mb-2">Your Status: Moderately Healthy</div>
                <p className="text-slate-400 leading-relaxed">
                  You're in the top 35% of your age group. Focus on improving behavioral discipline 
                  and you'll reach 85+ within 6 months.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* CTA Section with unique design */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Mega glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/30 via-cyan-500/30 to-emerald-500/30 rounded-3xl blur-3xl" />
          
          <div className="relative bg-gradient-to-br from-emerald-500/10 via-cyan-500/10 to-purple-500/10 border-2 border-emerald-500/30 rounded-3xl p-16 text-center backdrop-blur-sm">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500/20 border border-emerald-500/50 rounded-full mb-8">
              <Zap className="w-5 h-5 text-emerald-400" />
              <span className="text-emerald-400 font-bold uppercase tracking-wide">Start Your Journey</span>
            </div>
            <h2 className="text-5xl sm:text-6xl font-black text-white mb-6 tracking-tight">
              Ready to Diagnose Your<br />
              <span className="text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text">
                Financial Health?
              </span>
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-10 font-light">
              Join thousands who've transformed their financial future with data-driven insights, 
              simulations, and AI-powered guidance.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                to="/dashboard"
                className="group relative inline-flex items-center gap-3 px-12 py-6 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-2xl font-black text-xl overflow-hidden shadow-2xl shadow-emerald-500/50 hover:shadow-emerald-500/70 transition-all hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative">Launch Dashboard</span>
                <ArrowRight className="relative w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </Link>
              <Link
                to="/app/stress-test"
                className="inline-flex items-center gap-3 px-12 py-6 bg-white/5 border-2 border-white/20 text-white rounded-2xl hover:bg-white/10 hover:border-white/30 transition-all font-black text-xl backdrop-blur-sm hover:scale-105"
              >
                <Shield className="w-6 h-6" />
                Try Stress Test
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-black text-white text-lg">FinTellect</div>
                <div className="text-xs text-slate-400">Financial Health OS</div>
              </div>
            </div>
            <div className="text-slate-400 text-sm">
              © Team M3R
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}