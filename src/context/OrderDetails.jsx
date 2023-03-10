import { createContext, useContext, useState } from "react";
import { pricePerItem } from "../constants";
import { formatCurrency } from "../utilities";

const OrderDetails = createContext();

//create custom hook to check if there is a provider

export function useOrderDetails() {
  const contextValue = useContext(OrderDetails);

  if (!contextValue) {
    throw new Error(
      "useOrderDetails must be called from within an OrderDetailsProvider"
    );
  }
  return contextValue;
}

export function OrderDetailsProvider(props) {
  const [optionCounts, setOptionCounts] = useState({
    scoops: {}, //example: { Chocolate: 1, Vanilla: 2 }
    toppings: {}, //example: { 'Cherries': 1 }
  });

  const updateItemCount = (itemName, newItemCount, optionType) => {
    //make a copy of state
    const newOptionCounts = { ...optionCounts };

    //update newOptionCounts w/ the new info
    newOptionCounts[optionType][itemName] = newItemCount;

    //update state with newOptionCounts
    setOptionCounts(newOptionCounts);
  };

  const resetOrder = () => {
    setOptionCounts({
      scoops: {},
      toppings: {},
    });
  };

  //utility function to get totals from optionCounts state value
  const calculateTotal = (optionType) => {
    const countsArray = Object.values(optionCounts[optionType]);

    //total the value in the array of counts for the number of items
    const totalCount = countsArray.reduce((total, value) => total + value, 0);

    //multiply # of items by item cost
    return totalCount * pricePerItem[optionType];
  };

  const totals = {
    scoops: calculateTotal("scoops"),
    toppings: calculateTotal("toppings"),
  };

  const grandTotal = formatCurrency(
    calculateTotal("scoops") + calculateTotal("toppings")
  );

  const value = {
    optionCounts,
    grandTotal,
    totals,
    updateItemCount,
    resetOrder,
  };
  return <OrderDetails.Provider value={value} {...props} />;
}
