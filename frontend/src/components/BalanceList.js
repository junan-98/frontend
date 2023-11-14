import { useState } from "react";
import BalanceItem from "./BalanceItem";
import './BalanceList.scss';


const BalanceList = ({balances}) => {

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