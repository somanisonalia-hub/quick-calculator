import React from 'react';

interface ResultOutput {
  label: string;
  field: string;
  format?: 'currency' | 'number' | 'text';
}

interface CompactResultsDisplayProps {
  title: string;
  mainLabel: string;
  mainValue: string | number | null;
  mainDefault?: string;
  mainHighlight?: 'blue' | 'green' | 'purple' | 'red';
  additionalOutputs?: ResultOutput[];
  results?: Record<string, any>;
  formatValue?: (value: any, format?: string) => string;
  infoMessage?: React.ReactNode;
  className?: string;
}

export default function CompactResultsDisplay({
  title,
  mainLabel,
  mainValue,
  mainDefault = '—',
  mainHighlight = 'blue',
  additionalOutputs = [],
  results = {},
  formatValue,
  infoMessage,
  className = ''
}: CompactResultsDisplayProps) {
  const highlightColors = {
    blue: 'bg-blue-50 border-blue-500 text-blue-600',
    green: 'bg-green-50 border-green-500 text-green-600',
    purple: 'bg-purple-50 border-purple-500 text-purple-600',
    red: 'bg-red-50 border-red-500 text-red-600',
  };

  return (
    <div className={`space-y-3 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 mb-3">{title}</h3>

      {/* Main Output - Compact */}
      <div className={`${highlightColors[mainHighlight]} p-3 rounded-lg border-l-4`}>
        <div className="text-xs text-gray-600 mb-1 font-medium">{mainLabel}</div>
        <div className="text-2xl font-bold">
          {mainValue ?? mainDefault}
        </div>
      </div>

      {/* Additional Outputs - Responsive Grid */}
      {additionalOutputs.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {additionalOutputs.map((output) => {
            const value = results[output.field];
            const formattedValue = formatValue 
              ? formatValue(value, output.format)
              : value ?? '—';

            return (
              <div key={output.field} className="bg-gray-50 p-2 rounded-lg">
                <div className="text-xs text-gray-600 mb-1 font-medium">{output.label}</div>
                <div className="text-sm font-semibold text-gray-900">
                  {formattedValue}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Info Message - Compact */}
      {infoMessage && (
        <div className="mt-2 p-2 bg-yellow-50 rounded border border-yellow-200">
          <p className="text-xs text-yellow-800">
            {infoMessage}
          </p>
        </div>
      )}
    </div>
  );
}
