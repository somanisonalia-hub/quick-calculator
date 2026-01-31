// @ts-nocheck
import dynamic from 'next/dynamic';

// Lazy load calculator components
const AverageCalculator = dynamic(() => import('./AverageCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

const MortgageCalculator = dynamic(() => import('./MortgageCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

const LoanCalculator = dynamic(() => import('./LoanCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

const BMICalculator = dynamic(() => import('./BMICalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});
const CreditCardCalculator = dynamic(() => import('./CreditCardCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});
const SavingsCalculator = dynamic(() => import('./SavingsCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});
const TaxCalculator = dynamic(() => import('./TaxCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});
const RetirementCalculator = dynamic(() => import('./RetirementCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});
const InvestmentCalculator = dynamic(() => import('./InvestmentCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});
const BudgetCalculator = dynamic(() => import('./BudgetCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

const CurrencyConverter = dynamic(() => import('./CurrencyConverter'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});
const GPACalculator = dynamic(() => import('./GPACalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});
const PropertyTaxCalculator = dynamic(() => import('./PropertyTaxCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});
const FutureValueCalculator = dynamic(() => import('./FutureValueCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});
const WordCounter = dynamic(() => import('./WordCounter'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

// Placeholder components - to be implemented
const NumbersToWordsConverter = dynamic(() => import('./NumbersToWordsConverter'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});
const AdvancedLoanCalculator = dynamic(() => import('./AdvancedLoanCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});
const StockReturnCalculator = dynamic(() => import('./StockReturnCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});
const LoanAffordabilityCalculator = dynamic(() => import('./LoanAffordabilityCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});
const CarAffordabilityCalculator = dynamic(() => import('./CarAffordabilityCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});
const HomeAffordabilityCalculator = dynamic(() => import('./HomeAffordabilityCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});
const AmortizationScheduleCalculator = dynamic(() => import('./AmortizationScheduleCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});
const LifeInsuranceCalculator = dynamic(() => import('./LifeInsuranceCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});
const ExpenseCalculator = dynamic(() => import('./ExpenseCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});
const CarInsuranceCalculator = dynamic(() => import('./CarInsuranceCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});
const HealthInsuranceCalculator = dynamic(() => import('./HealthInsuranceCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});
const HourlyToSalaryCalculator = dynamic(() => import('./HourlyToSalaryCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});
const SalaryCalculator = dynamic(() => import('./SalaryCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});
const OvertimePayCalculator = dynamic(() => import('./OvertimePayCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});
const CryptoROICalculator = dynamic(() => import('./CryptoROICalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});
const DebtConsolidationCalculator = dynamic(() => import('./DebtConsolidationCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});
const InterestOnlyMortgageCalculator = dynamic(() => import('./InterestOnlyMortgageCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

const CarLoanCalculator = dynamic(() => import('./CarLoanCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

const CompoundInterestCalculator = dynamic(() => import('./CompoundInterestCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

const ScientificCalculator = dynamic(() => import('./ScientificCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

const PercentageCalculator = dynamic(() => import('./PercentageCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

const FractionCalculator = dynamic(() => import('./FractionCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

const InterestCalculator = dynamic(() => import('./InterestCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

const AgeCalculator = dynamic(() => import('./AgeCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

const UnitConverter = dynamic(() => import('./UnitConverter'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

const TipCalculator = dynamic(() => import('./TipCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

const PasswordGenerator = dynamic(() => import('./PasswordGenerator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

const DateCalculator = dynamic(() => import('./DateCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

const BMRCalculator = dynamic(() => import('./BMRCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

const BodyFatCalculator = dynamic(() => import('./BodyFatCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

const CalorieCalculator = dynamic(() => import('./CalorieCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

const IdealWeightCalculator = dynamic(() => import('./IdealWeightCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

const CircleAreaCalculator = dynamic(() => import('./CircleAreaCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

const CircleCircumferenceCalculator = dynamic(() => import('./CircleCircumferenceCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

const PythagoreanTheoremCalculator = dynamic(() => import('./PythagoreanTheoremCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

const VolumeCalculator = dynamic(() => import('./VolumeCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

const SurfaceAreaCalculator = dynamic(() => import('./SurfaceAreaCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

const QuadraticEquationCalculator = dynamic(() => import('./QuadraticEquationCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

const ConcreteCalculator = dynamic(() => import('./ConcreteCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

const FeetInchesCalculator = dynamic(() => import('./FeetInchesCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

const InflationCalculator = dynamic(() => import('./InflationCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

const MeanMedianModeCalculator = dynamic(() => import('./MeanMedianModeCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

const PaycheckCalculator = dynamic(() => import('./PaycheckCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

const PercentCalculator = dynamic(() => import('./PercentCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

const TankVolumeCalculator = dynamic(() => import('./TankVolumeCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

const SalesTaxCalculator = dynamic(() => import('./SalesTaxCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

const PercentageChangeCalculator = dynamic(() => import('./PercentageChangeCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

const SimpleInterestCalculator = dynamic(() => import('./SimpleInterestCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

const SquareFootageCalculator = dynamic(() => import('./SquareFootageCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

const RatioCalculator = dynamic(() => import('./RatioCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

const StandardDeviationCalculator = dynamic(() => import('./StandardDeviationCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

const LoanPaymentTableGenerator = dynamic(() => import('./LoanPaymentTableGenerator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

const EqualPrincipalAmortizationCalculator = dynamic(() => import('./EqualPrincipalAmortizationCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

const APRCalculator = dynamic(() => import('./APRCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

const EARCalculator = dynamic(() => import('./EARCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

const EffectiveInterestRateCalculator = dynamic(() => import('./EffectiveInterestRateCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

const InterestRateTableCalculator = dynamic(() => import('./InterestRateTableCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

const BasicAPRCalculator = dynamic(() => import('./BasicAPRCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

const NominalInterestRateCalculator = dynamic(() => import('./NominalInterestRateCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

const PeriodicInterestRateCalculator = dynamic(() => import('./PeriodicInterestRateCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

const EquivalentInterestRateCalculator = dynamic(() => import('./EquivalentInterestRateCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

const DebtRatiosCalculator = dynamic(() => import('./DebtRatiosCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

const DebtToIncomeCalculator = dynamic(() => import('./DebtToIncomeCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

const LiquidityRatiosCalculator = dynamic(() => import('./LiquidityRatiosCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

const OperationsRatiosCalculator = dynamic(() => import('./OperationsRatiosCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

const ProfitabilityRatiosCalculator = dynamic(() => import('./ProfitabilityRatiosCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

const StockRatiosCalculator = dynamic(() => import('./StockRatiosCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

const NetIncomeCalculator = dynamic(() => import('./NetIncomeCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

const TakeHomePayCalculator = dynamic(() => import('./TakeHomePayCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

const IncomeTaxCalculator = dynamic(() => import('./IncomeTaxCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

const WaterIntakeCalculator = dynamic(() => import('./WaterIntakeCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

const LeanBodyMassCalculator = dynamic(() => import('./LeanBodyMassCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

const MaintenanceCaloriesCalculator = dynamic(() => import('./MaintenanceCaloriesCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

const TDEECalculator = dynamic(() => import('./TDEECalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

const WaistToHipRatioCalculator = dynamic(() => import('./WaistToHipRatioCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

const ProteinIntakeCalculator = dynamic(() => import('./ProteinIntakeCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

const EMICalculator = dynamic(() => import('./EMICalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

const TriangleAreaCalculator = dynamic(() => import('./TriangleAreaCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

const GradeCalculator = dynamic(() => import('./GradeCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

const BiweeklyPayCalculator = dynamic(() => import('./BiweeklyPayCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

const PregnancyCalculator = dynamic(() => import('./PregnancyCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

const OvulationCalculator = dynamic(() => import('./OvulationCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

const BloodPressureCalculator = dynamic(() => import('./BloodPressureCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

const DebtPayoffCalculator = dynamic(() => import('./DebtPayoffCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

const MacroCalculator = dynamic(() => import('./MacroCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

const Calculator401k = dynamic(() => import('./Calculator401k'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

const RothIRACalculator = dynamic(() => import('./RothIRACalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

const SocialSecurityCalculator = dynamic(() => import('./SocialSecurityCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

const CreditCardPayoffCalculator = dynamic(() => import('./CreditCardPayoffCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

const EmergencyFundCalculator = dynamic(() => import('./EmergencyFundCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

const ExamScorePredictorCalculator = dynamic(() => import('./ExamScorePredictorCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

const NetWorthCalculator = dynamic(() => import('./NetWorthCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

const RetirementSavingsCalculator = dynamic(() => import('./RetirementSavingsCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

const SavingsGoalCalculator = dynamic(() => import('./SavingsGoalCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

const SleepCalculator = dynamic(() => import('./SleepCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

const TripPlannerCalculator = dynamic(() => import('./TripPlannerCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

// Registry mapping component names to actual components
export const calculatorComponents: Record<string, any> = {
  'AverageCalculator': AverageCalculator,
  'MortgageCalculator': MortgageCalculator,
  'LoanCalculator': LoanCalculator,
  'LoanAffordabilityCalculator': LoanAffordabilityCalculator,
  'CarAffordabilityCalculator': CarAffordabilityCalculator,
  'HomeAffordabilityCalculator': HomeAffordabilityCalculator,
  'AmortizationScheduleCalculator': AmortizationScheduleCalculator,
  'BMICalculator': BMICalculator,
  'CreditCardCalculator': CreditCardCalculator,
  'SavingsCalculator': SavingsCalculator,
  'TaxCalculator': TaxCalculator,
  'RetirementCalculator': RetirementCalculator,
  'InvestmentCalculator': InvestmentCalculator,
  'BudgetCalculator': BudgetCalculator,
  'CurrencyConverter': CurrencyConverter,
  'GPACalculator': GPACalculator,
  'PropertyTaxCalculator': PropertyTaxCalculator,
  'FutureValueCalculator': FutureValueCalculator,
  'WordCounter': WordCounter,
  'NumbersToWordsConverter': NumbersToWordsConverter,
  'AdvancedLoanCalculator': AdvancedLoanCalculator,
  'StockReturnCalculator': StockReturnCalculator,
  'LifeInsuranceCalculator': LifeInsuranceCalculator,
  'ExpenseCalculator': ExpenseCalculator,
  'CarInsuranceCalculator': CarInsuranceCalculator,
  'HealthInsuranceCalculator': HealthInsuranceCalculator,
  'HourlyToSalaryCalculator': HourlyToSalaryCalculator,
  'SalaryCalculator': SalaryCalculator,
  'OvertimePayCalculator': OvertimePayCalculator,
  'CryptoROICalculator': CryptoROICalculator,
  'DebtConsolidationCalculator': DebtConsolidationCalculator,
  'InterestOnlyMortgageCalculator': InterestOnlyMortgageCalculator,
  'CarLoanCalculator': CarLoanCalculator,
  'CompoundInterestCalculator': CompoundInterestCalculator,
  'ScientificCalculator': ScientificCalculator,
  'PercentageCalculator': PercentageCalculator,
  'FractionCalculator': FractionCalculator,
  'InterestCalculator': InterestCalculator,
  'AgeCalculator': AgeCalculator,
  'UnitConverter': UnitConverter,
  'TipCalculator': TipCalculator,
  'PasswordGenerator': PasswordGenerator,
  'DateCalculator': DateCalculator,
  'BMRCalculator': BMRCalculator,
  'BodyFatCalculator': BodyFatCalculator,
  'CalorieCalculator': CalorieCalculator,
  'IdealWeightCalculator': IdealWeightCalculator,
  'CircleAreaCalculator': CircleAreaCalculator,
  'CircleCircumferenceCalculator': CircleCircumferenceCalculator,
  'PythagoreanTheoremCalculator': PythagoreanTheoremCalculator,
  'VolumeCalculator': VolumeCalculator,
  'SurfaceAreaCalculator': SurfaceAreaCalculator,
  'QuadraticEquationCalculator': QuadraticEquationCalculator,
  'ConcreteCalculator': ConcreteCalculator,
  'FeetInchesCalculator': FeetInchesCalculator,
  'InflationCalculator': InflationCalculator,
  'MeanMedianModeCalculator': MeanMedianModeCalculator,
  'PaycheckCalculator': PaycheckCalculator,
  'PercentCalculator': PercentCalculator,
  'TankVolumeCalculator': TankVolumeCalculator,
  'SalesTaxCalculator': SalesTaxCalculator,
  'PercentageChangeCalculator': PercentageChangeCalculator,
  'SimpleInterestCalculator': SimpleInterestCalculator,
  'SquareFootageCalculator': SquareFootageCalculator,
  'RatioCalculator': RatioCalculator,
  'StandardDeviationCalculator': StandardDeviationCalculator,
  'LoanPaymentTableGenerator': LoanPaymentTableGenerator,
  'EqualPrincipalAmortizationCalculator': EqualPrincipalAmortizationCalculator,
  'APRCalculator': APRCalculator,
  'EARCalculator': EARCalculator,
  'EffectiveInterestRateCalculator': EffectiveInterestRateCalculator,
  'InterestRateTableCalculator': InterestRateTableCalculator,
  'BasicAPRCalculator': BasicAPRCalculator,
  'NominalInterestRateCalculator': NominalInterestRateCalculator,
  'PeriodicInterestRateCalculator': PeriodicInterestRateCalculator,
  'EquivalentInterestRateCalculator': EquivalentInterestRateCalculator,
  'DebtRatiosCalculator': DebtRatiosCalculator,
  'DebtToIncomeCalculator': DebtToIncomeCalculator,
  'LiquidityRatiosCalculator': LiquidityRatiosCalculator,
  'OperationsRatiosCalculator': OperationsRatiosCalculator,
  'ProfitabilityRatiosCalculator': ProfitabilityRatiosCalculator,
  'StockRatiosCalculator': StockRatiosCalculator,
  'NetIncomeCalculator': NetIncomeCalculator,
  'TakeHomePayCalculator': TakeHomePayCalculator,
  'IncomeTaxCalculator': IncomeTaxCalculator,
  'ProteinIntakeCalculator': ProteinIntakeCalculator,
  'WaterIntakeCalculator': WaterIntakeCalculator,
  'LeanBodyMassCalculator': LeanBodyMassCalculator,
  'MaintenanceCaloriesCalculator': MaintenanceCaloriesCalculator,
  'TDEECalculator': TDEECalculator,
  'WaistToHipRatioCalculator': WaistToHipRatioCalculator,
  'EMICalculator': EMICalculator,
  'TriangleAreaCalculator': TriangleAreaCalculator,
  'GradeCalculator': GradeCalculator,
  'BiweeklyPayCalculator': BiweeklyPayCalculator,
  'PregnancyCalculator': PregnancyCalculator,
  'OvulationCalculator': OvulationCalculator,
  'BloodPressureCalculator': BloodPressureCalculator,
  'DebtPayoffCalculator': DebtPayoffCalculator,
  'MacroCalculator': MacroCalculator,
  'Calculator401k': Calculator401k,
  'RothIRACalculator': RothIRACalculator,
  'SocialSecurityCalculator': SocialSecurityCalculator,
  'CreditCardPayoffCalculator': CreditCardPayoffCalculator,
  'EmergencyFundCalculator': EmergencyFundCalculator,
  'ExamScorePredictorCalculator': ExamScorePredictorCalculator,
  'NetWorthCalculator': NetWorthCalculator,
  'RetirementSavingsCalculator': RetirementSavingsCalculator,
  'SavingsGoalCalculator': SavingsGoalCalculator,
  'SleepCalculator': SleepCalculator,
  'TripPlannerCalculator': TripPlannerCalculator,
};

export function getCalculatorComponent(componentName: string) {
  return calculatorComponents[componentName];
}
