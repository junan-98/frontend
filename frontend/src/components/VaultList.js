import VaultItem from "./VaultItem";
import React, {useState, useEffect} from "react";
import './VaultList.scss';
import axios from 'axios';

const VaultList = ({setChosenVault}) => {
    const [vaults, setVaults] = useState(null);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    'http://localhost:8080/api/options/get_option_info',
                );
                const data = response.data;
                const formattedData = data.map(item =>  {
                    const dateObject = new Date(item.expiry);
                    const formattedDate = `${dateObject.getFullYear().toString().substr(-2)}.${(dateObject.getMonth() + 1)}.${dateObject.getDate()}`;
                    return { ...item, expiry: formattedDate };
                  });
                console.log(formattedData);
                setVaults(formattedData);
            } catch(e) {
                console.log(e)
            };
            setLoading(false);
        };
        fetchData();
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