import { settle, withdraw } from '../lib/tradeTransaction';
import { useState, useCallback, useEffect } from 'react';
import './Position.scss';

const PositionOpen = ({openedPosition}) => {
    function sleep() {
        return new Promise(resolve => setTimeout(resolve, 10 * 1000));
      } 
    const [tradingStatus, setTradingStatus] = useState('default');

    const [loadingText, setLoadingText] = useState('Waiting Tx');

    useEffect(() => {
      const interval = setInterval(() => {
        setLoadingText(prev => {
          if (prev.endsWith('...')) {
            return 'Waiting Tx';
          }
          return prev + '.';
        });
      }, 1000);
  
      // 컴포넌트 언마운트 시 인터벌 클리어
      return () => clearInterval(interval);
    }, []);

    const settleOption = useCallback(async (position) => {
        setTradingStatus('trading');
        await sleep()
        console.log('settle:', position);
        if(position.settled === false) {
            alert(`This Product didn't expired!\nexpiry:${position.expiry}`);
            //return;
        }
        await settle(position);
        setTradingStatus('default');
    },[]);

    const withdrawOption = useCallback(async (position) => {
        setTradingStatus('trading');
        await sleep();
        console.log('withdraw:', position);
        if(position.settled === false) {
            alert(`This Product didn't expired!\nexpiry:${position.expiry}`);
            //return;
        }

        await withdraw(position);
        setTradingStatus('default');
    }, []);

    return (
        <>
        <div className='position-mark'>
            Opened Position
        </div>
        <div className='position'>
            <table style={{ borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th>Index</th>
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
                        <tr style={{ backgroundColor: index % 2 === 0 ? '#f2f2f2' : '#e6e6e6' }} key={index}>
                            <td>{index}</td>
                            <td>{position.product}</td>
                            <td>{position.round}</td>
                            <td>{position.strike_price}</td>
                            <td>{position.settlement_price}</td>
                            <td>{position.amount}</td>
                            <td>{position.order_time}</td>
                            <td>{position.expiry}</td>
                            <td>
                                {position.position !== 'write' ? 
                                    (tradingStatus !== 'trading' ? 
                                        <div className='positionExitButton' id='settlement' onClick={() => {settleOption(position)}}><b>settle</b></div> :
                                        <div className='positionExitButton' id='settlement' onClick={() => {settleOption(position)}}><b>{loadingText}</b></div>
                                    ): (tradingStatus !== 'trading' ?
                                        <div className='positionExitButton' id='withdraw' onClick={() => {withdrawOption(position)}}><b>withdraw</b></div> :
                                        <div className='positionExitButton' id='withdraw' onClick={() => {withdrawOption(position)}}><b>{loadingText}</b></div>
                                    )
                                }
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