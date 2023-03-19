import { Component, ErrorInfo, ReactNode } from 'react';

interface AppErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
}

interface ErrorBoundaryState {
  error: Error | null;
}

export default class ErrorBoundary extends Component<AppErrorBoundaryProps> {
  state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error) {
    if (error) {
      return { hasError: true, error };
    }
  }

  // TODO: Implement componentDidCatch
  componentDidCatch(_error: Error, _info: ErrorInfo) {
    // console.log(error, info);
  }

  render() {
    if (this.state.error) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}
