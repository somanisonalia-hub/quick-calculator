'use client';

import React, { useState } from 'react';

interface BloodPressureCalculatorProps {
  lang?: string;
}

export default function BloodPressureCalculator({ lang = 'en' }: BloodPressureCalculatorProps) {
  const translations = {
    en: {
      title: "Blood Pressure Calculator",
      systolic: "Systolic (top number)",
      diastolic: "Diastolic (bottom number)",
      mmHg: "mmHg",
      calculate: "Check Blood Pressure",
      reset: "Reset",
      results: "Blood Pressure Results",
      bpCategory: "BP Category",
      riskLevel: "Risk Level",
      normal: "Normal",
      elevated: "Elevated",
      stage1: "Stage 1 Hypertension",
      stage2: "Stage 2 Hypertension",
      crisis: "Hypertensive Crisis",
      lowRisk: "Low Risk",
      moderateRisk: "Moderate Risk",
      highRisk: "High Risk",
      veryHighRisk: "Very High Risk",
      immediateRisk: "Seek Immediate Care",
      recommendations: "Recommendations",
      tip: "Tip",
      tipText: "Blood pressure varies throughout the day. For accurate readings, measure in the morning before medication, sit for 5 minutes, and relax. Multiple readings are needed for diagnosis.",
      normal_rec: "Maintain current lifestyle with regular exercise and healthy diet.",
      elevated_rec: "Increase physical activity, reduce sodium intake, and manage stress.",
      stage1_rec: "Consult with a healthcare provider. Consider lifestyle modifications.",
      stage2_rec: "Seek medical evaluation promptly. Treatment may be necessary.",
      crisis_rec: "If accompanied by symptoms, call emergency services immediately."
    },
    es: {
      title: "Calculadora de Presión Arterial",
      systolic: "Sistólica (número superior)",
      diastolic: "Diastólica (número inferior)",
      mmHg: "mmHg",
      calculate: "Verificar Presión Arterial",
      reset: "Reiniciar",
      results: "Resultados de Presión Arterial",
      bpCategory: "Categoría de PA",
      riskLevel: "Nivel de Riesgo",
      normal: "Normal",
      elevated: "Elevada",
      stage1: "Hipertensión Etapa 1",
      stage2: "Hipertensión Etapa 2",
      crisis: "Crisis Hipertensiva",
      lowRisk: "Riesgo Bajo",
      moderateRisk: "Riesgo Moderado",
      highRisk: "Riesgo Alto",
      veryHighRisk: "Riesgo Muy Alto",
      immediateRisk: "Buscar Atención de Emergencia",
      recommendations: "Recomendaciones",
      tip: "Consejo",
      tipText: "La presión arterial varía a lo largo del día. Para lecturas precisas, mida por la mañana antes de medicamentos.",
      normal_rec: "Mantenga el estilo de vida actual con ejercicio regular.",
      elevated_rec: "Aumente la actividad física y reduzca la ingesta de sodio.",
      stage1_rec: "Consulte con un proveedor de salud.",
      stage2_rec: "Busque evaluación médica prontamente.",
      crisis_rec: "Si hay síntomas, llame a emergencias inmediatamente."
    },
    pt: {
      title: "Calculadora de Pressão Arterial",
      systolic: "Sistólica (número superior)",
      diastolic: "Diastólica (número inferior)",
      mmHg: "mmHg",
      calculate: "Verificar Pressão Arterial",
      reset: "Reiniciar",
      results: "Resultados de Pressão Arterial",
      bpCategory: "Categoria de PA",
      riskLevel: "Nível de Risco",
      normal: "Normal",
      elevated: "Elevada",
      stage1: "Hipertensão Estágio 1",
      stage2: "Hipertensão Estágio 2",
      crisis: "Crise Hipertensiva",
      lowRisk: "Baixo Risco",
      moderateRisk: "Risco Moderado",
      highRisk: "Alto Risco",
      veryHighRisk: "Risco Muito Alto",
      immediateRisk: "Procure Atendimento de Emergência",
      recommendations: "Recomendações",
      tip: "Dica",
      tipText: "A pressão arterial varia ao longo do dia. Para leituras precisas, meça pela manhã antes de medicamentos.",
      normal_rec: "Mantenha o estilo de vida atual com exercício regular.",
      elevated_rec: "Aumente a atividade física e reduza a ingestão de sódio.",
      stage1_rec: "Consulte um profissional de saúde.",
      stage2_rec: "Procure avaliação médica prontamente.",
      crisis_rec: "Se houver sintomas, ligue para emergências imediatamente."
    },
    fr: {
      title: "Calculatrice de Tension Artérielle",
      systolic: "Systolique (chiffre supérieur)",
      diastolic: "Diastolique (chiffre inférieur)",
      mmHg: "mmHg",
      calculate: "Vérifier la Tension Artérielle",
      reset: "Réinitialiser",
      results: "Résultats de Tension Artérielle",
      bpCategory: "Catégorie de TA",
      riskLevel: "Niveau de Risque",
      normal: "Normal",
      elevated: "Élevée",
      stage1: "Hypertension Stade 1",
      stage2: "Hypertension Stade 2",
      crisis: "Crise Hypertensive",
      lowRisk: "Faible Risque",
      moderateRisk: "Risque Modéré",
      highRisk: "Risque Élevé",
      veryHighRisk: "Risque Très Élevé",
      immediateRisk: "Chercher des Soins d'Urgence",
      recommendations: "Recommandations",
      tip: "Astuce",
      tipText: "La tension artérielle varie au cours de la journée. Pour des lectures précises, mesurez le matin avant les médicaments.",
      normal_rec: "Maintenez le style de vie actuel avec exercice régulier.",
      elevated_rec: "Augmentez l'activité physique et réduisez l'apport en sodium.",
      stage1_rec: "Consultez un professionnel de santé.",
      stage2_rec: "Demandez une évaluation médicale rapidement.",
      crisis_rec: "Si symptômes, appelez les services d'urgence immédiatement."
    }
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  const [systolic, setSystolic] = useState<number>(120);
  const [diastolic, setDiastolic] = useState<number>(80);
  const [results, setResults] = useState<{
    category: string;
    riskLevel: string;
    recommendations: string;
    categoryKey: string;
  } | null>(null);

  const getCategory = (sys: number, dia: number) => {
    if (sys >= 180 || dia >= 120) {
      return { category: t.crisis, riskLevel: t.immediateRisk, categoryKey: 'crisis' };
    }
    if (sys >= 140 || dia >= 90) {
      return { category: t.stage2, riskLevel: t.veryHighRisk, categoryKey: 'stage2' };
    }
    if (sys >= 130 || dia >= 80) {
      return { category: t.stage1, riskLevel: t.highRisk, categoryKey: 'stage1' };
    }
    if (sys >= 120 || dia < 80) {
      return { category: t.elevated, riskLevel: t.moderateRisk, categoryKey: 'elevated' };
    }
    return { category: t.normal, riskLevel: t.lowRisk, categoryKey: 'normal' };
  };

  const calculateBP = () => {
    const { category, riskLevel, categoryKey } = getCategory(systolic, diastolic);
    const recommendationsMap = {
      normal: t.normal_rec,
      elevated: t.elevated_rec,
      stage1: t.stage1_rec,
      stage2: t.stage2_rec,
      crisis: t.crisis_rec
    };

    setResults({
      category,
      riskLevel,
      recommendations: recommendationsMap[categoryKey as keyof typeof recommendationsMap],
      categoryKey
    });
  };

  const resetCalculator = () => {
    setSystolic(120);
    setDiastolic(80);
    setResults(null);
  };

  const getColorClass = (categoryKey: string) => {
    switch (categoryKey) {
      case 'normal':
        return 'bg-green-50 border-green-300';
      case 'elevated':
        return 'bg-yellow-50 border-yellow-300';
      case 'stage1':
        return 'bg-orange-50 border-orange-300';
      case 'stage2':
        return 'bg-red-50 border-red-300';
      case 'crisis':
        return 'bg-red-100 border-red-500';
      default:
        return 'bg-gray-50 border-gray-300';
    }
  };

  const getTextColorClass = (categoryKey: string) => {
    switch (categoryKey) {
      case 'normal':
        return 'text-green-700';
      case 'elevated':
        return 'text-yellow-700';
      case 'stage1':
        return 'text-orange-700';
      case 'stage2':
        return 'text-red-700';
      case 'crisis':
        return 'text-red-900';
      default:
        return 'text-gray-700';
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="mb-6 hidden">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{t.title}</h2>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
          <p className="text-sm text-blue-800">
            <strong>{t.tip}:</strong> {t.tipText}
          </p>
        </div>
      </div>

      {/* Input Fields */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t.systolic}
          </label>
          <div className="flex items-center">
            <input
              type="number"
              min="0"
              max="300"
              value={systolic}
              onChange={(e) => setSystolic(parseInt(e.target.value) || 0)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <span className="ml-2 text-gray-600 font-medium">{t.mmHg}</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t.diastolic}
          </label>
          <div className="flex items-center">
            <input
              type="number"
              min="0"
              max="300"
              value={diastolic}
              onChange={(e) => setDiastolic(parseInt(e.target.value) || 0)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <span className="ml-2 text-gray-600 font-medium">{t.mmHg}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={calculateBP}
          className="flex-1 px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors"
        >
          {t.calculate}
        </button>
        <button
          onClick={resetCalculator}
          className="px-6 py-3 bg-gray-500 text-white font-semibold rounded-md hover:bg-gray-600 transition-colors"
        >
          {t.reset}
        </button>
      </div>

      {/* Results */}
      {results && (
        <div className={`mt-6 p-6 rounded-lg border-2 ${getColorClass(results.categoryKey)}`}>
          <h3 className={`text-xl font-bold mb-4 ${getTextColorClass(results.categoryKey)}`}>
            {t.results}
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-gray-600 mb-1">{t.bpCategory}</p>
              <p className={`text-2xl font-bold ${getTextColorClass(results.categoryKey)}`}>
                {results.category}
              </p>
            </div>

            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-gray-600 mb-1">{t.riskLevel}</p>
              <p className={`text-2xl font-bold ${getTextColorClass(results.categoryKey)}`}>
                {results.riskLevel}
              </p>
            </div>
          </div>

          <div className="p-4 bg-white rounded-lg shadow-sm border-t-2" style={{borderTopColor: results.categoryKey === 'normal' ? '#10b981' : results.categoryKey === 'elevated' ? '#eab308' : results.categoryKey === 'stage1' ? '#f97316' : '#ef4444'}}>
            <p className="text-sm text-gray-600 mb-2 font-semibold">{t.recommendations}</p>
            <p className="text-gray-800">{results.recommendations}</p>
          </div>

          {results.categoryKey === 'crisis' && (
            <div className="mt-4 p-4 bg-red-100 border-2 border-red-500 rounded-lg">
              <p className="text-red-900 font-bold">
                ⚠️ This is a medical emergency. If you experience chest pain, shortness of breath, or vision changes, call emergency services immediately.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
