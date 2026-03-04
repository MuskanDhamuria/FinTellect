import { useState } from 'react';
import { Baby, Heart, GraduationCap, Home, Plane, Briefcase, ChevronDown, ChevronUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts';

export default function LifeEvents() {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

  const lifeEvents = [
    {
      id: 'child',
      name: 'Having a Child',
      icon: Baby,
      color: 'from-pink-500 to-rose-500',
      timeline: '0-18 years',
      totalCost: 310000,
    },
    {
      id: 'marriage',
      name: 'Getting Married',
      icon: Heart,
      color: 'from-red-500 to-pink-500',
      timeline: '1 year',
      totalCost: 35000,
    },
    {
      id: 'education',
      name: 'Advanced Degree',
      icon: GraduationCap,
      color: 'from-purple-500 to-violet-500',
      timeline: '2-4 years',
      totalCost: 85000,
    },
    {
      id: 'house',
      name: 'Buying a Home',
      icon: Home,
      color: 'from-blue-500 to-cyan-500',
      timeline: '30 years',
      totalCost: 500000,
    },
    {
      id: 'career-change',
      name: 'Career Change',
      icon: Briefcase,
      color: 'from-amber-500 to-orange-500',
      timeline: '6-12 months',
      totalCost: 45000,
    },
    {
      id: 'retirement',
      name: 'Early Retirement',
      icon: Plane,
      color: 'from-emerald-500 to-green-500',
      timeline: '20+ years',
      totalCost: 1800000,
    },
  ];

  const getEventDetails = (eventId: string) => {
    switch (eventId) {
      case 'child':
        return {
          breakdown: [
            { category: 'First Year Medical', amount: 3500 },
            { category: 'Baby Essentials', amount: 2800 },
            { category: 'Childcare (Annual)', amount: 15000 },
            { category: 'Education (18 years)', amount: 180000 },
            { category: 'Healthcare (18 years)', amount: 45000 },
            { category: 'Daily Expenses', amount: 63700 },
          ],
          timeline: [
            { year: 'Year 0-1', cost: 15000 },
            { year: 'Year 2-5', cost: 72000 },
            { year: 'Year 6-12', cost: 126000 },
            { year: 'Year 13-18', cost: 97000 },
          ],
          impact: {
            netWorth: -15,
            cashFlow: -25,
            savingsRate: -18,
          },
          readiness: 72,
          recommendations: [
            'Build emergency fund to $50,000 (currently $42,000)',
            'Start 529 college savings plan with $5,000 initial contribution',
            'Review and increase life insurance coverage to $750,000',
            'Adjust monthly budget to accommodate $900 in new expenses',
            'Research childcare options and costs in your area',
          ],
        };
      case 'house':
        return {
          breakdown: [
            { category: 'Down Payment (20%)', amount: 100000 },
            { category: 'Closing Costs', amount: 15000 },
            { category: 'Monthly Mortgage', amount: 2400 },
            { category: 'Property Tax (Annual)', amount: 8000 },
            { category: 'Insurance (Annual)', amount: 2000 },
            { category: 'Maintenance (Annual)', amount: 5000 },
          ],
          timeline: [
            { year: 'Down Payment', cost: 100000 },
            { year: 'Years 1-5', cost: 144000 },
            { year: 'Years 6-15', cost: 288000 },
            { year: 'Years 16-30', cost: 432000 },
          ],
          impact: {
            netWorth: 8,
            cashFlow: -12,
            savingsRate: -8,
          },
          readiness: 68,
          recommendations: [
            'Increase savings rate by $300/month to reach down payment faster',
            'Improve credit score to 760+ for better mortgage rates',
            'Research first-time homebuyer programs in your area',
            'Factor in 1-3% annual property value appreciation',
            'Budget for unexpected repairs and maintenance',
          ],
        };
      case 'retirement':
        return {
          breakdown: [
            { category: 'Living Expenses', amount: 50000 },
            { category: 'Healthcare', amount: 15000 },
            { category: 'Travel & Leisure', amount: 12000 },
            { category: 'Inflation Buffer', amount: 8000 },
          ],
          timeline: [
            { year: 'Age 55-65', cost: 850000 },
            { year: 'Age 66-75', cost: 950000 },
          ],
          impact: {
            netWorth: -85,
            cashFlow: -95,
            savingsRate: 45,
          },
          readiness: 45,
          recommendations: [
            'Increase 401(k) contribution to 20% immediately',
            'Max out Roth IRA at $7,000/year',
            'Develop passive income streams targeting $2,000/month',
            'Consider working 5 more years for 92% success rate',
            'Diversify portfolio with dividend-paying stocks',
          ],
        };
      default:
        return {
          breakdown: [
            { category: 'Immediate Costs', amount: 15000 },
            { category: 'Ongoing Expenses', amount: 20000 },
          ],
          timeline: [
            { year: 'Year 1', cost: 35000 },
          ],
          impact: {
            netWorth: -5,
            cashFlow: -8,
            savingsRate: -5,
          },
          readiness: 75,
          recommendations: [
            'Build emergency fund to cover transition period',
            'Create detailed budget for life event',
            'Review insurance and financial protection',
          ],
        };
    }
  };

  const selectedEventData = selectedEvent ? getEventDetails(selectedEvent) : null;
  const selectedEventInfo = selectedEvent ? lifeEvents.find((e) => e.id === selectedEvent) : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-black min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-3">Life Event Simulator</h1>
        <p className="text-slate-400 text-lg">
          Plan for major life changes with detailed financial impact analysis
        </p>
      </div>

      {/* Life Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {lifeEvents.map((event) => {
          const Icon = event.icon;
          const isSelected = selectedEvent === event.id;
          return (
            <button
              key={event.id}
              onClick={() => setSelectedEvent(isSelected ? null : event.id)}
              className={`relative overflow-hidden rounded-2xl p-6 text-left transition-all ${
                isSelected
                  ? 'bg-gradient-to-br ' + event.color + ' shadow-xl scale-105'
                  : 'bg-slate-800/50 border border-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  isSelected ? 'bg-white/20' : 'bg-slate-700'
                }`}>
                  <Icon className={`w-6 h-6 ${isSelected ? 'text-white' : 'text-slate-300'}`} />
                </div>
                {isSelected ? (
                  <ChevronUp className="w-5 h-5 text-white" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400" />
                )}
              </div>
              <h3 className={`text-lg font-bold mb-2 ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                {event.name}
              </h3>
              <div className={`text-sm mb-3 ${isSelected ? 'text-white/80' : 'text-slate-400'}`}>
                {event.timeline}
              </div>
              <div className={`text-2xl font-bold ${isSelected ? 'text-white' : 'text-emerald-400'}`}>
                ${event.totalCost.toLocaleString()}
              </div>
            </button>
          );
        })}
      </div>

      {/* Detailed Analysis */}
      {selectedEvent && selectedEventData && selectedEventInfo && (
        <div className="space-y-6">
          {/* Readiness Score */}
          <div className={`bg-gradient-to-br ${selectedEventInfo.color} bg-opacity-20 backdrop-blur-sm border border-white/20 rounded-2xl p-6`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-white">Financial Readiness</h2>
              <div className="text-right">
                <div className="text-4xl font-bold text-white">{selectedEventData.readiness}%</div>
                <div className="text-sm text-white/80">Ready Score</div>
              </div>
            </div>
            <div className="w-full bg-slate-900/30 rounded-full h-4">
              <div
                className="h-4 bg-white rounded-full transition-all duration-500"
                style={{ width: `${selectedEventData.readiness}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Cost Breakdown */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Cost Breakdown</h3>
              <div className="space-y-3">
                {selectedEventData.breakdown.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                    <span className="text-slate-300 text-sm">{item.category}</span>
                    <span className="text-white font-bold">
                      ${item.amount.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline Costs */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Cost Timeline</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={selectedEventData.timeline}>
                    <XAxis dataKey="year" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" tickFormatter={(value) => `$${value / 1000}k`} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(15, 23, 42, 0.9)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '8px',
                      }}
                    />
                    <Bar dataKey="cost" fill="#10b981" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Financial Impact */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">Financial Impact</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-700/30 rounded-xl p-4">
                <div className="text-slate-400 text-sm mb-2">Net Worth Impact</div>
                <div className={`text-3xl font-bold ${selectedEventData.impact.netWorth >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {selectedEventData.impact.netWorth >= 0 ? '+' : ''}{selectedEventData.impact.netWorth}%
                </div>
              </div>
              <div className="bg-slate-700/30 rounded-xl p-4">
                <div className="text-slate-400 text-sm mb-2">Cash Flow Impact</div>
                <div className={`text-3xl font-bold ${selectedEventData.impact.cashFlow >= 0 ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {selectedEventData.impact.cashFlow >= 0 ? '+' : ''}{selectedEventData.impact.cashFlow}%
                </div>
              </div>
              <div className="bg-slate-700/30 rounded-xl p-4">
                <div className="text-slate-400 text-sm mb-2">Savings Rate Impact</div>
                <div className={`text-3xl font-bold ${selectedEventData.impact.savingsRate >= 0 ? 'text-emerald-400' : 'text-orange-400'}`}>
                  {selectedEventData.impact.savingsRate >= 0 ? '+' : ''}{selectedEventData.impact.savingsRate}%
                </div>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 backdrop-blur-sm border border-emerald-500/30 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">Action Plan</h3>
            <div className="space-y-3">
              {selectedEventData.recommendations.map((rec, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm font-bold">{idx + 1}</span>
                  </div>
                  <p className="text-slate-200 text-sm">{rec}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* No Selection State */}
      {!selectedEvent && (
        <div className="bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-12 text-center">
          <div className="w-20 h-20 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <Baby className="w-10 h-10 text-slate-500" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Select a Life Event</h3>
          <p className="text-slate-400">
            Choose an event above to see detailed financial impact and preparation steps
          </p>
        </div>
      )}
    </div>
  );
}