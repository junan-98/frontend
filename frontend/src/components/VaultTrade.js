import PnLChart from './PnLChart';
import { useState, useCallback } from 'react';
import './VaultTrade.scss';
import { purchaseOption, depositOption } from '../lib/tradeTransaction';


const VaultTrade = ({tradeProduct}) => {
    console.log('tradeProduct', tradeProduct)

    const [buyValue, setBuyValue] = useState('');
    const [writeValue, setWriteValue] = useState('');
    const [tradingStatus, setTradingStatus] = useState('default');

    const onChangeBuy = useCallback(e => {
        setBuyValue(e.target.value);
    }, []);
    const onChangeWrite = useCallback(e => {
        setWriteValue(e.target.value);
    }, []);

    const buyOption = useCallback(async () =>{
        console.log(`Buy ${buyValue} options`);
        if(!Number(buyValue) || Number(buyValue) < 0) {
            alert("incorrect option amount");
            return;
        }
        await purchaseOption(tradeProduct, buyValue, setTradingStatus);
    }, [buyValue, tradeProduct]);
    const writeOption = useCallback(async () => {
        console.log(`Write ${writeValue} options`);
        if(!Number(writeValue) || Number(writeValue) < 0) {
            alert("incorrect option amount");
            return;
        }
        await depositOption(tradeProduct, writeValue, setTradingStatus);
    }, [writeValue, tradeProduct]);

    return (
        <>
            <div className='vault-trade-root'>
                <div className='trade-buy'>
                    <div id='position-name'>
                        <b>Purchase Option</b>
                    </div>
                    <div id='view-option'>
                        <b>Strike Price: </b>
                        <b>{tradeProduct.strikePrice} $</b>
                    </div>
                    <div id='view-option'>
                        <b>Option Price: </b>
                        <b>{tradeProduct.optionPrice} $</b>
                    </div>
                    <div id='view-option'>
                        <b>Available Amount: </b>
                        <b>{tradeProduct.available}</b>
                    </div>
                    <div id='view-option'>
                        <b>Select Amount: </b>
                        <div id='select amount'>
                            <input type='text' vaule={buyValue} onChange={onChangeBuy} placeholder='amount' />
                        </div>
                    </div>
                    <div className='PnL Graph' >
                        <PnLChart optionPrice={parseInt(tradeProduct.optionPrice)} strikePrice={parseInt(tradeProduct.strikePrice)} isPut={true}/>
                    </div>
                    {
                        tradingStatus === 'default' ? 
                        (<div className='execute-button' onClick={buyOption}>
                            <b>Purchase</b>
                        </div>) :
                        (<div class="loading__container">
                        <div class="loading--cycle"></div>
                      </div>)
                    }
                    
                </div>
                <div className='trade-sell'>
                    <div id='position-name'>
                        <b>Write Option</b>
                    </div>
                    <div id='view-option'>
                        <b>Strike Price: </b>
                        <b>{tradeProduct.strikePrice} $</b>
                    </div>
                    <div id='view-option'>
                        <b>Select Amount: </b>
                        <div id='select amount'>
                            <input type='text' value={writeValue} onChange={onChangeWrite} placeholder='amount' />
                        </div>
                    </div>
                    {
                        tradingStatus === 'default' ? 
                        (<div className='execute-button' onClick={writeOption}>
                            <b>Write</b>
                        </div>) :
                        (<div class="loading__container">
                        <div class="loading--cycle"></div>
                      </div>)
                    }
                </div>
            </div>
        </>
    )
}

export default VaultTrade;