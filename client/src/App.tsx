import React from "react";

function TestHome() {
  return <div style={{padding: 20}}>Home - No routing, no context</div>;
}

function TestEarlyAccess() {
  return <div style={{padding: 20}}>Early Access - No routing, no context</div>;
}

export default function App() {
  const path = window.location.pathname;
  
  if (path === '/early-access') {
    return <TestEarlyAccess />;
  }
  
  return <TestHome />;
}
