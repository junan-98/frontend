import "./Chart.scss";
import React, { useEffect, useState } from "react";
import TradeViewChart from "react-crypto-chart";


const ChartArb = () => {
  return (
    <div className="chart-root">
      <div className="chart-name">
        <b>ARBUSDT</b>
      </div>
      <div className="chart-main" id="chart-main">
      <TradeViewChart
          style={{ background: "white", maxWidth: "100%", maxHeight: "100%" }}
          interval="5m"
          containerStyle={{
            width: "900px",
            height: "500px",
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
          
          pair='ARBUSDT'
        />
      </div>
    </div>
  );
};

export default React.memo(ChartArb);
