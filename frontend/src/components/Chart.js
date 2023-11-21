import "./Chart.scss";
import React, { useEffect, useState } from "react";
import TradeViewChart from "react-crypto-chart";


const Chart = ({ chosenVault }) => {
    let baseAsset = chosenVault !== null ? chosenVault.baseAsset : 'ETHUSDT';
  return (
    <div className="chart-root">
      <div className="chart-name">
        <b>{baseAsset}</b>
      </div>
      <div className="chart-main" id="chart-main">
      <TradeViewChart
          style={{ background: "gray", maxWidth: "100%", maxHeight: "100%" }}
          interval="5m"
          containerStyle={{
            minHeight: "500px",
            minWidth: "900px",
          }}
          chartLayout={{
            layout: {
              backgroundColor: "white",
              textColor: "black",
            },
            timeScale: {
                borderColor: "#485c7b",
                timeVisible: true,
                secondsVisible: false
              }
          }}
          
          pair='ETHUSDT'
        />
      </div>
    </div>
  );
};

export default Chart;
