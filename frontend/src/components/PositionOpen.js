import './Position.scss';

//ETH_WEEKLY_PUT / ROUND / STRIKE_PRICE / SETTLEMENT_PRICE / AMOUNT / ORDER_TIME / withdraw(settlement)
const PositionOpen = ({openedPosition}) => {
    const settleOption = (position) => {
        console.log(position);
    }

    const withdrawOption = (position) => {
        console.log(position);
    }

    return (
        <>
        <div className='position-mark'>
            Opened Position
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
                        <th>Order Time</th>
                        <th>expiry</th>
                        <th>Settle</th>
                    </tr>
                </thead>
                <tbody>
                {openedPosition.map((position, index) => {
                    console.log(position);
                    return (
                        <tr style={{ backgroundColor: index % 2 === 0 ? '#ffffff' : '#f1f3f5' }} key={index}>
                            <td>{position.product}</td>
                            <td>{position.round}</td>
                            <td>{position.strike_price}</td>
                            <td>{position.settlement_price}</td>
                            <td>{position.amount}</td>
                            <td>{position.order_time}</td>
                            <td>{position.expiry}</td>
                            <td>
                                {position.position !== 'write' ? 
                                    <div className='positionExitButton' id='settlement' onClick={() => {settleOption(position)}}>settle</div> :
                                        <div className='positionExitButton' id='withdraw' onClick={() => {withdrawOption(position)}}>withdraw</div>}
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
        </>
    );
}

export default PositionOpen;