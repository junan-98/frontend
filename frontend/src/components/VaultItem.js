import './VaultItem.scss';
import eth_logo from '../icons/ethereum-logo.png';
import arb_logo from '../icons/arbitrum.svg';
import { useNavigate } from 'react-router-dom';

const VaultItem = ({vault, setChosenVault}) => {
    const navigate = useNavigate();
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
        //navigate(`/vault/${vault.optionId}`);
    }
    return (
        <div id='vault-item' onClick={() => vaultClick(vault)}>
            <div id='vault-name'><b>{vault.symbol}</b></div>
            <div className='vault-info'>
                <div id='vault-baseAsset'>
                    {vault.baseAsset==='ETH' ? <img src={eth_logo} alt='ETH' /> : <img src={arb_logo} alt='ARB' /> }
                </div>
                <div id='vault-tvl'><b>{vault.tvl}</b></div>
                <div id='vault-expiry'><b>{vault.expiry}</b></div>
            </div>
        </div>
    )
}

export default VaultItem;