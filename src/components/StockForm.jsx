import { useState, useContext } from "react";
import { StockContext } from "./StockContext";
import "./StockStyling.css";

function StockForm() {
  const [symbol, setSymbol] = useState("");
  const [quantity, setQuantity] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { addStock, validSymbols } = useContext(StockContext);

  const handleSubmit = () => {
    if (
      validSymbols &&
      validSymbols.length > 0 &&
      validSymbols.includes(symbol)
    ) {
      setErrorMessage("");
      const newStock = {
        symbol,
        quantity: Number(quantity),
        purchasePrice: Number(purchasePrice),
      };
      addStock(newStock);
      console.log("Submitted: ", newStock);
      setSymbol("");
      setQuantity(0);
      setPurchasePrice(0);
    } else {
      setErrorMessage("Invalid stock symbol. Please enter a valid symbol.");
    }
  };

  return (
    <div>
      <div className="stockForm">
        <input
          type="text"
          placeholder="Stock Symbol"
          value={symbol}
          onChange={(event) => setSymbol(event.target.value.toUpperCase())}
          list="validSymbolsList"
        />
        {validSymbols && validSymbols.length > 0 && (
          <datalist id="validSymbolsList">
            {validSymbols.map((validSymbol) => {
              return <option value={validSymbol} key={validSymbol}></option>;
            })}
          </datalist>
        )}
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(event) => setQuantity(event.target.value)}
        />
        <input
          type="number"
          placeholder="Purchase Price"
          value={purchasePrice}
          onChange={(event) => setPurchasePrice(event.target.value)}
        />
        <button onClick={handleSubmit}>Add Stock</button>{" "}
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default StockForm;
