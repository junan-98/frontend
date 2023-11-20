import React from "react";
import {
  LineChart,
  Line,
  Tooltip,
  Legend,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import './PnLChart.scss';
const PnLChart = ({ isPut, strikePrice, optionPrice, amount }) => {
  if(amount <= 0 || amount === undefined) {
    amount = 1;
  }
  let decimals = 1;

  while(strikePrice < 1000) {
    strikePrice *= 10;
    optionPrice *= 10;
    decimals *= 10;
  }
  

  const data = [];
  if(isPut) {
    let maxPriceFuture = strikePrice * 1.5;
    let indexPriceFuture = strikePrice * 0.5;
    while (indexPriceFuture < maxPriceFuture) {
      let profit = strikePrice - indexPriceFuture;
      if (profit < 0) profit = 0;
      const pnl = ((-optionPrice + profit) * amount / decimals).toFixed(6).replace(/(?:\.0+|(\.\d+?)0+)$/, "$1");
      data.push({ "indexPriceFuture": indexPriceFuture, "pnl": pnl/10 });
      indexPriceFuture += 10;
    }
  }
  console.log(data);
  // if (isPut) {
  //   let indexPriceFuture = 500;
  //   while(indexPriceFuture < strikePrice){
  //     let profit = strikePrice - indexPriceFuture;
  //     if (profit < 0) profit = 0;
  //     const pnl = ((-optionPrice + profit) * amount / decimals).toFixed(6).replace(/(?:\.0+|(\.\d+?)0+)$/, "$1");
  //     data.push({ indexPriceFuture, pnl });
  //     indexPriceFuture += 10;
  //   }
  //   indexPriceFuture = strikePrice;
  //   while(indexPriceFuture < strikePrice * 2){
  //     let profit = strikePrice - indexPriceFuture;
  //     if (profit < 0) profit = 0;
  //     const pnl = ((-optionPrice + profit) * amount / decimals).toFixed(6).replace(/(?:\.0+|(\.\d+?)0+)$/, "$1");
  //     data.push({ indexPriceFuture, pnl });
  //     indexPriceFuture += 10;
  //   }
  // } else{
  //   let indexPriceFuture = 0;
  //   while(indexPriceFuture < strikePrice){
  //     let profit = indexPriceFuture - strikePrice;
  //     if (profit < 0) profit = 0;
  //     const pnl = ((-optionPrice + profit) * amount / decimals).toFixed(6).replace(/(?:\.0+|(\.\d+?)0+)$/, "$1");
  //     data.push({ indexPriceFuture, pnl });
  //     indexPriceFuture += 10;
  //   }
  //   indexPriceFuture = strikePrice;
  //   while(indexPriceFuture < strikePrice * 1.5){
  //     let profit = indexPriceFuture - strikePrice;
  //     if (profit < 0) profit = 0;
  //     const pnl = ((-optionPrice + profit) * amount / decimals).toFixed(6).replace(/(?:\.0+|(\.\d+?)0+)$/, "$1");
  //     data.push({ indexPriceFuture, pnl });
  //     indexPriceFuture += 10;
  //   }
  // }

  return (
    <div className="chart-container">  
      <ResponsiveContainer width="100%" height="100%" >
        <LineChart data={data}>
          <Line type="monotone" dataKey="pnl" stroke="#8884d8" dot={false}  />
          
          <Tooltip 
            formatter={(value, name, props) => [`${value*10}`, name === 'pnl' ? 'PnL' : '']}
            labelFormatter={(index) => `Index Price: ${data[index].indexPriceFuture / decimals}`}
          />
          <Legend />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PnLChart;
