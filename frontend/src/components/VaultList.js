import VaultItem from "./VaultItem";
import React, {useState} from "react";
import './VaultList.scss';
const VaultList = ({setBaseAsset, setVaultPriceInfo, setChosenVault}) => {
    const [vaults, setVaults] = useState([
        {
            name: 'Weekly PUT ETH',
            baseAsset: 'ETH',
            tvl: '999999$',
            expiry: 'YY.MM.dd'
        },
        {
            name: 'Weekly CALL ETH',
            baseAsset: 'ETH',
            tvl: '999999$',
            expiry: 'YY.MM.dd'
        },
        {
            name: 'Weekly PUT ARB',
            baseAsset: 'ARB',
            tvl: '999999$',
            expiry: 'YY.MM.dd'
        },
        {
            name: 'Monthly PUT ARB',
            baseAsset: 'ARB',
            tvl: '999999$',
            expiry: 'YY.MM.dd'
        },
    ]);
    return (
        <div className='vault-list-root'>
            {vaults.map((vault) => {
                return <VaultItem vault={vault} key={vault.name} />
            })}
        </div>
    );
}
export default VaultList;