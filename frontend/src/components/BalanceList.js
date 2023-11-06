import { useState } from "react";
import BalanceItem from "./BalanceItem";
import './BalanceList.scss';


const BalanceList = () => {
    const [balances, setBalances] = useState([
        {
            asset: 'ETH',
            balance: '0'
        },
        {
            asset: 'USDC',
            balance: '0'
        },
    ]);
    return (
        <div className="balance-list">
            <div className="balance-mark">
                Balances
            </div>
            {balances.map((balance) => 
                <BalanceItem balance={balance} key={balance.asset} />
            )}
        </div>
    )

}

export default BalanceList;