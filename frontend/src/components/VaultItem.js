import './VaultItem.scss';
import eth_logo from '../icons/ethereum-logo.png';
import arb_logo from '../icons/arbitrum.svg';
import { getUSDCBalance } from '../lib/tokenTransaction';
import { useState, useEffect } from "react";
import { ethers } from "ethers";

const VaultItem = ({vault, setChosenVault}) => {
    const [tvl, setTvl] = useState('');

    useEffect(() => {
        // getUSDCBalance 함수를 호출하여 tvl 값을 가져온다
        getUSDCBalance(vault.optionAddress).then(balance => {
            setTvl(ethers.utils.formatUnits(balance.toString(), 6)); // 결과로 tvl 상태 업데이트
        });
    }, [vault.optionAddress]); // vault.address가 변경될 때마다 이 useEffect가 실행된다

    const vaultClick = (vault) => {
        setChosenVault({
            address: vault.optionAddress,
            symbol: vault.symbol,
            round: vault.round,
            tvl: vault.tvl,
            expiry: vault.expiry,
            baseAsset: vault.baseAsset + 'USDT',
            optionId: vault.optionId
        });
    }

    return (
        <div id='vault-item' onClick={() => vaultClick(vault)}>
            <div id='vault-name'><b>{vault.symbol}</b></div>
            <div className='vault-info'>
                <div id='vault-baseAsset'>
                    {vault.baseAsset==='ETH' ? <img src={eth_logo} alt='ETH' /> : <img src={arb_logo} alt='ARB' /> }
                </div>
                <div id='vault-tvl'><b>{tvl} $</b></div>
                <div id='vault-expiry'><b>{vault.expiry}</b></div>
            </div>
        </div>
    )
}

export default VaultItem;