import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { UTMCapture } from "@/components/UTMCapture";
import { SafeBoundary } from "@/components/SafeBoundary";
import Home from "@/pages/home/Home";
import EarlyAccess from "@/pages/early-access";
import HostApplication from "@/pages/host-application";
import ThankYou from "@/pages/thank-you";
import "./index.css";

const el = document.getElementById("root");
if (!el) throw new Error("No #root element");

createRoot(el).render(
  <React.StrictMode>
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
  </React.StrictMode>
);
