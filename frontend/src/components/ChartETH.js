import "./Chart.scss";
import React from "react";
import TradeViewChart from "react-crypto-chart";

const ChartETH = () => {
  return (
    <div className="chart-root">
      <div className="chart-name">
        <b>ETHUSDT</b>
      </div>
      <div className="chart-main" id="chart-main">
        <TradeViewChart
          style={{ background: "white", maxWidth: "100%", maxHeight: "100%" }}
          interval="5m"
          containerStyle={{
            width: "900px",
            height: "500px",
            background: 'linear-gradient(145deg, #e6e6e6, #ffffff)',
            borderRadius: '8px', 
            boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)'
          }}
          chartLayout={{
            layout: {
              backgroundColor: "#e6e6e6", 
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

export default React.memo(ChartETH);
