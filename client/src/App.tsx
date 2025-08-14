import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { SafeBoundary } from "@/components/SafeBoundary";
import { UTMCapture } from "@/components/UTMCapture";
import Home from "@/pages/home/Home";
import EarlyAccess from "@/pages/early-access";
import HostApplication from "@/pages/host-application";
import ThankYou from "@/pages/thank-you";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <UTMCapture />
        <SafeBoundary>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/early-access" element={<EarlyAccess />} />
            <Route path="/host-application" element={<HostApplication />} />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </SafeBoundary>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
