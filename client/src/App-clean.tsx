import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { AuthWrapper } from "@/components/ui/AuthWrapper";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home-restored";
import EarlyAccess from "@/pages/early-access";
import HostApplication from "@/pages/host-application";
import SmartFormDemo from "@/pages/smart-form-demo";
import Dashboard from "@/pages/dashboard";
import Verify from "@/pages/verify";

function Router() {
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
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  );
}

export default App;