'use client';


import React, { Component, ErrorInfo, ReactNode } from 'react';
import Link from 'next/link';

interface Props {
  children: ReactNode;
  calculatorName?: string;
  onReset?: () => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

/**
 * Error Boundary for Calculator Components
 * Catches JavaScript errors in calculator components and displays a fallback UI
 * instead of crashing the entire page
 */
class CalculatorErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      error,
      errorInfo: null
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to console for debugging
    console.error('Calculator Error:', error);
    console.error('Error Info:', errorInfo);
    
    // Update state with error details
    this.setState({
      error,
      errorInfo
    });

    // You can also log to an error reporting service here
    // e.g., Sentry, LogRocket, etc.
  }

  handleReset = () => {
    // Reset error state
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });

    // Call custom reset handler if provided
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  render() {
    if (this.state.hasError) {
      const isDevelopment = process.env.NODE_ENV === 'development';

      return (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 sm:p-8">
          <div className="flex items-start">
            {/* Error Icon */}
            <div className="flex-shrink-0">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>

            {/* Error Content */}
            <div className="ml-4 flex-1">
              <h3 className="text-lg font-semibold text-red-900 mb-2">
                {this.props.calculatorName ? `${this.props.calculatorName} Error` : 'Calculator Error'}
              </h3>
              
              <p className="text-sm text-red-700 mb-4">
                We&apos;re sorry, but something went wrong with this calculator. 
                This issue has been logged and we&apos;ll work to fix it.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={this.handleReset}
                  className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
                >
                  Try Again
                </button>
                
                <Link
                  href="/"
                  className="px-4 py-2 bg-white text-red-600 text-sm font-medium rounded-md border border-red-200 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
                >
                  Back to Home
                </Link>

                <button
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 bg-white text-gray-700 text-sm font-medium rounded-md border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                >
                  Reload Page
                </button>
              </div>

              {/* Development Mode: Show Error Details */}
              {isDevelopment && this.state.error && (
                <details className="mt-4 text-xs">
                  <summary className="cursor-pointer text-red-800 font-medium hover:text-red-900">
                    Error Details (Development Only)
                  </summary>
                  <div className="mt-2 p-3 bg-red-100 rounded border border-red-300 overflow-auto">
                    <p className="font-mono text-red-900 mb-2">
                      <strong>Error:</strong> {this.state.error.message}
                    </p>
                    {this.state.error.stack && (
                      <pre className="text-red-800 whitespace-pre-wrap break-words">
                        {this.state.error.stack}
                      </pre>
                    )}
                    {this.state.errorInfo && (
                      <pre className="mt-2 text-red-800 whitespace-pre-wrap break-words">
                        {this.state.errorInfo.componentStack}
                      </pre>
                    )}
                  </div>
                </details>
              )}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default CalculatorErrorBoundary;
