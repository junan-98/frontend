import BalanceList from "./BalanceList";
import PositionClose from "./PositionClose";
import PositionOpen from "./PositionOpen";
import './Portfolio.scss';
import { useState } from "react";

const Portfolio = () => {
    const [openedPosition, setOpenedPosition] = useState([
        {
            product: 'ETH_WEEKLY_PUT',
            round: 2,
            strike_price: '???????$',
            settlement_price: '?????????$',
            amount: '???',
            order_time: 'YYMMdd',
            expiry: 'YYMMdd',
            position: 'buy'
        },
        {
            product: 'ETH_WEEKLY_PUT',
            round: 2,
            strike_price: '???????$',
            settlement_price: '?????????$',
            amount: '???',
            order_time: 'YYMMdd',
            expiry: 'YYMMdd',
            position: 'buy'
        },
        {
            product: 'ETH_WEEKLY_CALL',
            round: 2,
            strike_price: '???????$',
            settlement_price: '?????????$',
            amount: '???',
            order_time: 'YYMMdd',
            expiry: 'YYMMdd',
            position: 'sell'
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
    ])
    return (
        <div className="Portfolio">
            <div className="portfolio-left">
                <BalanceList />
            </div>
            <div className="potfolio-right">
                <PositionOpen openedPosition={openedPosition} />
                <PositionClose closedPosition={closedPosition}/>
            </div>
        </div>
    );
}

export default Portfolio;