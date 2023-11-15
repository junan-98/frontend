import VaultItem from "./VaultItem";
import React, {useState, useEffect} from "react";
import './VaultList.scss';
import { fetchVaultList } from "../lib/api";

const VaultList = ({setChosenVault}) => {
    const [vaults, setVaults] = useState(null);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        fetchVaultList(setLoading, setVaults);
    }, []);

    
    if(loading) {
        return <div>loading ...</div>
    }
    if(!vaults) {
        return <div>500</div>
    }
    return (
        <div className='vault-list-root'>
            {vaults.map((vault, index) => {
                return <VaultItem vault={vault} key={index} setChosenVault={setChosenVault} />
            })}
        </div>
    );
}
export default VaultList;