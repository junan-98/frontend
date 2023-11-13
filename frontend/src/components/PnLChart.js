import React from "react";
import {
  LineChart,
  Line,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const PnLChart = ({ isPut, strikePrice, optionPrice }) => {
  const data = [];
  if (isPut) {
    let indexPriceFuture = 0;
    while(indexPriceFuture < strikePrice){
      let profit = strikePrice - indexPriceFuture;
      if (profit < 0) profit = 0;
      const pnl = -optionPrice + profit;
      data.push({ indexPriceFuture, pnl });
      indexPriceFuture += 10;
    }
    indexPriceFuture = strikePrice;
    while(indexPriceFuture < strikePrice * 2){
      let profit = strikePrice - indexPriceFuture;
      if (profit < 0) profit = 0;
      const pnl = -optionPrice + profit;
      data.push({ indexPriceFuture, pnl });
      indexPriceFuture += 10;
    }
  } else{
    let indexPriceFuture = 0;
    while(indexPriceFuture < strikePrice){
      let profit = indexPriceFuture - strikePrice;
      if (profit < 0) profit = 0;
      const pnl = -optionPrice + profit;
      data.push({ indexPriceFuture, pnl });
      indexPriceFuture += 10;
    }
    indexPriceFuture = strikePrice;
    while(indexPriceFuture < strikePrice * 2){
      let profit = indexPriceFuture - strikePrice;
      if (profit < 0) profit = 0;
      const pnl = -optionPrice + profit;
      data.push({ indexPriceFuture, pnl });
      indexPriceFuture += 10;
    }
  }

  return (
    <ResponsiveContainer width={400} height={200}>
      <LineChart data={data} style={{ border: "1px solid #000" }}>
        <Line type="monotone" dataKey="pnl" stroke="#8884d8" dot={false} />
        <Tooltip labelFormatter={(value) => `Index Price: ${value * 10}$`} formatter={(value) => `${value}$`} />
        <Legend />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default PnLChart;
