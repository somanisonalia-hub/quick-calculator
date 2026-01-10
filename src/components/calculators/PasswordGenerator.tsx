'use client';

import { useState } from 'react';

interface PasswordGeneratorProps {
  lang?: string;
}

export default function PasswordGenerator({ lang = 'en' }: PasswordGeneratorProps) {
  // Embedded translations following CALCULATOR_CREATION_AGENT.md approach
  const translations = {
    en: {
      title: "Password Generator",
      description: "Generate secure passwords for your accounts",
      passwordLength: "Password Length",
      uppercase: "Include Uppercase Letters",
      lowercase: "Include Lowercase Letters",
      numbers: "Include Numbers",
      symbols: "Include Symbols",
      generate: "Generate Password",
      generatedPassword: "Generated Password",
      copy: "Copy to Clipboard"
    },
    es: {
      title: "Generador de Contraseñas",
      description: "Genera contraseñas seguras para tus cuentas",
      passwordLength: "Longitud de Contraseña",
      uppercase: "Incluir Mayúsculas",
      lowercase: "Incluir Minúsculas",
      numbers: "Incluir Números",
      symbols: "Incluir Símbolos",
      generate: "Generar Contraseña",
      generatedPassword: "Contraseña Generada",
      copy: "Copiar al Portapapeles"
    },
    pt: {
      title: "Gerador de Senhas",
      description: "Gere senhas seguras para suas contas",
      passwordLength: "Comprimento da Senha",
      uppercase: "Incluir Letras Maiúsculas",
      lowercase: "Incluir Letras Minúsculas",
      numbers: "Incluir Números",
      symbols: "Incluir Símbolos",
      generate: "Gerar Senha",
      generatedPassword: "Senha Gerada",
      copy: "Copiar para Área de Transferência"
    },
    fr: {
      title: "Générateur de Mot de Passe",
      description: "Générez des mots de passe sécurisés pour vos comptes",
      passwordLength: "Longueur du Mot de Passe",
      uppercase: "Inclure Majuscules",
      lowercase: "Inclure Minuscules",
      numbers: "Inclure Chiffres",
      symbols: "Inclure Symboles",
      generate: "Générer Mot de Passe",
      generatedPassword: "Mot de Passe Généré",
      copy: "Copier dans le Presse-papiers"
    }
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [password, setPassword] = useState('');

  const generatePassword = () => {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    let chars = '';
    if (includeUppercase) chars += uppercase;
    if (includeLowercase) chars += lowercase;
    if (includeNumbers) chars += numbers;
    if (includeSymbols) chars += symbols;

    if (chars === '') return;

    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    setPassword(result);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{t.title}</h1>
        <p className="text-gray-600">{t.description}</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{t.passwordLength}</label>
          <input
            type="range"
            min="4"
            max="32"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full"
          />
          <div className="text-center mt-1">{length} characters</div>
        </div>

        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={includeUppercase}
              onChange={(e) => setIncludeUppercase(e.target.checked)}
              className="mr-2"
            />
{t.uppercase}
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={includeLowercase}
              onChange={(e) => setIncludeLowercase(e.target.checked)}
              className="mr-2"
            />
{t.lowercase}
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
              className="mr-2"
            />
{t.numbers}
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={includeSymbols}
              onChange={(e) => setIncludeSymbols(e.target.checked)}
              className="mr-2"
            />
{t.symbols}
          </label>
        </div>

        <button
          onClick={generatePassword}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
{t.generate}
        </button>

        {password && (
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-green-900 mb-2">{t.generatedPassword}</h3>
            <div className="text-lg font-mono bg-white p-2 rounded border font-bold text-green-600">
              {password}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
