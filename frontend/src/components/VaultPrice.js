import './VaultPrice.scss'
import { useState, useEffect } from 'react';
import { fetchVaultInfo } from '../lib/api';

const VaultPrice = ({chosenVault, setTradePhase, setTradeProduct}) => {
    const [vaultInfo, setVaultInfo] = useState(null);
    const [loading, setLoading] = useState(false);

    const doTrade = (info) => {
        setTradePhase(true);
        setTradeProduct(
            {
                ...info
            }
        );
    }

    useEffect(() => {
        if(chosenVault != null)
            fetchVaultInfo(setLoading, setVaultInfo, chosenVault.optionId);
    }, [chosenVault]);
    if(loading) {
        return(<div class="loading__container">
        <div class="loading--cycle"></div>
      </div>);
    }
    if(!vaultInfo) {
        return <div className='no-vault-selected'><b>SELECT VAULT</b></div>
    }
    return (
        <div className='prices-root'>
            <table>
                <thead>
                    <tr>
                        <th>Strike Price</th>
                        <th>Available Amount</th>
                        <th>OptionPrice</th>
                        <th>Trade</th>
                    </tr>
                </thead>
                <tbody>
                {vaultInfo.map((info, index) => {
                    console.log('info', info)
                    return (
                        <tr key={index}>
                            <td>{info.strikePrice}</td>
                            <td>{info.available}</td>
                            <td>{info.optionPrice}</td>
                            <td><div className='trade-button' onClick={() => doTrade(info)}>Buy / Sell</div></td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    );
}

export default VaultPrice;