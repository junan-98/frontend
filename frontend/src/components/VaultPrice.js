import './VaultPrice.scss'
const VaultPrice = ({vaultPriceInfo}) => {
    return (
        <div className='prices-root'>
            <table>
                <thead>
                    <tr>
                        <th>Strike Price</th>
                        <th>Available Amount</th>
                        <th>OptionPrice</th>
                    </tr>
                </thead>
                <tbody>
                {vaultPriceInfo.map((info) => {
                    return (
                        <tr>
                            <td>{info.strikePrice}</td>
                            <td>{info.available}</td>
                            <td>{info.optionPrice}</td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    );
}

export default VaultPrice;