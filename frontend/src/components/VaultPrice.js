import './VaultPrice.scss'
import { useState, useEffect } from 'react';
import { fetchVaultInfo } from '../lib/api';
import { getAvailable } from '../lib/tradeTransaction';

const VaultPrice = ({chosenVault, setTradePhase, setTradeProduct}) => {
    const [vaultInfo, setVaultInfo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [availables, setAvailables] = useState([]);

    const doTrade = (info, available) => {
        setTradePhase(true);
        setTradeProduct(
            {
                ...info,
                available: available
            }
        );
    }

    useEffect(() => {
        if(chosenVault != null) {
            fetchVaultInfo(setLoading, setVaultInfo, chosenVault.optionId);
        }
    }, [chosenVault]);

    useEffect(() => {
        if(vaultInfo != null && chosenVault != null) {

            getAvailable(vaultInfo, chosenVault.round, setAvailables);
        }
    }, [vaultInfo, chosenVault]);
    if(loading) {
        return(<div class="loading__container">
        <div class="loading--cycle"></div>
      </div>);
    }
    if(!vaultInfo) {
        return <div className='no-vault-selected'><b>SELECT VAULT</b></div>
    }
    console.log("vaultInfo", vaultInfo);
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
                            <td>{info.strikePrice} $</td>
                            <td>{availables[index]} </td>
                            <td>{info.optionPrice} $</td>
                            <td><div className='trade-button' onClick={() => doTrade(info, availables[index])}><b>Trade</b></div></td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    );
}

export default VaultPrice;