'use client';

import React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-[100vw] h-[100vh] flex flex-col justify-center items-center p-4 text-center">
          <h1 className="text-2xl font-bold text-red-600">
            Something went wrong
          </h1>
          <p className="mt-2 text-gray-700">
            Please refresh the page or try again later.
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
