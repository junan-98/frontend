import VaultPrice from "./VaultPrice";
import './Vaults.scss'
import { useState } from "react";
import ChartArb from "./ChartARB";
import ChartETH from "./ChartETH";
import VaultProducts from "./VaultProducts";
import VaultTrade from "./VaultTrade";


const Vaults = () => {
    const [chosenVault, setChosenVault] = useState(null);
    const [tradePhase, setTradePhase] = useState(false);
    const [tradeProduct, setTradeProduct] = useState(null);
    return (
        <>
            <div className='vault-cover'>
                <div className='vault-left'>
                    {(chosenVault !== null && chosenVault.baseAsset === 'ARBUSDT')? <ChartArb /> : <ChartETH />}
                    <VaultPrice chosenVault={chosenVault} setTradePhase={setTradePhase} setTradeProduct={setTradeProduct}/>
                </div>
                <div className='vault-right'>
                    {
                        tradePhase ? <VaultTrade tradeProduct={tradeProduct} /> : <VaultProducts setChosenVault={setChosenVault} />
                    }
                </div>
            </div>
        </>
    )
}

export default Vaults;