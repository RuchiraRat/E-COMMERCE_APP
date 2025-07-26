// src/context/ShopContext.jsx
import { createContext } from "react";
import { products } from "../assets/assets";

export const ShopContext = createContext();

const ShopProvider = ({ children }) => {
  const currency = "Rs"; // Default currency symbol
  const delivery_fee = 300; // Default delivery fee

  const value = {
    products,
    currency,
    delivery_fee,
  };

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopProvider;
