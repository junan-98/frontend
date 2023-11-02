import './Chart.scss';
import React, {useEffect, useState} from 'react';
import TradeViewChart from 'react-crypto-chart';

const Chart = ({baseAsset}) => {
    return (
        <div className='chart-root'>
            <div className='chart-name'>
                <b>{baseAsset}</b>
            </div>
            <div className='chart-main' id='chart-main'>
                <TradeViewChart style={{background: 'white', maxWidth: '100%', maxHeight: '100%'}}
                                interval="5m"
                                containerStyle={{
                                    minHeight: "500px",
                                    minWidth: "900px"
                                }}
                                chartLayout={
                                    {
                                    layout: {
                                        backgroundColor: "white",
                                        textColor: "black"
                                    }}
                                }
                                pair={baseAsset} />
            </div>
        </div>
    );
}

export default Chart;