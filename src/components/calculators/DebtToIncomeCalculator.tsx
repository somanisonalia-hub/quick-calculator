'use client';

import { useState } from 'react';

interface DebtToIncomeCalculatorProps {
  lang?: string;
}

export default function DebtToIncomeCalculator({ lang = 'en' }: DebtToIncomeCalculatorProps) {
  const translations = {
    en: {
      monthlyIncome: "Monthly Gross Income",
      mortgageRent: "Mortgage/Rent Payment",
      carLoans: "Car Loans",
      creditCards: "Credit Card Payments",
      studentLoans: "Student Loans",
      otherDebts: "Other Monthly Debts",
      calculate: "🔄 Recalculate",
      results: "Results",
      dtiRatio: "Debt-to-Income Ratio",
      totalMonthlyDebts: "Total Monthly Debts",
      interpretation: "Interpretation",
      excellent: "Excellent (0-20%): Excellent financial health",
      good: "Good (20-36%): Good position for loan approval",
      fair: "Fair (36-43%): May qualify for some loans",
      poor: "Poor (43%+): Difficult to get loan approval",
      recommendation: "Recommendation",
      excellentRec: "You have excellent financial health with plenty of income available after debt payments.",
      goodRec: "Your debt-to-income ratio is good. Most lenders prefer ratios below 36%.",
      fairRec: "Your ratio is borderline. Consider reducing debt before applying for new loans.",
      poorRec: "Your DTI is too high. Focus on paying down debt before taking on new loans.",
      reset: "Reset"
    },
    es: {
      monthlyIncome: "Ingreso Mensual Bruto",
      mortgageRent: "Pago de Hipoteca/Alquiler",
      carLoans: "Préstamos de Auto",
      creditCards: "Pagos de Tarjetas de Crédito",
      studentLoans: "Préstamos Estudiantiles",
      otherDebts: "Otras Deudas Mensuales",
      calculate: "🔄 Recalcular",
      results: "Resultados",
      dtiRatio: "Relación Deuda-Ingresos",
      totalMonthlyDebts: "Deudas Mensuales Totales",
      interpretation: "Interpretación",
      excellent: "Excelente (0-20%): Excelente salud financiera",
      good: "Bueno (20-36%): Buena posición para aprobación de préstamos",
      fair: "Aceptable (36-43%): Puede calificar para algunos préstamos",
      poor: "Pobre (43%+): Difícil obtener aprobación de préstamos",
      recommendation: "Recomendación",
      excellentRec: "Tienes excelente salud financiera con mucho ingreso disponible después de pagos de deuda.",
      goodRec: "Tu relación deuda-ingresos es buena. La mayoría de prestamistas prefieren ratios bajo 36%.",
      fairRec: "Tu ratio está en el límite. Considera reducir deuda antes de solicitar nuevos préstamos.",
      poorRec: "Tu DTI es demasiado alto. Enfócate en pagar deuda antes de tomar nuevos préstamos.",
      reset: "Restablecer"
    },
    fr: {
      monthlyIncome: "Revenu Mensuel Brut",
      mortgageRent: "Paiement Hypothèque/Loyer",
      carLoans: "Prêts Auto",
      creditCards: "Paiements Cartes de Crédit",
      studentLoans: "Prêts Étudiants",
      otherDebts: "Autres Dettes Mensuelles",
      calculate: "🔄 Recalculer",
      results: "Résultats",
      dtiRatio: "Ratio Dette-Revenu",
      totalMonthlyDebts: "Dettes Mensuelles Totales",
      interpretation: "Interprétation",
      excellent: "Excellent (0-20%) : Excellente santé financière",
      good: "Bon (20-36%) : Bonne position pour approbation de prêt",
      fair: "Correct (36-43%) : Peut être admissible à certains prêts",
      poor: "Faible (43%+) : Difficile d'obtenir une approbation de prêt",
      recommendation: "Recommandation",
      excellentRec: "Vous avez une excellente santé financière avec beaucoup de revenus disponibles après les paiements de dettes.",
      goodRec: "Votre ratio dette-revenu est bon. La plupart des prêteurs préfèrent des ratios inférieurs à 36%.",
      fairRec: "Votre ratio est limite. Envisagez de réduire vos dettes avant de demander de nouveaux prêts.",
      poorRec: "Votre DTI est trop élevé. Concentrez-vous sur le remboursement de vos dettes avant de contracter de nouveaux prêts.",
      reset: "Réinitialiser"
    },
    pt: {
      monthlyIncome: "Renda Mensal Bruta",
      mortgageRent: "Pagamento de Hipoteca/Aluguel",
      carLoans: "Empréstimos de Carro",
      creditCards: "Pagamentos de Cartão de Crédito",
      studentLoans: "Empréstimos Estudantis",
      otherDebts: "Outras Dívidas Mensais",
      calculate: "🔄 Recalcular",
      results: "Resultados",
      dtiRatio: "Relação Dívida-Renda",
      totalMonthlyDebts: "Dívidas Mensais Totais",
      interpretation: "Interpretação",
      excellent: "Excelente (0-20%): Excelente saúde financeira",
      good: "Bom (20-36%): Boa posição para aprovação de empréstimo",
      fair: "Razoável (36-43%): Pode se qualificar para alguns empréstimos",
      poor: "Ruim (43%+): Difícil obter aprovação de empréstimo",
      recommendation: "Recomendação",
      excellentRec: "Você tem excelente saúde financeira com muita renda disponível após pagamentos de dívidas.",
      goodRec: "Sua relação dívida-renda é boa. A maioria dos credores prefere taxas abaixo de 36%.",
      fairRec: "Sua taxa está no limite. Considere reduzir dívidas antes de solicitar novos empréstimos.",
      poorRec: "Seu DTI está muito alto. Foque em pagar dívidas antes de assumir novos empréstimos.",
      reset: "Redefinir"
    },
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  const [monthlyIncome, setMonthlyIncome] = useState<number | string>('5000');
  const [mortgageRent, setMortgageRent] = useState<number | string>('1200');
  const [carLoans, setCarLoans] = useState<number | string>('400');
  const [creditCards, setCreditCards] = useState<number | string>('200');
  const [studentLoans, setStudentLoans] = useState<number | string>('300');
  const [otherDebts, setOtherDebts] = useState<number | string>('100');
  const [calculated, setCalculated] = useState(false);

  const resetCalculator = () => {
    // Reset to default values
    setMonthlyIncome(0);
    setMortgageRent(0);
    setCarLoans(0);
    // Additional state resets may be needed
  };

  const totalDebts = (Number(mortgageRent) || 0) + (Number(carLoans) || 0) + (Number(creditCards) || 0) + (Number(studentLoans) || 0) + (Number(otherDebts) || 0);
  const income = Number(monthlyIncome) || 0;
  const dtiRatio = income > 0 ? (totalDebts / income) * 100 : 0;

  const getInterpretation = () => {
    if (dtiRatio <= 20) return { level: t.excellent, rec: t.excellentRec, color: 'text-green-600' };
    if (dtiRatio <= 36) return { level: t.good, rec: t.goodRec, color: 'text-blue-600' };
    if (dtiRatio <= 43) return { level: t.fair, rec: t.fairRec, color: 'text-yellow-600' };
    return { level: t.poor, rec: t.poorRec, color: 'text-red-600' };
  };

  const interpretation = getInterpretation();

  return (

    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="grid lg:grid-cols-2 gap-6">
        {/* ...existing code for all input fields and reset button... */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t.monthlyIncome}
          </label>
          <input
            type="number"
            value={monthlyIncome}
            onChange={(e) => setMonthlyIncome(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t.mortgageRent}
          </label>
          <input
            type="number"
            value={mortgageRent}
            onChange={(e) => setMortgageRent(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t.carLoans}
          </label>
          <input
            type="number"
            value={carLoans}
            onChange={(e) => setCarLoans(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t.creditCards}
          </label>
          <input
            type="number"
            value={creditCards}
            onChange={(e) => setCreditCards(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t.studentLoans}
          </label>
          <input
            type="number"
            value={studentLoans}
            onChange={(e) => setStudentLoans(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t.otherDebts}
          </label>
          <input
            type="number"
            value={otherDebts}
            onChange={(e) => setOtherDebts(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {/* Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            onClick={resetCalculator}
            className="flex-1 bg-gray-200 text-gray-800 py-2.5 px-4 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 text-sm font-semibold transition-colors duration-200"
          >
            {t.reset}
          </button>
        </div>
      </div>
      <button
        onClick={() => setCalculated(true)}
        className="w-full mt-6 bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors font-medium"
      >
        {t.calculate}
      </button>

      {/* Results Section */}
      {calculated && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-2xl font-bold mb-6 text-gray-800">{t.results}</h3>
          <div className="grid lg:grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">{t.dtiRatio}</div>
              <div className={`text-3xl font-bold ${interpretation.color}`}>
                {dtiRatio.toFixed(1)}%
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">{t.totalMonthlyDebts}</div>
              <div className="text-3xl font-bold text-gray-800">
                ${totalDebts.toLocaleString()}
              </div>
            </div>
          </div>
          <div className="border-t pt-4">
            <h4 className="font-semibold text-gray-800 mb-2">{t.interpretation}</h4>
            <p className={`font-medium mb-2 ${interpretation.color}`}>{interpretation.level}</p>
            <p className="text-gray-600">{interpretation.rec}</p>
          </div>
        </div>
      )}
    </div>
  );
}
