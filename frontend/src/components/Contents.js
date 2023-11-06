import './Contents.scss'
import Login from "./Login";
import { Route, Routes } from "react-router-dom";
import Vaults from "./Vaults";
import Portfolio from './Portfolio';

const Contents = ({wallet, onConnect}) => {

    return (
        <div className='content-root'>
            <Routes>
                <Route exact path="/" element={(wallet.connected ? <Vaults/>: <Login wallet={wallet} onConnect={onConnect}/>)} />
                <Route exact path='/login' Component={Login} />
                <Route exact path='/vaults' Component={Vaults} />
                <Route exact path='/portfolio' Component={Portfolio} />
            </Routes>
        </div>
    )
}

export default Contents;