import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { PerformanceBudget } from "@/components/PerformanceBudget";

import { AuthWrapper } from "@/components/ui/AuthWrapper";
import { useEffect } from "react";
import { initGA } from "./lib/analytics";
import { useAnalytics } from "./hooks/use-analytics";
import { useScrollTracking } from "./hooks/use-scroll-tracking";
import { usePerformanceTracking } from "./hooks/use-performance-tracking";
import { useBusinessAnalytics } from "./hooks/use-business-analytics";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import EarlyAccess from "@/pages/early-access";
import HostApplication from "@/pages/host-application";
import SmartFormDemo from "@/pages/smart-form-demo";
import Dashboard from "@/pages/dashboard";
import Verify from "@/pages/verify";

function Router() {
  // Track page views when routes change
  useAnalytics();
  
  // Track scroll behavior, performance, and business metrics
  useScrollTracking();
  usePerformanceTracking();
  useBusinessAnalytics();
  
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/early-access" component={EarlyAccess} />
      <Route path="/host" component={HostApplication} />
      <Route path="/smart-form-demo" component={SmartFormDemo} />
      <Route path="/dashboard">
        {() => (
          <AuthWrapper>
            <Dashboard />
          </AuthWrapper>
        )}
      </Route>
      <Route path="/verify" component={Verify} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Initialize Google Analytics when app loads
  useEffect(() => {
    // Verify required environment variable is present
    if (!import.meta.env.VITE_GA_MEASUREMENT_ID) {
      console.warn('Missing required Google Analytics key: VITE_GA_MEASUREMENT_ID');
    } else {
      initGA();
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <PerformanceBudget />
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
