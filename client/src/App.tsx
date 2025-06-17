import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import Country from "@/pages/country";
import Countries from "@/pages/countries";
import VisaChecker from "@/pages/visa-checker";
import Services from "@/pages/services";
import ApplicationStatus from "@/pages/application-status";
import Admin from "@/pages/admin";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/countries" component={Countries} />
      <Route path="/country/:code" component={Country} />
      <Route path="/visa-checker" component={VisaChecker} />
      <Route path="/services" component={Services} />
      <Route path="/application-status" component={ApplicationStatus} />
      <Route path="/admin" component={Admin} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
