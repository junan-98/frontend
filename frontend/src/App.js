import Navigation from "./components/Navigation";
import Contents from "./components/Contents";
import './App.css'
import {useEffect, useState} from "react";
import { conWeb3 } from "./lib/wallet";
import './global.css'; 
// Simplify Wallect conenction
const App = () => {
    // sessionStorage에 wallet정보를 저장해서 새로고침시에도 wallet정보를 유지한다.
    const [wallet, setWallet] = useState(JSON.parse(sessionStorage.getItem('wallet')) || {
        connected: false,
        address: '',
    });

    useEffect(() => {
        if (wallet) {
            sessionStorage.setItem('wallet', JSON.stringify(wallet));
        }
    }, [wallet]);


    const onConnect = async () => {
        await conWeb3(setWallet);
    }

    useEffect(() => {
        sessionStorage.setItem('wallet', JSON.stringify(wallet));
    }, [wallet]);


    return (
        <div className='App'>
            <Navigation wallet={wallet} onConnect={onConnect}/>
            <Contents wallet={wallet} onConnect={onConnect}/>
        </div>
    );
}

export default App;
