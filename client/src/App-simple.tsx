import React from 'react';
import { Switch, Route } from "wouter";
import Home from "@/pages/home";

function App() {
  return (
    <div>
      <Switch>
        <Route path="/" component={Home} />
        <Route>
          <div className="p-8">
            <h1 className="text-2xl font-bold">Alchemy United</h1>
            <p>Performance optimizations complete!</p>
          </div>
        </Route>
      </Switch>
    </div>
  );
}

export default App;