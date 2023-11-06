import VaultList from "./VaultList";
import Chart from "./Chart";
import VaultPrice from "./VaultPrice";
import './Vaults.scss'
import {useState} from "react";

const Vaults = () => {
    // ETHUSDT OR ARBUSDT
    const [baseAsset, setBaseAsset] = useState('ETHUSDT');

    //const initialVaultPriceInfo = [];
    const initialVaultPriceInfo = [
        {
            strikePrice: '???$',
            optionPrice: '???$',
            available: '???'
        },
        {
            strikePrice: '???$',
            optionPrice: '???$',
            available: '???'
        },
        {
            strikePrice: '???$',
            optionPrice: '???$',
            available: '???'
        },
        {
            strikePrice: '???$',
            optionPrice: '???$',
            available: '???'
        },
    ];
    const [chosenVault, setChosenVault] = useState({
        address: '0x??',
        name: '',
        round: '?',
        tvl: '',
        expiry: 'YYMMdd'
    })
    const [vaultPriceInfo, setVaultPriceInfo] = useState(initialVaultPriceInfo);
    return (
        <>
            <div className='vault-cover'>
                <div className='vault-left'>
                    <Chart baseAsset={baseAsset}/>
                    <VaultPrice vaultPriceInfo={vaultPriceInfo}/>
                </div>
                <div className='vault-right'>
                    <div className='vault-name'>
                        <b>Vaults</b>
                    </div>
                    <div className='vault-index-parent'>
                        <div id='vault-index'>BaseAsset</div>
                        <div id='vault-index'>TVL</div>
                        <div id='vault-index'>Expiry</div>
                    </div>
                    <VaultList setBaseAsset={setBaseAsset} setVaultPriceInfo={setVaultPriceInfo} setChosenVault={setChosenVault}/>
                </div>
            </div>
        </>
    )
}

export default Vaults;