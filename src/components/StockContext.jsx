import { createContext, useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";

export const StockContext = createContext();

export const StockProvider = ({ children }) => {
  const [stocks, setStocks] = useState([]);
  const [validSymbols, setValidSymbols] = useState([]);
  const [stockData, setStockData] = useState([]);
  const [symbolsQuery, setSymbolsQuery] = useState("");

  useEffect(() => {
    const fetchValidSymbols = async () => {
      const apiKey = "IK1E81QFXW3302JN";
      const apiUrl = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbols=${symbolsQuery}&apikey=${apiKey}`;

      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setValidSymbols(data.symbols || []);
      } catch (error) {
        console.error("Error fetching valid symbols:", error);
      }
    };

    fetchValidSymbols();
  }, [symbolsQuery]);

  useEffect(() => {
    const fetchStockData = async () => {
      const apiKey = "IK1E81QFXW3302JN";
      const symbolsQuery = stocks.map((stock) => stock.symbol).join(",");
      setSymbolsQuery(symbolsQuery);
      const apiUrl = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbols=${symbolsQuery}&apikey=${apiKey}`;

      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setStockData(data["Stock Quotes"]);
      } catch (error) {
        console.error("Error fetching stock data:", error);
      }
    };

    if (stocks.length > 0) {
      fetchStockData();
    }
  }, [stocks]);

  const addStock = (stock) => {
    setStocks([...stocks, stock]);
  };

  const contextValue = useMemo(
    () => ({ stocks, addStock, validSymbols, stockData }),
    [stocks, validSymbols, stockData]
  );

  return (
    <StockContext.Provider value={contextValue}>
      {children}
    </StockContext.Provider>
  );
};

StockProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
