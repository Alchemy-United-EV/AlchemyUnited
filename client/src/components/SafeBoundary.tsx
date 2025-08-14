import React from "react";

interface SafeBoundaryProps {
  children: React.ReactNode;
}

interface SafeBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class SafeBoundary extends React.Component<SafeBoundaryProps, SafeBoundaryState> {
  constructor(props: SafeBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  
  static getDerivedStateFromError(error: Error): SafeBoundaryState {
    return { hasError: true, error };
  }
  
  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("Boundary caught:", error, info);
  }
  
  render() {
    if (this.state.hasError) {
      return <div style={{ padding: 20, color: "red" }}>
        ❌ Error: {String(this.state.error)}
      </div>;
    }
    return this.props.children;
  }
}