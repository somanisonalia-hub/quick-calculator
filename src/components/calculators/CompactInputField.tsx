import React from 'react';

interface CompactInputFieldProps {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  type?: 'number' | 'select' | 'text';
  min?: number | string;
  max?: number | string;
  step?: number | string;
  options?: Array<string | { value: string; label: string }>;
  placeholder?: string;
  className?: string;
  compact?: boolean;
}

export default function CompactInputField({
  label,
  value,
  onChange,
  type = 'number',
  min,
  max,
  step,
  options = [],
  placeholder = '',
  className = '',
  compact = true
}: CompactInputFieldProps) {
  
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    
    // Allow empty input for clearing
    if (val === '') {
      onChange('');
      return;
    }
    
    // Remove leading zeros but keep "0" and decimals
    val = val.replace(/^0+(?=\d)/, '');
    
    onChange(val);
  };

  return (
    <div className={`space-y-1 ${className}`}>
      <label className={`block font-medium text-gray-700 ${compact ? 'text-xs sm:text-sm' : 'text-sm'}`}>
        {label}
      </label>
      
      {type === 'select' && options.length > 0 ? (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            compact
              ? 'px-2 py-1.5 text-sm'
              : 'px-3 py-2 text-base'
          }`}
        >
          {options.map((option) => {
            const optValue = typeof option === 'string' ? option : option.value;
            const optLabel = typeof option === 'string' ? option : option.label;
            return (
              <option key={optValue} value={optValue}>
                {optLabel}
              </option>
            );
          })}
        </select>
      ) : (
        <input
          type={type}
          value={value}
          onChange={type === 'number' ? handleNumberChange : (e) => onChange(e.target.value)}
          min={min}
          max={max}
          step={step}
          placeholder={placeholder}
          className={`w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            compact
              ? 'px-2 py-1.5 text-sm'
              : 'px-3 py-2 text-base'
          }`}
        />
      )}
    </div>
  );
}
