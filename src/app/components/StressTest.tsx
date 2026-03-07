import { useEffect, useMemo, useState, type ComponentType } from 'react';
import {
  TrendingDown,
  AlertTriangle,
  Briefcase,
  Activity,
  ChevronRight,
  ShieldAlert,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Cell,
} from 'recharts';

type ScenarioId = 'market-crash' | 'job-loss' | 'inflation-spike' | 'medical-emergency';
type RiskProfile = 'conservative' | 'moderate' | 'aggressive';

type DashboardInputs = {
  monthlyIncome: number;
  monthlyExpenses: number;
  totalSavings: number;
  age: number;
  riskProfile: RiskProfile;
};

type FinancialProfile = {
  cash: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  stocks: number;
  bonds: number;
  crypto: number;
  otherAssets: number;
  emergencyFund: number;
};

type ScenarioDefinition = {
  id: ScenarioId;
  name: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
  impact: 'severe' | 'moderate';
  color: string;
};

type StressResult = {
  postShockNetWorth: number;
  liquidAssets: number;
  stressedMonthlyExpenses: number;
  monthlyIncome: number;
  monthlyBurn: number;
  survivalMonths: number;
  resilienceScore: number;
  recoveryMonths: number;
  scoreBreakdown: {
    liquidity: number;
    solvency: number;
    affordability: number;
    shockResistance: number;
    preparedness: number;
  };
  triggeredScenarios: ScenarioDefinition[];
  recommendations: string[];
};

const SCENARIOS: ScenarioDefinition[] = [
  {
    id: 'market-crash',
    name: 'Market Crash',
    description: 'Stocks -40%',
    icon: TrendingDown,
    impact: 'severe',
    color: 'from-red-500 to-rose-600',
  },
  {
    id: 'job-loss',
    name: 'Job Loss',
    description: '6 months no income',
    icon: Briefcase,
    impact: 'severe',
    color: 'from-orange-500 to-red-600',
  },
  {
    id: 'inflation-spike',
    name: 'Inflation Spike',
    description: '+5% inflation',
    icon: Activity,
    impact: 'moderate',
    color: 'from-amber-500 to-orange-600',
  },
  {
    id: 'medical-emergency',
    name: 'Medical Emergency',
    description: '$30,000 expense',
    icon: AlertTriangle,
    impact: 'moderate',
    color: 'from-yellow-500 to-amber-600',
  },
];

const DASHBOARD_DEFAULTS: DashboardInputs = {
  monthlyIncome: 8200,
  monthlyExpenses: 3800,
  totalSavings: 324567,
  age: 32,
  riskProfile: 'moderate',
};

const RISK_ALLOCATIONS: Record<RiskProfile, Record<'Stocks' | 'Bonds' | 'Real Estate' | 'Cash' | 'Crypto', number>> = {
  conservative: {
    Stocks: 25,
    Bonds: 45,
    'Real Estate': 15,
    Cash: 13,
    Crypto: 2,
  },
  moderate: {
    Stocks: 45,
    Bonds: 20,
    'Real Estate': 15,
    Cash: 12,
    Crypto: 8,
  },
  aggressive: {
    Stocks: 62,
    Bonds: 10,
    'Real Estate': 12,
    Cash: 8,
    Crypto: 8,
  },
};

const DASHBOARD_STORAGE_KEY = 'fintellect.dashboard.inputs';

const LINKED_INPUT_KEYS = [
  DASHBOARD_STORAGE_KEY,
];

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);
const round = (value: number) => Math.round(value * 10) / 10;
const fmtCurrency = (value: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);

function isRiskProfile(value: unknown): value is RiskProfile {
  return value === 'conservative' || value === 'moderate' || value === 'aggressive';
}

function normalizeDashboardInputs(partial?: Partial<DashboardInputs> | null): DashboardInputs {
  return {
    monthlyIncome: clamp(Number(partial?.monthlyIncome ?? DASHBOARD_DEFAULTS.monthlyIncome) || DASHBOARD_DEFAULTS.monthlyIncome, 0, 1_000_000_000),
    monthlyExpenses: clamp(Number(partial?.monthlyExpenses ?? DASHBOARD_DEFAULTS.monthlyExpenses) || DASHBOARD_DEFAULTS.monthlyExpenses, 0, 1_000_000_000),
    totalSavings: clamp(Number(partial?.totalSavings ?? DASHBOARD_DEFAULTS.totalSavings) || DASHBOARD_DEFAULTS.totalSavings, 0, 1_000_000_000),
    age: clamp(Number(partial?.age ?? DASHBOARD_DEFAULTS.age) || DASHBOARD_DEFAULTS.age, 18, 90),
    riskProfile: isRiskProfile(partial?.riskProfile) ? partial.riskProfile : DASHBOARD_DEFAULTS.riskProfile,
  };
}

function extractDashboardInputs(value: unknown, depth = 0): Partial<DashboardInputs> | null {
  if (!value || depth > 4) {
    return null;
  }

  if (typeof value === 'string') {
    try {
      return extractDashboardInputs(JSON.parse(value), depth + 1);
    } catch {
      return null;
    }
  }

  if (typeof value !== 'object') {
    return null;
  }

  const record = value as Record<string, unknown>;
  const found: Partial<DashboardInputs> = {};

  const numericMappings: Array<[keyof DashboardInputs, string[]]> = [
    ['monthlyIncome', ['monthlyIncome', 'income', 'monthly_income']],
    ['monthlyExpenses', ['monthlyExpenses', 'expenses', 'monthly_expenses']],
    ['totalSavings', ['totalSavings', 'totalNetWorth', 'savings', 'netWorth', 'portfolioValue']],
    ['age', ['age']],
  ];

  for (const [targetKey, possibleKeys] of numericMappings) {
    const directKey = possibleKeys.find((key) => key in record);
    if (directKey) {
      const numericValue = Number(record[directKey]);
      if (Number.isFinite(numericValue)) {
        found[targetKey] = numericValue as never;
      }
    }
  }

  const profileCandidate = record.riskProfile ?? record.risk_profile ?? record.profile;
  if (isRiskProfile(profileCandidate)) {
    found.riskProfile = profileCandidate;
  }

  if (Object.keys(found).length > 0) {
    return found;
  }

  for (const nested of Object.values(record)) {
    const nestedInputs = extractDashboardInputs(nested, depth + 1);
    if (nestedInputs) {
      return nestedInputs;
    }
  }

  return null;
}

function readBrowserLinkedInputs(): DashboardInputs {
  if (typeof window === 'undefined') {
    return DASHBOARD_DEFAULTS;
  }

  const merged: Partial<DashboardInputs> = {};
  const apply = (value: unknown) => {
    const next = extractDashboardInputs(value);
    if (next) {
      Object.assign(merged, next);
    }
  };

  const searchParams = new URLSearchParams(window.location.search);
  apply({
    monthlyIncome: searchParams.get('monthlyIncome'),
    monthlyExpenses: searchParams.get('monthlyExpenses'),
    totalSavings: searchParams.get('totalSavings'),
    age: searchParams.get('age'),
    riskProfile: searchParams.get('riskProfile'),
  });

  apply(window.history.state);
  apply(window.history.state?.usr);

  for (const key of LINKED_INPUT_KEYS) {
    apply(window.localStorage.getItem(key));
    apply(window.sessionStorage.getItem(key));
  }

  const storageAreas = [window.localStorage, window.sessionStorage];
  for (const storage of storageAreas) {
    for (let index = 0; index < storage.length; index += 1) {
      const key = storage.key(index);
      if (!key) {
        continue;
      }
      if (LINKED_INPUT_KEYS.includes(key)) {
        continue;
      }
      const lowerKey = key.toLowerCase();
      if (
        lowerKey.includes('income') ||
        lowerKey.includes('expense') ||
        lowerKey.includes('saving') ||
        lowerKey.includes('worth') ||
        lowerKey.includes('risk') ||
        lowerKey.includes('dashboard')
      ) {
        apply(storage.getItem(key));
      }
    }
  }

  return normalizeDashboardInputs(merged);
}

function buildFinancialProfile(inputs: DashboardInputs): FinancialProfile {
  const allocation = RISK_ALLOCATIONS[inputs.riskProfile];
  const amount = (percent: number) => round((inputs.totalSavings * percent) / 100);

  const totalCashBucket = amount(allocation.Cash);
  const emergencyFund = round(Math.min(totalCashBucket, inputs.monthlyExpenses * 6));
  const spendableCash = round(Math.max(0, totalCashBucket - emergencyFund));

  return {
    cash: spendableCash,
    monthlyIncome: inputs.monthlyIncome,
    monthlyExpenses: inputs.monthlyExpenses,
    stocks: amount(allocation.Stocks),
    bonds: amount(allocation.Bonds),
    crypto: amount(allocation.Crypto),
    otherAssets: amount(allocation['Real Estate']),
    emergencyFund,
  };
}

function calculateStressResult(profile: FinancialProfile, scenarioIds: ScenarioId[]): StressResult {
  const activeScenarios = SCENARIOS.filter((scenario) => scenarioIds.includes(scenario.id));

  let cash = profile.cash;
  let emergencyFund = profile.emergencyFund;
  let stocks = profile.stocks;
  const bonds = profile.bonds;
  const crypto = profile.crypto;
  const otherAssets = profile.otherAssets;
  let monthlyIncome = profile.monthlyIncome;
  let stressedMonthlyExpenses = profile.monthlyExpenses;
  let recoveryPenaltyMonths = 0;
  const recommendations: string[] = [];

  if (scenarioIds.includes('market-crash')) {
    stocks *= 0.6;
    recoveryPenaltyMonths += 12;
    recommendations.push('Reduce equity concentration by shifting a portion of stocks into bonds or cash reserves.');
  }

  if (scenarioIds.includes('job-loss')) {
    monthlyIncome = 0;
    recoveryPenaltyMonths += 6;
    recommendations.push('Increase liquidity so you can cover at least 6-12 months of expenses during income disruption.');
  }

  if (scenarioIds.includes('inflation-spike')) {
    stressedMonthlyExpenses *= 1.05;
    recoveryPenaltyMonths += 3;
    recommendations.push('Protect cash flow from inflation by trimming discretionary spend and adding inflation-resistant assets.');
  }

  if (scenarioIds.includes('medical-emergency')) {
    const emergencyCost = 30_000;
    const fromEmergencyFund = Math.min(emergencyFund, emergencyCost);
    emergencyFund -= fromEmergencyFund;
    const remainingAfterEmergencyFund = emergencyCost - fromEmergencyFund;
    cash = Math.max(0, cash - remainingAfterEmergencyFund);
    recoveryPenaltyMonths += 4;
    recommendations.push('Keep dedicated health or contingency reserves so one emergency does not drain operating cash.');
  }

  const totalCurrentNetWorth =
    profile.cash + profile.emergencyFund + profile.stocks + profile.bonds + profile.crypto + profile.otherAssets;

  const liquidAssets = Math.max(0, cash + emergencyFund + bonds * 0.9 + stocks * 0.25 + crypto * 0.1);
  const postShockNetWorth = Math.max(0, cash + emergencyFund + stocks + bonds + crypto + otherAssets);
  const monthlyBurn = Math.max(0, stressedMonthlyExpenses - monthlyIncome);
  const survivalMonths = monthlyBurn === 0 ? 120 : liquidAssets / monthlyBurn;

  const liquidityScore = clamp((survivalMonths / 12) * 100, 0, 100);
  const solvencyScore = clamp((postShockNetWorth / Math.max(totalCurrentNetWorth, 1)) * 100, 0, 100);
  const affordabilityScore = clamp((1 - monthlyBurn / Math.max(stressedMonthlyExpenses, 1)) * 100, 0, 100);
  const shockResistanceScore = clamp((liquidAssets / Math.max(profile.monthlyExpenses * 12, 1)) * 100, 0, 100);
  const preparednessScore = clamp(((profile.cash + profile.emergencyFund) / Math.max(profile.monthlyExpenses * 6, 1)) * 100, 0, 100);

  const resilienceScore = round(
    liquidityScore * 0.3 +
      solvencyScore * 0.2 +
      affordabilityScore * 0.15 +
      shockResistanceScore * 0.2 +
      preparednessScore * 0.15,
  );

  const lostNetWorth = Math.max(0, totalCurrentNetWorth - postShockNetWorth);
  const rebuildCapacity = Math.max(profile.monthlyIncome - profile.monthlyExpenses, profile.monthlyIncome * 0.2, 1);
  const recoveryMonths = Math.max(1, Math.ceil(recoveryPenaltyMonths + lostNetWorth / rebuildCapacity));

  if (survivalMonths < 6) {
    recommendations.unshift('Your stressed survival time is under 6 months. Building liquid reserves is the highest-priority fix.');
  }
  if (scenarioIds.includes('market-crash') && profile.stocks / Math.max(totalCurrentNetWorth, 1) > 0.55) {
    recommendations.unshift('Your portfolio is equity-heavy. A -40% stock shock materially reduces resilience.');
  }
  if (scenarioIds.includes('job-loss') && profile.monthlyExpenses > profile.monthlyIncome * 0.65) {
    recommendations.unshift('Your monthly burn is high relative to income. Lowering fixed expenses will improve job-loss resilience.');
  }
  if (!recommendations.length) {
    recommendations.push('Your profile remains resilient under the selected shocks. Maintain your current cash buffer and diversification.');
  }

  return {
    postShockNetWorth: round(postShockNetWorth),
    liquidAssets: round(liquidAssets),
    stressedMonthlyExpenses: round(stressedMonthlyExpenses),
    monthlyIncome: round(monthlyIncome),
    monthlyBurn: round(monthlyBurn),
    survivalMonths: round(survivalMonths),
    resilienceScore,
    recoveryMonths,
    scoreBreakdown: {
      liquidity: round(liquidityScore),
      solvency: round(solvencyScore),
      affordability: round(affordabilityScore),
      shockResistance: round(shockResistanceScore),
      preparedness: round(preparednessScore),
    },
    triggeredScenarios: activeScenarios,
    recommendations: Array.from(new Set(recommendations)).slice(0, 4),
  };
}

function calculateNoIncomeSurvivalMonths(profile: FinancialProfile, extraScenarioIds: ScenarioId[] = []) {
  const zeroIncomeResult = calculateStressResult(profile, Array.from(new Set<ScenarioId>(['job-loss', ...extraScenarioIds])));
  return zeroIncomeResult.survivalMonths;
}

function buildScenarioSeries(profile: FinancialProfile) {
  return [
    { scenario: 'Current', months: calculateNoIncomeSurvivalMonths(profile, []) },
    ...SCENARIOS.map((scenario) => ({
      scenario: scenario.name,
      months: calculateNoIncomeSurvivalMonths(profile, [scenario.id]),
    })),
  ];
}

export default function StressTest() {
  const [dashboardInputs, setDashboardInputs] = useState<DashboardInputs>(DASHBOARD_DEFAULTS);
  const [selectedScenarios, setSelectedScenarios] = useState<ScenarioId[]>([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const syncInputs = () => setDashboardInputs(readBrowserLinkedInputs());
    syncInputs();
    window.addEventListener('storage', syncInputs);
    window.addEventListener('focus', syncInputs);
    return () => {
      window.removeEventListener('storage', syncInputs);
      window.removeEventListener('focus', syncInputs);
    };
  }, []);

  useEffect(() => {
  if (typeof window !== 'undefined') {
    const latest = readBrowserLinkedInputs();
    setDashboardInputs(latest);
  }
}, []);

  const profile = useMemo(() => buildFinancialProfile(dashboardInputs), [dashboardInputs]);
  const baseline = useMemo(() => calculateStressResult(profile, []), [profile]);
  const noIncomeBaselineMonths = useMemo(() => calculateNoIncomeSurvivalMonths(profile), [profile]);
  const combinedResult = useMemo(() => calculateStressResult(profile, selectedScenarios), [profile, selectedScenarios]);
  const survivalData = useMemo(() => buildScenarioSeries(profile), [profile]);

  const impactData = useMemo(() => {
    const totalCurrentNetWorth =
      profile.cash + profile.emergencyFund + profile.stocks + profile.bonds + profile.crypto + profile.otherAssets;

    return [
      {
        metric: 'Net Worth',
        current: 100,
        afterStress: round((combinedResult.postShockNetWorth / Math.max(totalCurrentNetWorth, 1)) * 100),
      },
      {
        metric: 'Liquidity',
        current: 100,
        afterStress: round((combinedResult.liquidAssets / Math.max(baseline.liquidAssets, 1)) * 100),
      },
      {
        metric: 'Monthly Income',
        current: 100,
        afterStress: round((combinedResult.monthlyIncome / Math.max(dashboardInputs.monthlyIncome, 1)) * 100),
      },
      {
        metric: 'Survival Buffer',
        current: 100,
        afterStress: round((combinedResult.survivalMonths / Math.max(noIncomeBaselineMonths, 1)) * 100),
      },
    ];
  }, [baseline.liquidAssets, combinedResult, dashboardInputs.monthlyIncome, noIncomeBaselineMonths, profile]);

  const resilienceData = useMemo(
    () => [
      { subject: 'Liquidity', score: combinedResult.scoreBreakdown.liquidity, fullMark: 100 },
      { subject: 'Solvency', score: combinedResult.scoreBreakdown.solvency, fullMark: 100 },
      { subject: 'Affordability', score: combinedResult.scoreBreakdown.affordability, fullMark: 100 },
      { subject: 'Shock Resistance', score: combinedResult.scoreBreakdown.shockResistance, fullMark: 100 },
      { subject: 'Preparedness', score: combinedResult.scoreBreakdown.preparedness, fullMark: 100 },
    ],
    [combinedResult.scoreBreakdown],
  );

  const updateInputs = <K extends keyof DashboardInputs>(field: K, value: DashboardInputs[K]) => {
    setDashboardInputs((prev) => normalizeDashboardInputs({ ...prev, [field]: value }));
  };

  const toggleScenario = (id: ScenarioId) => {
    setSelectedScenarios((prev) => (prev.includes(id) ? prev.filter((scenarioId) => scenarioId !== id) : [...prev, id]));
  };

  const allocationRows = useMemo(
    () => [
      ['Stocks', profile.stocks],
      ['Bonds', profile.bonds],
      ['Real Estate', profile.otherAssets],
      ['Emergency Fund', profile.emergencyFund],
      ['Cash', profile.cash],
      ['Crypto', profile.crypto],
    ] as Array<[string, number]>,
    [profile],
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-black min-h-screen">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-3">Financial Stress Test</h1>
        <p className="text-slate-400 text-lg">
          Simulate worst-case scenarios to understand your financial resilience
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
        <div className="xl:col-span-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
            <div>
              <h2 className="text-2xl font-bold text-white">Linked Financial Inputs</h2>
              <p className="text-sm text-slate-400">Monthly income, expenses, net worth, age, and risk profile drive every stress test output.</p>
            </div>
            <button
              onClick={() => setDashboardInputs(readBrowserLinkedInputs())}
              className="px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              Refresh linked data
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <label className="block">
              <span className="block text-sm text-slate-400 mb-2">Monthly Income</span>
              <input
                type="number"
                min="0"
                step="100"
                value={dashboardInputs.monthlyIncome}
                onChange={(e) => updateInputs('monthlyIncome', Number(e.target.value) || 0)}
                className="w-full rounded-xl bg-slate-900/80 border border-white/10 px-4 py-3 text-white outline-none focus:border-emerald-400"
              />
            </label>
            <label className="block">
              <span className="block text-sm text-slate-400 mb-2">Monthly Expenses</span>
              <input
                type="number"
                min="0"
                step="100"
                value={dashboardInputs.monthlyExpenses}
                onChange={(e) => updateInputs('monthlyExpenses', Number(e.target.value) || 0)}
                className="w-full rounded-xl bg-slate-900/80 border border-white/10 px-4 py-3 text-white outline-none focus:border-emerald-400"
              />
            </label>
            <label className="block">
              <span className="block text-sm text-slate-400 mb-2">Total Net Worth</span>
              <input
                type="number"
                min="0"
                step="100"
                value={dashboardInputs.totalSavings}
                onChange={(e) => updateInputs('totalSavings', Number(e.target.value) || 0)}
                className="w-full rounded-xl bg-slate-900/80 border border-white/10 px-4 py-3 text-white outline-none focus:border-emerald-400"
              />
            </label>
            <label className="block">
              <span className="block text-sm text-slate-400 mb-2">Age</span>
              <input
                type="number"
                min="18"
                max="90"
                value={dashboardInputs.age}
                onChange={(e) => updateInputs('age', Number(e.target.value) || DASHBOARD_DEFAULTS.age)}
                className="w-full rounded-xl bg-slate-900/80 border border-white/10 px-4 py-3 text-white outline-none focus:border-emerald-400"
              />
            </label>
            <label className="block">
              <span className="block text-sm text-slate-400 mb-2">Risk Profile</span>
              <select
                value={dashboardInputs.riskProfile}
                onChange={(e) => updateInputs('riskProfile', (isRiskProfile(e.target.value) ? e.target.value : DASHBOARD_DEFAULTS.riskProfile))}
                className="w-full rounded-xl bg-slate-900/80 border border-white/10 px-4 py-3 text-white outline-none focus:border-emerald-400"
              >
                <option value="conservative">Conservative</option>
                <option value="moderate">Moderate</option>
                <option value="aggressive">Aggressive</option>
              </select>
            </label>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-white mb-4">Derived Snapshot</h2>
          <div className="space-y-4">
            <div>
              <div className="text-slate-400 text-sm">Current Net Worth</div>
              <div className="text-3xl font-bold text-white">{fmtCurrency(baseline.postShockNetWorth)}</div>
            </div>
            <div>
              <div className="text-slate-400 text-sm">Emergency Fund</div>
              <div className="text-3xl font-bold text-white">{fmtCurrency(profile.emergencyFund)}</div>
            </div>
            <div>
              <div className="text-slate-400 text-sm">Monthly Expenses</div>
              <div className="text-3xl font-bold text-white">{fmtCurrency(dashboardInputs.monthlyExpenses)}</div>
            </div>
            <div>
              <div className="text-slate-400 text-sm">Survival Time if Income Stops</div>
              <div className="text-3xl font-bold text-emerald-400">{noIncomeBaselineMonths} months</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-8">
        <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
          <h2 className="text-2xl font-bold text-white">Derived Allocation</h2>
          <span className="text-sm text-slate-400">Auto-built from risk profile and total net worth</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          {allocationRows.map(([label, value]) => (
            <div key={label} className="rounded-xl border border-white/10 bg-slate-900/50 p-4">
              <div className="text-slate-400 text-xs uppercase tracking-wide mb-1">{label}</div>
              <div className="text-lg font-bold text-white">{fmtCurrency(value)}</div>
            </div>
          ))}
        </div>
      </div>

      {!showResults ? (
        <>
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Select Scenarios to Test</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              {SCENARIOS.map((scenario) => {
                const Icon = scenario.icon;
                const isSelected = selectedScenarios.includes(scenario.id);
                return (
                  <button
                    key={scenario.id}
                    onClick={() => toggleScenario(scenario.id)}
                    className={`relative overflow-hidden rounded-xl p-6 text-left transition-all ${
                      isSelected
                        ? 'bg-gradient-to-br ' + scenario.color + ' shadow-lg scale-[1.02]'
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
                    <h3 className={`font-bold mb-1 ${isSelected ? 'text-white' : 'text-slate-200'}`}>{scenario.name}</h3>
                    <p className={`text-sm ${isSelected ? 'text-white/80' : 'text-slate-400'}`}>{scenario.description}</p>
                    <div className="mt-3">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          isSelected
                            ? 'bg-white/20 text-white'
                            : scenario.impact === 'severe'
                              ? 'bg-red-500/20 text-red-400'
                              : 'bg-amber-500/20 text-amber-400'
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

          <div className="flex justify-center">
            <button
              onClick={() => setShowResults(true)}
              disabled={selectedScenarios.length === 0}
              className={`px-8 py-4 rounded-xl font-bold text-lg transition-all ${
                selectedScenarios.length > 0
                  ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white hover:shadow-lg hover:shadow-emerald-500/40'
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
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-red-500/20 to-orange-500/20 backdrop-blur-sm border border-red-500/30 rounded-2xl p-8">
            <div className="flex items-start justify-between mb-6 gap-4">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">Stress Test Results</h2>
                <p className="text-slate-300">{combinedResult.triggeredScenarios.map((item) => item.name).join(' + ')}</p>
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

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <div className="text-slate-300 text-sm mb-2">Financial Survival Time</div>
                <div className="text-5xl font-bold text-white mb-1">{combinedResult.survivalMonths} months</div>
                <div className="text-red-400 text-sm">Based on liquid assets / stressed monthly burn</div>
              </div>
              <div>
                <div className="text-slate-300 text-sm mb-2">Stress Test Score</div>
                <div className="text-5xl font-bold text-white mb-1">{combinedResult.resilienceScore}/100</div>
                <div className="text-amber-300 text-sm">Holistic resilience under shock</div>
              </div>
              <div>
                <div className="text-slate-300 text-sm mb-2">Net Worth After Stress</div>
                <div className="text-5xl font-bold text-white mb-1">{Math.round(((combinedResult.postShockNetWorth / baseline.postShockNetWorth) * 100) || 0)}%</div>
                <div className="text-red-400 text-sm">{fmtCurrency(combinedResult.postShockNetWorth)} remaining</div>
              </div>
              <div>
                <div className="text-slate-300 text-sm mb-2">Recovery Time</div>
                <div className="text-5xl font-bold text-white mb-1">{combinedResult.recoveryMonths} mo</div>
                <div className="text-amber-400 text-sm">Estimated time to rebuild resilience</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Survival Time by Scenario</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={survivalData} layout="vertical">
                    <XAxis type="number" stroke="#94a3b8" />
                    <YAxis type="category" dataKey="scenario" stroke="#94a3b8" width={120} />
                    <Tooltip
                      formatter={(value: number) => [`${value} months`, 'Survival time']}
                      contentStyle={{
                        backgroundColor: 'rgba(15, 23, 42, 0.95)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '8px',
                      }}
                    />
                    <Bar dataKey="months" radius={[0, 8, 8, 0]}>
                      {survivalData.map((entry) => (
                        <Cell key={entry.scenario} fill={entry.scenario === 'Current' ? '#10b981' : '#f59e0b'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Financial Resilience Profile</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={resilienceData}>
                    <PolarGrid stroke="#475569" />
                    <PolarAngleAxis dataKey="subject" stroke="#94a3b8" />
                    <PolarRadiusAxis stroke="#94a3b8" />
                    <Radar name="Stress Score" dataKey="score" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">Impact Analysis</h3>
            <div className="space-y-4">
              {impactData.map((item) => (
                <div key={item.metric}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-300">{item.metric}</span>
                    <span className="text-white font-medium">{item.afterStress}% remaining</span>
                  </div>
                  <div className="relative w-full bg-slate-700/50 rounded-full h-3">
                    <div className="absolute h-3 bg-slate-600 rounded-full" style={{ width: `${item.current}%` }} />
                    <div
                      className={`absolute h-3 rounded-full ${
                        item.afterStress > 60 ? 'bg-emerald-500' : item.afterStress > 30 ? 'bg-amber-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${item.afterStress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">What the simulator is doing</h3>
              <div className="space-y-3 text-slate-300 text-sm leading-6">
                <p>
                  <ShieldAlert className="inline w-4 h-4 mr-2 text-amber-400" />
                  Market crash applies <strong className="text-white">stocks -40%</strong>.
                </p>
                <p>
                  <ShieldAlert className="inline w-4 h-4 mr-2 text-amber-400" />
                  Job loss forces <strong className="text-white">6 months with no income</strong> by setting monthly income to zero during the stress window.
                </p>
                <p>
                  <ShieldAlert className="inline w-4 h-4 mr-2 text-amber-400" />
                  Inflation spike raises monthly expenses by <strong className="text-white">5%</strong>.
                </p>
                <p>
                  <ShieldAlert className="inline w-4 h-4 mr-2 text-amber-400" />
                  Medical emergency deducts <strong className="text-white">$30,000</strong> from emergency reserves first, then cash.
                </p>
                <p>
                  <ShieldAlert className="inline w-4 h-4 mr-2 text-amber-400" />
                  Financial Survival Time = <strong className="text-white">liquid assets / stressed monthly burn</strong>.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-sm border border-cyan-500/30 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Recommended Actions</h3>
              <div className="space-y-3">
                {combinedResult.recommendations.map((recommendation, index) => (
                  <div key={recommendation} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-cyan-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-sm font-bold">{index + 1}</span>
                    </div>
                    <p className="text-slate-200 text-sm">{recommendation}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
