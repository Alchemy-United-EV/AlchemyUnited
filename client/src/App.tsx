import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function EarlyAccessInline(){
  console.log("[EA] React", React.version);
  return <main><h1>Inline Early Access</h1><Link to="/">Home</Link></main>;
}

function HomeInline(){
  return <main><h1>Home</h1><a href="/early-access">Go to /early-access</a></main>;
}

export default function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeInline/>} />
        <Route path="/early-access" element={<EarlyAccessInline/>} />
      </Routes>
    </BrowserRouter>
  );
}
