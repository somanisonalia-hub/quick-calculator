/**
 * Loading skeleton for calculator components
 * Improves perceived performance while calculators load
 */
export default function CalculatorSkeleton() {
  return (
    <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border border-gray-200 animate-pulse">
      {/* Header skeleton */}
      <div className="mb-4">
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-100 rounded w-1/2"></div>
      </div>
      
      {/* Grid layout skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
        {/* Left column - Input fields */}
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-1.5">
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              <div className="h-10 bg-gray-100 rounded"></div>
            </div>
          ))}
          
          {/* Button skeleton */}
          <div className="h-11 bg-blue-200 rounded mt-4"></div>
        </div>
        
        {/* Right column - Results skeleton */}
        <div className="space-y-3">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
            <div className="h-5 bg-blue-200 rounded w-2/3 mb-3"></div>
            <div className="h-8 bg-blue-100 rounded w-full mb-2"></div>
            <div className="h-4 bg-blue-100 rounded w-3/4"></div>
          </div>
          
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 sm:p-4">
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom section skeleton */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="h-4 bg-gray-100 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-100 rounded w-5/6"></div>
      </div>
    </div>
  );
}
