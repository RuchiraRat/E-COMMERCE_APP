import React, { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopProvider = ({ children }) => {
  const currency = "Rs";
  const delivery_fee = 300;

  // State declarations
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const navigate = useNavigate();

  // ✅ Function to add items to cart
  const addToCart = async (itemId, size) => {
    let cartData = structuredClone(cartItems); // Clone to avoid direct mutation

    if (!size) {
      toast.error("Please select a size before adding to cart.");
      return; // Exit if size is not selected
    }


    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    setCartItems(cartData); // ✅ Update state
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        if (cartItems[itemId][size] > 0) {
          totalCount += cartItems[itemId][size];
        }
      }
    }
    return totalCount;
  }

  const updateQuantity = async (itemId,size,quantity) => {

    let cartData = structuredClone(cartItems); // Clone to avoid direct mutation

    cartData[itemId][size] = quantity;

    setCartItems(cartData); // ✅ Update state
  }

  const getCartAmount = () => {
    let totalAmount = 0;
    for( const items in cartItems){
      let itemInfo = products.find((product)=> product._id === items );
      for (const item in cartItems[items]) {
        try {
           if (cartItems[items][item] > 0) {
               totalAmount += itemInfo.price * cartItems[items][item];
        }
      } catch (error) {

      }
    }
  }
  return totalAmount;
}

    
  


  // Value provided to context consumers
  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate
  };

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopProvider;
