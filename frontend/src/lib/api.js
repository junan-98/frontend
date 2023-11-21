import axios from 'axios';

export async function fetchVaultList(setLoading, setVaults) {
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
}

export async function fetchVaultInfo(setLoading, setVaultInfo, optionId) {
    setLoading(true);
    try {
        const response = await axios.get(
            `http://localhost:8080/api/strikes/byOptionId?optionId=${optionId}`,
        );
        const data = response.data;
        console.log('VaultPrice api', data);
        const strikeInfo = data.map(item => {
            console.log('item', item);
            return {
                strikePrice: item.strikePrice,
                optionPrice: item.optionPrice,
                available: item.availableAmount,
                strikeIndex: item.strikeIndex,
                address: item.option.optionAddress,
                optionId: item.option.optionId
            };
        });
        setVaultInfo(strikeInfo);
    } catch(e) {
        console.log(e)
    };
    setLoading(false);
}
/**
 * | order_id | amount | client_address | order_time | pnl  | position | settlement_price | strike_price | symbol | option_id |
 */
export async function updateOrders(clientAddress, position, amount, tradeProduct) {
    const data = {
        clientAddress: clientAddress,
        optionId: tradeProduct.optionId,
        strikePrice: tradeProduct.strikePrice,
        amount: amount,
        position: position
    };
    console.log('update orders', data);
    try {
        axios.post('http://localhost:8080/api/orders/sendPosition', data);
    } catch(e) {
        console.log(e)
    };
}

function formatDate(dateString) {
    const options = { year: '2-digit', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false };
    return new Date(dateString).toLocaleString('de-DE', options).replace(",", "");
}


export async function getOpenedPosition(setOpenedPosition) {
    try {
        const response = await axios.get(
            `http://localhost:8080/api/orders/openedPosition`,
        );
        const data = response.data;
        const position = data.map(item => {
            console.log('position', item);
            return {
                product: item.symbol,
                round: item.option.round,
                strike_price: item.strikePrice,
                settlement_price: item.settlementPrice,
                amount: item.amount,
                order_time: formatDate(item.orderTime),
                expiry: formatDate(item.option.expiry),
                position: item.position,
                option: item.option
            };
        });
        console.log('opened position:', position)
        setOpenedPosition(position);
    } catch(e) {
        console.log(e)
    };

}

export async function getClosedPosition(setClosedPosition) {
    try {
        const response = await axios.get(
            `http://localhost:8080/api/orders/historicalPosition`,
        );
        const data = response.data;
        const position = data.map(item => {
            console.log('position', item);
            return {
                product: item.symbol,
                round: item.option.round,
                strike_price: item.strikePrice,
                settlement_price: item.settlementPrice,
                amount: item.amount,
                order_time: formatDate(item.orderTime),
                expiry: formatDate(item.option.expiry),
                position: item.position,
                option: item.option
            };
        });
        console.log('closed position:', position)
        
        setClosedPosition(position);
    } catch(e) {
        console.log(e)
    };
}
