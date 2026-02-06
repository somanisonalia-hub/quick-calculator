interface CalculatorLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function CalculatorLogo({ className = '', size = 'md' }: CalculatorLogoProps) {
  const sizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <svg
      className={`${sizeClasses[size]} ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Calculator body */}
      <rect
        x="4"
        y="2"
        width="16"
        height="20"
        rx="2"
        fill="currentColor"
        opacity="0.1"
      />
      <rect
        x="4"
        y="2"
        width="16"
        height="20"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      
      {/* Display screen */}
      <rect
        x="6.5"
        y="4.5"
        width="11"
        height="4"
        rx="0.5"
        fill="currentColor"
        opacity="0.2"
      />
      
      {/* Button grid - 3x4 */}
      {/* Row 1 */}
      <circle cx="8" cy="12" r="1" fill="currentColor" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
      <circle cx="16" cy="12" r="1" fill="currentColor" />
      
      {/* Row 2 */}
      <circle cx="8" cy="15" r="1" fill="currentColor" />
      <circle cx="12" cy="15" r="1" fill="currentColor" />
      <circle cx="16" cy="15" r="1" fill="currentColor" />
      
      {/* Row 3 */}
      <circle cx="8" cy="18" r="1" fill="currentColor" />
      <circle cx="12" cy="18" r="1" fill="currentColor" />
      <circle cx="16" cy="18" r="1" fill="currentColor" />
    </svg>
  );
}
