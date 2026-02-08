// @ts-nocheck
import dynamic from 'next/dynamic';
import CalculatorSkeleton from '../CalculatorSkeleton';

// Optimized loading component with skeleton
const LoadingComponent = () => <CalculatorSkeleton />;

// Lazy load calculator components with skeleton loader
const AverageCalculator = dynamic(() => import('./AverageCalculator'), {
  loading: LoadingComponent,
  ssr: false, // Disable SSR for interactive calculators
});

const MortgageCalculator = dynamic(() => import('./MortgageCalculator'), {
  loading: LoadingComponent,
  ssr: false,
});

const LoanCalculator = dynamic(() => import('./LoanCalculator'), {
  loading: LoadingComponent,
  ssr: false,
});

const BMICalculator = dynamic(() => import('./BMICalculator'), {
  loading: LoadingComponent,
  ssr: false,
});

const CreditCardCalculator = dynamic(() => import('./CreditCardCalculator'), {
  loading: LoadingComponent,
  ssr: false,
});

const SavingsCalculator = dynamic(() => import('./SavingsCalculator'), {
  loading: LoadingComponent,
  ssr: false,
});

const TaxCalculator = dynamic(() => import('./TaxCalculator'), {
  loading: LoadingComponent,
  ssr: false,
});

const RetirementCalculator = dynamic(() => import('./RetirementCalculator'), {
  loading: LoadingComponent,
  ssr: false,
});

const InvestmentCalculator = dynamic(() => import('./InvestmentCalculator'), {
  loading: LoadingComponent,
  ssr: false,
});

const BudgetCalculator = dynamic(() => import('./BudgetCalculator'), {
  loading: LoadingComponent,
  ssr: false,
});

const GenericCalculator = dynamic(() => import('./GenericCalculator'), {
  loading: LoadingComponent,
  ssr: false,
});

const CurrencyConverter = dynamic(() => import('./CurrencyConverter'), {
  loading: LoadingComponent,
  ssr: false,
});

const GPACalculator = dynamic(() => import('./GPACalculator'), {
  loading: LoadingComponent,
  ssr: false,
});

const PropertyTaxCalculator = dynamic(() => import('./PropertyTaxCalculator'), {
  loading: LoadingComponent,
  ssr: false,
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

const CalorieDeficitCalculator = dynamic(() => import('./CalorieDeficitCalculator'), {
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

const BreakEvenCalculator = dynamic(() => import('./BreakEvenCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

const CaloriesBurnedCalculator = dynamic(() => import('./CaloriesBurnedCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

const DecimalToFractionCalculator = dynamic(() => import('./DecimalToFractionCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

const DiscountCalculator = dynamic(() => import('./DiscountCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

const DueDateCalculator = dynamic(() => import('./DueDateCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

const HeightCalculator = dynamic(() => import('./HeightCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

const LoveCalculator = dynamic(() => import('./LoveCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

const PaceCalculator = dynamic(() => import('./PaceCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

const RentVsBuyCalculator = dynamic(() => import('./RentVsBuyCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

const ROICalculator = dynamic(() => import('./ROICalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

const StudentLoanCalculator = dynamic(() => import('./StudentLoanCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

const BodyCompositionCalculator = dynamic(() => import('./BodyCompositionCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

const EnergyExpenditureCalculator = dynamic(() => import('./EnergyExpenditureCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

const ExponentCalculator = dynamic(() => import('./ExponentCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

const FactorialCalculator = dynamic(() => import('./FactorialCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

const FitnessMetricsCalculator = dynamic(() => import('./FitnessMetricsCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

const GcdLcmCalculator = dynamic(() => import('./GcdLcmCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

const LogarithmCalculator = dynamic(() => import('./LogarithmCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

const LongDivisionCalculator = dynamic(() => import('./LongDivisionCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

const NutritionAnalysisCalculator = dynamic(() => import('./NutritionAnalysisCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

const PercentileCalculator = dynamic(() => import('./PercentileCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

const ProbabilityCalculator = dynamic(() => import('./ProbabilityCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

const WellnessTrackerCalculator = dynamic(() => import('./WellnessTrackerCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

const ElectricityCostCalculator = dynamic(() => import('./ElectricityCostCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

const SIPCalculator = dynamic(() => import('./SIPCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

const LumpsumInvestmentCalculator = dynamic(() => import('./LumpsumInvestmentCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

const GoalBasedInvestmentCalculator = dynamic(() => import('./GoalBasedInvestmentCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

const MutualFundXIRRCalculator = dynamic(() => import('./MutualFundXIRRCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

const MutualFundInflationCalculator = dynamic(() => import('./MutualFundInflationCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

const XIRRVsAbsoluteReturnCalculator = dynamic(() => import('./XIRRVsAbsoluteReturnCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

const FuelCostCalculator = dynamic(() => import('./FuelCostCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

const GeometryAreaCalculator = dynamic(() => import('./GeometryAreaCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

const LinearEquationCalculator = dynamic(() => import('./LinearEquationCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

const ShippingCostCalculator = dynamic(() => import('./ShippingCostCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});

const StudyHoursPlannerCalculator = dynamic(() => import('./StudyHoursPlannerCalculator'), {
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
  'CalorieDeficitCalculator': CalorieDeficitCalculator,
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

  'BreakEvenCalculator': BreakEvenCalculator,
  'CaloriesBurnedCalculator': CaloriesBurnedCalculator,
  'DecimalToFractionCalculator': DecimalToFractionCalculator,
  'DiscountCalculator': DiscountCalculator,
  'DueDateCalculator': DueDateCalculator,
  'HeightCalculator': HeightCalculator,
  'LoveCalculator': LoveCalculator,
  'PaceCalculator': PaceCalculator,
  'RentVsBuyCalculator': RentVsBuyCalculator,
  'ROICalculator': ROICalculator,
  'StudentLoanCalculator': StudentLoanCalculator,
  'BodyCompositionCalculator': BodyCompositionCalculator,
  'EnergyExpenditureCalculator': EnergyExpenditureCalculator,
  'ExponentCalculator': ExponentCalculator,
  'FactorialCalculator': FactorialCalculator,
  'FitnessMetricsCalculator': FitnessMetricsCalculator,
  'GcdLcmCalculator': GcdLcmCalculator,
  'LogarithmCalculator': LogarithmCalculator,
  'LongDivisionCalculator': LongDivisionCalculator,
  'NutritionAnalysisCalculator': NutritionAnalysisCalculator,
  'PercentileCalculator': PercentileCalculator,
  'ProbabilityCalculator': ProbabilityCalculator,
  'WellnessTrackerCalculator': WellnessTrackerCalculator,
  'ElectricityCostCalculator': ElectricityCostCalculator,
  'SIPCalculator': SIPCalculator,
  'LumpsumInvestmentCalculator': LumpsumInvestmentCalculator,
  'GoalBasedInvestmentCalculator': GoalBasedInvestmentCalculator,
  'MutualFundXIRRCalculator': MutualFundXIRRCalculator,
  'MutualFundInflationCalculator': MutualFundInflationCalculator,
  'XIRRVsAbsoluteReturnCalculator': XIRRVsAbsoluteReturnCalculator,
  'FuelCostCalculator': FuelCostCalculator,
  'GenericCalculator': GenericCalculator,
  'GeometryAreaCalculator': GeometryAreaCalculator,
  'LinearEquationCalculator': LinearEquationCalculator,
  'ShippingCostCalculator': ShippingCostCalculator,
  'StudyHoursPlannerCalculator': StudyHoursPlannerCalculator,
};

export function getCalculatorComponent(componentName: string) {
  return calculatorComponents[componentName];
}
