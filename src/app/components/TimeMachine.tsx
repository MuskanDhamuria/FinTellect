import { useState, useEffect } from 'react';
import { Calendar, TrendingUp, DollarSign, Target, Play, RotateCcw } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';

export default function TimeMachine() {
  const [startYear, setStartYear] = useState('2020');
  const [monthlyInvestment, setMonthlyInvestment] = useState(500);
  const [investmentChoice, setInvestmentChoice] = useState('sp500');
  const [showResults, setShowResults] = useState(false);
  const [comparisonData, setComparisonData] = useState<any[]>([]);
  const [simulationResults, setSimulationResults] = useState<any>(null);
  const [yearlyComparison, setYearlyComparison] = useState<any[]>([]);
  const volatilityPattern = [1.12, 0.92, 1.18, 0.87, 1.05, 0.96, 1.15, 0.9];
  const finalActualPortfolio = comparisonData[comparisonData.length - 1]?.actual ?? 0;
  const finalWhatIfPortfolio = comparisonData[comparisonData.length - 1]?.whatIf ?? 0;

  const investments = [
    { id: 'sp500', name: 'S&P 500', avgReturn: 10.5, color: '#10b981' },
    { id: 'bonds', name: 'US Treasury Bonds', avgReturn: 4.2, color: '#3b82f6' },
    { id: 'gold', name: 'Gold', avgReturn: 7.8, color: '#f59e0b' },
    { id: 'bitcoin', name: 'Bitcoin', avgReturn: 45.2, color: '#ec4899' },
    { id: 'realestate', name: 'Real Estate ETF', avgReturn: 8.5, color: '#8b5cf6' },
  ];


// Calculate what-if scenario
const calculateResults = () => {
  const years = 2025 - parseInt(startYear);
  const selected = investments.find((i) => i.id === investmentChoice);
  
  // Simple compound interest calculation
  const monthlyReturn = selected!.avgReturn / 100 / 12;
  const months = years * 12;
  let totalValue = 0;
  
  for (let i = 0; i < months; i++) {
    totalValue = (totalValue + monthlyInvestment) * (1 + monthlyReturn);
  }
  
  const totalInvested = monthlyInvestment * months;
  const returns = totalValue - totalInvested;
  
  return { totalValue, totalInvested, returns, years };
};

  const results = showResults ? calculateResults() : null;
const difference = finalWhatIfPortfolio - finalActualPortfolio;

  // Generate chart data based on current inputs
const generateChartData = () => {
  const years = 2025 - parseInt(startYear);
  const selected = investments.find((i) => i.id === investmentChoice);
  const monthlyReturn = selected!.avgReturn / 100 / 12;
  
  const newComparisonData = [];
  const newYearlyData = [];
  
let actualPortfolio = 5000;
let previousPortfolio = actualPortfolio;
let whatIfPortfolio = 0;
  
  for (let year = parseInt(startYear); year <= 2025; year++) {
    // What-if calculation with monthly contributions
    if (year > parseInt(startYear)) {
      for (let month = 0; month < 12; month++) {
        whatIfPortfolio = (whatIfPortfolio + monthlyInvestment) * (1 + monthlyReturn);
      }
    }
    
const volatility = volatilityPattern[year % volatilityPattern.length];
const yearReturn = (selected!.avgReturn * volatility) / 100;
previousPortfolio = actualPortfolio;
actualPortfolio = actualPortfolio * (1 + yearReturn);
    
    newComparisonData.push({
      year: year.toString(),
      actual: Math.round(actualPortfolio),
      whatIf: Math.round(whatIfPortfolio),
    });

   if (year > parseInt(startYear)) {
  
  // Year-over-year opportunity (%)
const opportunityYoY = ((whatIfPortfolio - actualPortfolio) / whatIfPortfolio) * 100;

newYearlyData.push({
  year: year.toString(),
  returns: Number(opportunityYoY.toFixed(1)), // round to 1 decimal
});
}
  }
  
  return { comparisonData: newComparisonData, yearlyData: newYearlyData };
};

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-black min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-3">Financial Time Machine</h1>
        <p className="text-slate-400 text-lg">
          Simulate alternative investment decisions and learn from the past
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left - Controls */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-6">Time Travel Setup</h2>
            
            {/* Start Year */}
            <div className="mb-6">
              <label className="flex items-center gap-2 text-slate-300 mb-3">
                <Calendar className="w-4 h-4" />
                <span className="font-medium">Start Year</span>
              </label>
              <select
                value={startYear}
                onChange={(e) => {
  setStartYear(e.target.value);
  setShowResults(false);
}}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
                <option value="2015">2015 (10 years ago)</option>
                <option value="2018">2018 (7 years ago)</option>
                <option value="2020">2020 (5 years ago)</option>
                <option value="2022">2022 (3 years ago)</option>
              </select>
            </div>

            {/* Monthly Investment */}
            <div className="mb-6">
              <label className="flex items-center gap-2 text-slate-300 mb-3">
                <DollarSign className="w-4 h-4" />
                <span className="font-medium">Monthly Investment</span>
              </label>
              <input
                type="range"
                min="100"
                max="2000"
                step="100"
                value={monthlyInvestment}
                onChange={(e) => setMonthlyInvestment(parseInt(e.target.value))}
                className="w-full"
              />
              <div className="flex items-center justify-between mt-2">
                <span className="text-slate-400 text-sm">$100</span>
                <span className="text-white font-bold text-lg">${monthlyInvestment}/month</span>
                <span className="text-slate-400 text-sm">$2,000</span>
              </div>
            </div>

            {/* Investment Choice */}
            <div className="mb-6">
              <label className="flex items-center gap-2 text-slate-300 mb-3">
                <Target className="w-4 h-4" />
                <span className="font-medium">Investment Choice</span>
              </label>
              <div className="space-y-2">
                {investments.map((inv) => (
  <button
    key={inv.id}
    onClick={() => {
      setInvestmentChoice(inv.id);

      // Only update chart if simulation has already been run once
      if (showResults) {
        const { comparisonData: newComparisonData, yearlyData: newYearlyData } = generateChartData();
        setComparisonData(newComparisonData);
        setYearlyComparison(newYearlyData);
      }
    }}
    className={`w-full flex items-center justify-between p-4 rounded-lg transition-all ${
      investmentChoice === inv.id
        ? 'bg-emerald-500/20 border-2 border-emerald-500'
        : 'bg-slate-700/50 border-2 border-transparent hover:border-slate-600'
    }`}
  >
    <div className="flex items-center gap-3">
      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: inv.color }} />
      <span className="text-white font-medium">{inv.name}</span>
    </div>
    <span className="text-emerald-400 text-sm font-medium">{inv.avgReturn}% avg</span>
  </button>
))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
  onClick={() => {
    const { comparisonData: newComparisonData, yearlyData: newYearlyData } = generateChartData();
    setComparisonData(newComparisonData);
    setYearlyComparison(newYearlyData);
    setShowResults(true);
  }}
  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-lg hover:shadow-lg hover:shadow-emerald-500/50 transition-all font-medium"
>
  <Play className="w-5 h-5" />
  Run Simulation
</button>
              {showResults && (
                <button
  onClick={() => {
    setStartYear('2020');
    setMonthlyInvestment(500);
    setInvestmentChoice('sp500');
    setShowResults(false);
    setComparisonData([]);
    setYearlyComparison([]);
}}
                  className="px-4 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          {/* Current Portfolio */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">Your Current Portfolio</h3>
            <div className="space-y-3">
              {results && (
  <div className="bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
    <h3 className="text-lg font-bold text-white mb-4">Your Current Portfolio</h3>
    <div className="space-y-3">
      <div className="flex justify-between">
        <span className="text-slate-400">Current Value</span>
        <span className="text-white font-medium">
          ${results.totalValue.toLocaleString('en-US', { maximumFractionDigits: 0 })}
        </span>
      </div>
      <div className="flex justify-between">
        <span className="text-slate-400">Total Invested</span>
        <span className="text-white font-medium">
          ${results.totalInvested.toLocaleString('en-US', { maximumFractionDigits: 0 })}
        </span>
      </div>
      <div className="flex justify-between">
        <span className="text-slate-400">Total Returns</span>
        <span className="text-emerald-400 font-medium">
          +${results.returns.toLocaleString('en-US', { maximumFractionDigits: 0 })} (
          {((results.returns / results.totalInvested) * 100).toFixed(1)}%
          )
        </span>
      </div>
    </div>
  </div>
)}
            </div>
          </div>
        </div>

        {/* Right - Results */}
        <div className="lg:col-span-7 space-y-6">
          {!showResults ? (
            <div className="bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-12 flex flex-col items-center justify-center h-full">
              <div className="w-20 h-20 bg-slate-700 rounded-full flex items-center justify-center mb-4">
                <Calendar className="w-10 h-10 text-slate-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Ready to Time Travel?</h3>
              <p className="text-slate-400 text-center">
                Configure your settings and click "Run Simulation" to see what could have been
              </p>
            </div>
          ) : (
            <>
              {/* Results Summary */}
              <div className="bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 backdrop-blur-sm border border-emerald-500/30 rounded-2xl p-6">
                <h2 className="text-2xl font-bold text-white mb-6">Simulation Results</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div>
                    <div className="text-slate-300 text-sm mb-1">What-If Portfolio Value</div>
                    <div className="text-3xl font-bold text-white">
                      ${results!.totalValue.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                    </div>
                  </div>
                  <div>
                    <div className="text-slate-300 text-sm mb-1">Total Returns</div>
                    <div className="text-3xl font-bold text-emerald-400">
                      +${results!.returns.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                    </div>
                  </div>
                  <div>
                    <div className="text-slate-300 text-sm mb-1">ROI</div>
                    <div className="text-3xl font-bold text-cyan-400">
                      {((results!.returns / results!.totalInvested) * 100).toFixed(1)}%
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900/50 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <TrendingUp className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-white font-medium mb-1">Opportunity Analysis</div>
                      <p className="text-slate-300 text-sm">
  If you had invested ${monthlyInvestment}/month in {investments.find(i => i.id === investmentChoice)!.name} since {startYear},
  your portfolio would be worth <span className="text-emerald-400 font-bold">
  ${finalWhatIfPortfolio.toLocaleString()}
</span> instead of <span className="text-white font-bold">
  ${finalActualPortfolio.toLocaleString()}
</span> — a difference of{' '}
<span className="text-cyan-400 font-bold">
  ${difference.toLocaleString()}
</span>!
</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Comparison Chart */}
              <div className="bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Actual vs. What-If Comparison</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={comparisonData}>
                      <XAxis dataKey="year" stroke="#94a3b8" />
                      <YAxis stroke="#94a3b8" tickFormatter={(value) => `$${value / 1000}k`} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'rgba(15, 23, 42, 0.9)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: '8px',
                        }}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="actual"
                        stroke="#3b82f6"
                        strokeWidth={3}
                        name="Your Actual Portfolio"
                        dot={{ fill: '#3b82f6', r: 5 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="whatIf"
                        stroke="#10b981"
                        strokeWidth={3}
                        name="What-If Scenario"
                        dot={{ fill: '#10b981', r: 5 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Yearly Returns */}
              <div className="bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Year-Over-Year Returns</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={yearlyComparison}>
                      <XAxis dataKey="year" stroke="#94a3b8" />
                      <YAxis stroke="#94a3b8" tickFormatter={(value) => `${value}%`} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'rgba(15, 23, 42, 0.9)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: '8px',
                        }}
                      />
                      <Bar dataKey="returns" fill="#10b981" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Lessons Learned */}
              <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Key Lessons</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400 flex-shrink-0 mt-2" />
                    <p className="text-slate-300 text-sm">
                      Consistent monthly investments compound significantly over time, regardless of market timing.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400 flex-shrink-0 mt-2" />
                    <p className="text-slate-300 text-sm">
                      Starting early is more important than finding the "perfect" investment.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400 flex-shrink-0 mt-2" />
                    <p className="text-slate-300 text-sm">
                      Dollar-cost averaging reduces the impact of market volatility.
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}