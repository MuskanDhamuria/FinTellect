export type RiskProfile = 'conservative' | 'moderate' | 'aggressive';

export type DashboardInputs = {
  monthlyIncome: number;
  monthlyExpenses: number;
  totalSavings: number;
  age: number;
  riskProfile: RiskProfile;
};

export const DASHBOARD_STORAGE_KEY = 'fintellect.dashboard.inputs';

export const DASHBOARD_DEFAULTS: DashboardInputs = {
  monthlyIncome: 8200,
  monthlyExpenses: 3800,
  totalSavings: 324567,
  age: 32,
  riskProfile: 'moderate',
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

export function isRiskProfile(value: unknown): value is RiskProfile {
  return value === 'conservative' || value === 'moderate' || value === 'aggressive';
}

export function normalizeDashboardInputs(
  value: Partial<DashboardInputs> | null | undefined
): DashboardInputs {
  const input = value ?? {};

  return {
    monthlyIncome:
      typeof input.monthlyIncome === 'number' && Number.isFinite(input.monthlyIncome)
        ? Math.max(0, input.monthlyIncome)
        : DASHBOARD_DEFAULTS.monthlyIncome,
    monthlyExpenses:
      typeof input.monthlyExpenses === 'number' && Number.isFinite(input.monthlyExpenses)
        ? Math.max(0, input.monthlyExpenses)
        : DASHBOARD_DEFAULTS.monthlyExpenses,
    totalSavings:
      typeof input.totalSavings === 'number' && Number.isFinite(input.totalSavings)
        ? Math.max(0, input.totalSavings)
        : DASHBOARD_DEFAULTS.totalSavings,
    age:
      typeof input.age === 'number' && Number.isFinite(input.age)
        ? clamp(input.age, 18, 90)
        : DASHBOARD_DEFAULTS.age,
    riskProfile: isRiskProfile(input.riskProfile)
      ? input.riskProfile
      : DASHBOARD_DEFAULTS.riskProfile,
  };
}

export function readBrowserLinkedInputs(): DashboardInputs {
  if (typeof window === 'undefined') {
    return DASHBOARD_DEFAULTS;
  }

  try {
    const raw = window.localStorage.getItem(DASHBOARD_STORAGE_KEY);
    if (!raw) return DASHBOARD_DEFAULTS;
    return normalizeDashboardInputs(JSON.parse(raw));
  } catch {
    return DASHBOARD_DEFAULTS;
  }
}

export function getAllocationPercentages(
  inputs: Pick<DashboardInputs, 'riskProfile'>
): Record<'Stocks' | 'Bonds' | 'Real Estate' | 'Cash' | 'Crypto', number> {
  switch (inputs.riskProfile) {
    case 'conservative':
      return {
        Stocks: 25,
        Bonds: 45,
        'Real Estate': 15,
        Cash: 13,
        Crypto: 2,
      };
    case 'aggressive':
      return {
        Stocks: 62,
        Bonds: 10,
        'Real Estate': 12,
        Cash: 8,
        Crypto: 8,
      };
    case 'moderate':
    default:
      return {
        Stocks: 45,
        Bonds: 20,
        'Real Estate': 15,
        Cash: 12,
        Crypto: 8,
      };
  }
}