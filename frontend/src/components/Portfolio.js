import BalanceList from "./BalanceList";
import PositionClose from "./PositionClose";
import PositionOpen from "./PositionOpen";
import './Portfolio.scss';
import { useState, useEffect } from "react";
import { getPortfolioBalance } from "../lib/tokenTransaction";
const Portfolio = ({wallet}) => {
    console.log('Portfolio Wallet', wallet);
    const [openedPosition, setOpenedPosition] = useState([
        {
            product: 'ETH_WEEKLY_PUT',
            round: 2,
            strike_price: '???????$',
            settlement_price: '?????????$',
            amount: '???',
            order_time: 'YYMMdd',
            expiry: 'YYMMdd',
            position: 'buy',
            contractAddrss: '0x?????'
        },
        {
            product: 'ETH_WEEKLY_PUT',
            round: 2,
            strike_price: '???????$',
            settlement_price: '?????????$',
            amount: '???',
            order_time: 'YYMMdd',
            expiry: 'YYMMdd',
            position: 'buy',
            contractAddrss: '0x?????'
        },
        {
            product: 'ETH_WEEKLY_CALL',
            round: 2,
            strike_price: '???????$',
            settlement_price: '?????????$',
            amount: '???',
            order_time: 'YYMMdd',
            expiry: 'YYMMdd',
            position: 'sell',
            contractAddrss: '0x?????'

        }
    ]);

    const [closedPosition, setClosedPosition] = useState([
        {
            product: 'ETH_WEEKLY_PUT',
            round: 1,
            strike_price: '???????$',
            settlement_price: '?????????$',
            amount: '???',
            pnl: '+???$'
        },
        {
            product: 'ETH_WEEKLY_CALL',
            round: 1,
            strike_price: '???????$',
            settlement_price: '?????????$',
            amount: '???',
            pnl: '-????$'
        },
    ]);
    const [balances, setBalances] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const b = await getPortfolioBalance(wallet.address);
                setBalances(b);
            } catch(e) {
                console.log(e)
            };
            setLoading(false);
        };
        fetchData();
    }, [wallet]);
    if(loading) {
        return (<div class="loading__container">
        <div class="loading--cycle"></div>
      </div>)
    }
    return (
        <div className="Portfolio">
            <div className="portfolio-left">
                <BalanceList balances={balances}/>
            </div>
            <div className="potfolio-right">
                <PositionOpen openedPosition={openedPosition} />
                <PositionClose closedPosition={closedPosition}/>
            </div>
        </div>
    );
}

export default Portfolio;