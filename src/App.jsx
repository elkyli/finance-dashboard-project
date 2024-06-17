import React from "react";
import { StockProvider } from "./components/StockContext";
import StockForm from "./components/StockForm";
import StockList from "./components/StockList";

function App() {
  return (
    <>
      <h1> My Finance Dashboard</h1>
      <StockProvider>
        <StockForm />
        <StockList />
      </StockProvider>
    </>
  );
}

export default App;
