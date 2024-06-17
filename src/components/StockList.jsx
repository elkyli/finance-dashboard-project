import { useContext, useEffect, useState } from "react";
import { StockContext } from "./StockContext";
import "./StockStyling.css";

const StockList = () => {
  const { stocks, stockData } = useContext(StockContext);
  const [profitLossData, setProfitLossData] = useState([]);

  useEffect(() => {
    const calculateProfitLoss = () => {
      if (stocks.length > 0 && stockData.length > 0) {
        const updatedProfitLossData = calculateProfitLossForStocks(
          stocks,
          stockData
        );
        setProfitLossData(updatedProfitLossData);
      } else {
        setProfitLossData([]);
      }
    };

    calculateProfitLoss();
  }, [stocks, stockData]);

  const calculateProfitLossForStocks = (stocks, stockData) => {
    return stocks.map((stock) => {
      const currentStockData = stockData.find(
        (data) => data.symbol === stock.symbol
      );
      if (currentStockData) {
        const currentPrice = parseFloat(currentStockData.price);
        const purchasePrice = parseFloat(stock.purchasePrice);
        const quantity = parseInt(stock.quantity);
        const profitLoss = (currentPrice - purchasePrice) * quantity;
        return { ...stock, profitLoss };
      }
      return stock;
    });
  };

  return (
    <div className="stockList">
      <h2>Stock List</h2>
      {profitLossData.length > 0 ? (
        <ul>
          {profitLossData.map((stock, index) => (
            <li key={index}>
              Symbol: {stock.symbol}, Quantity: {stock.quantity}, Purchase
              Price: {stock.purchasePrice}, Profit/Loss: {stock.profitLoss}
            </li>
          ))}
        </ul>
      ) : (
        <p>
          <h3>No stocks added yet.</h3>
        </p>
      )}
    </div>
  );
};

export default StockList;
