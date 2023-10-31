import Navigation from "./components/Navigation";
import Contents from "./components/Contents";
import './App.css'
import {useEffect, useState} from "react";
import {ethers} from "ethers";

const App = () => {

    // sessionStorage에 wallet정보를 저장해서 새로고침시에도 wallet정보를 유지한다.
    const [wallet, setWallet] = useState(JSON.parse(sessionStorage.getItem('wallet')) || {
        connected: false,
        address: '',
        chainId: '',
        ETHBalance: '',
        USDCBalance: ''
    });
    const [provider, setProvider] = useState(undefined);

    const [signer, setSigner] = useState(undefined);

    useEffect(() => {
        if (wallet) {
            sessionStorage.setItem('wallet', JSON.stringify(wallet));
        }
    }, [wallet]);

    // Provider는 RPC표준을 편리하게 사용할 수 있도록 해주는 인터페이스
    const getProvider = async () => {
        const provider = await new ethers.providers.Web3Provider(window.ethereum);
        setProvider(provider);
        return provider;
    }

    // 메타마스크에 연동 승인 요청
    const getSigner = async provider => {
        await provider.send("eth_requestAccounts", []);
        // 메타마스크에 서명 요청
        const signer = provider.getSigner();
        // 서명 저장
        setSigner(signer);
        return signer;
    }

    const getWalletData = async (signer) => {
        const result = await Promise.all([
            signer.getAddress(),
            signer.getBalance(),
            signer.getChainId()
        ]);
        console.log(result);
        setWallet({
            ...wallet,
            connected: true,
            address: result[0],
            ETHBalance: result[1],
            chainId: result[2]
        });
        console.log(wallet);
    }

    const connectWallet = async () => {
        try{
            if (typeof window.ethereum !== 'undefined'){
                const _provider = await getProvider();
                const _signer = await getSigner(_provider);
                await getWalletData(_signer);
            } else {
                alert('please install metamask wallet');
            }
        } catch (e) {
            console.error(e);
            alert('wallet connect error');
        }
    }

    const onConnect = async () => {
        console.log('try wallet connect', wallet);
        await connectWallet();
        console.log('end wallet connect', wallet);
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
