import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import EarlyAccess from "@/pages/early-access";
import HostApplication from "@/pages/host-application";
import SimpleDashboard from "@/pages/simple-dashboard";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/early-access" component={EarlyAccess} />
      <Route path="/host" component={HostApplication} />
      <Route path="/dashboard" component={SimpleDashboard} />
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
