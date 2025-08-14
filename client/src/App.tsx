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

function Router() {
  return (
    <>
      <UTMCapture />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/early-access" component={EarlyAccess} />
        <Route path="/host" component={HostApplication} />
        <Route path="/host-application" component={HostApplication} />
        <Route path="/thank-you" component={ThankYou} />
        <Route path="/dashboard" component={SimpleDashboard} />
        <Route component={NotFound} />
      </Switch>
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
