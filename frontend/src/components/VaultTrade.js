import PnLChart from './PnLChart';
import './VaultTrade.scss';
const VaultTrade = ({tradeProduct}) => {
    console.log('tradeProduct', tradeProduct)
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
                            <input type='text' placeholder='amount' />
                        </div>
                    </div>
                    <div className='PnL Graph' >
                        <PnLChart optionPrice={parseInt(tradeProduct.optionPrice)} strikePrice={parseInt(tradeProduct.strikePrice)} isPut={true}/>
                    </div>
                    <div className='execute-button'>
                        <b>Purchase</b>
                    </div>
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
                            <input type='text' placeholder='amount' />
                        </div>
                    </div>
                    <div className='execute-button'>
                        <b>Write</b>
                    </div>
                </div>
            </div>
        </>
    )
}

export default VaultTrade;