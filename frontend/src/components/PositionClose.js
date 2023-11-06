import './Position.scss';

///ETH_WEEKLY_PUT / ROUND / STRIKE_PRICE / SETTLEMENT_PRICE / AMOUNT / PnL /
const PositionClose = ({closedPosition}) => {
    return (
        <>
        <div className='position-mark'>
            Hisotrical Position
        </div>
        <div className='position'>
        <table style={{ borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Round</th>
                        <th>Strike Price</th>
                        <th>Settlement Price</th>
                        <th>Amount</th>
                        <th>PnL</th>
                    </tr>
                </thead>
                <tbody>
                {closedPosition.map((position, index) => {
                    return (
                        <tr style={{ backgroundColor: index % 2 === 0 ? '#ffffff' : '#f1f3f5' }} key={index}>
                            <td>{position.product}</td>
                            <td>{position.round}</td>
                            <td>{position.strike_price}</td>
                            <td>{position.settlement_price}</td>
                            <td>{position.amount}</td>
                            <td>{position.pnl}</td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
        </>
    );
}

export default PositionClose;