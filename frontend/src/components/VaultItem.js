import './VaultItem.scss';
import eth_logo from '../icons/ethereum-logo.png';
import arb_logo from '../icons/arbitrum.svg';

const VaultItem = ({vault}) => {
    return (
        <div id='vault-item'>
            <div id='vault-name'><b>{vault.name}</b></div>
            <div className='vault-info'>
                <div id='vault-baseAsset'>
                    {vault.baseAsset==='ETH' ? <img src={eth_logo} alt='ETH' /> : <img src={arb_logo} alt='ARB' /> }
                </div>
                <div id='vault-tvl'>{vault.tvl}</div>
                <div id='vault-expiry'>{vault.expiry}</div>
            </div>
        </div>
    )
}

export default VaultItem;