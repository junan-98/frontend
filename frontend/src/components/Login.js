import './Login.scss';
import logo from '../icons/dov.svg';
import metamask_logo from '../icons/metamask.svg'

import {ethers} from 'ethers';
const Login = ({wallet, onConnect}) => {
    return (
        <div className='login-root'>
            <div className='login-name'>
                <b>DeFi Option Vault</b>
            </div>
            <div className='login-main'>
                <div className='login-icon'>
                    <img className='login-img' src={logo} alt='dov_logo'/>
                    <div className='login-phrase'>
                        Login
                    </div>
                </div>
                <div className='login-button' onClick={onConnect}>
                    <img src={metamask_logo} id='metamask-img'/>
                    <div id='metamask-font'>
                        <b>MetaMask</b>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;