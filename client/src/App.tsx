import React from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home/Home";
import EarlyAccess from "@/pages/early-access";
import HostApplication from "@/pages/host-application";
import SimpleDashboard from "@/pages/simple-dashboard";
import ThankYou from "@/pages/thank-you";
import { UTMCapture } from "@/components/UTMCapture";

class RouteErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    console.error("[route crash]", error);
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <div style={{ color: "red" }}>Route crashed — check console logs.</div>;
    }

    return this.props.children;
  }
}

function Router() {
  return (
    <>
      <UTMCapture />
      <RouteErrorBoundary>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/early-access" component={EarlyAccess} />
          <Route path="/host-application" component={HostApplication} />
          <Route path="/thank-you" component={ThankYou} />
          <Route component={Home} />
        </Switch>
      </RouteErrorBoundary>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  );
}

export default App;
