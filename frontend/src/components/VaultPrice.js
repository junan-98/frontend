import './VaultPrice.scss'
import { useState, useEffect } from 'react';
import axios from 'axios';


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
        const fetchData = async () => {                
            setLoading(true);
            try {
                const response = await axios.get(
                    `http://localhost:8080/api/strikes/byOptionId?optionId=${chosenVault.optionId}`,
                );
                const data = response.data;
                console.log('VaultPrice api', data);
                const strikeInfo = data.map(item => {
                    console.log('item', item);
                    return {
                        strikePrice: item.strikePrice,
                        optionPrice: item.optionPrice,
                        available: item.availableAmount,
                        strikeId: item.strikeId,
                        address: item.option.optionAddress
                    };
                });
                setVaultInfo(strikeInfo);
            } catch(e) {
                console.log(e)
            };
            setLoading(false);
        };
        if(chosenVault != null)
            fetchData();
    }, [chosenVault]);
    if(loading) {
        return <div>loading ...</div>
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