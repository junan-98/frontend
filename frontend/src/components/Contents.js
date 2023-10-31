import './Contents.scss'
import Login from "./Login";
import { Route, Routes } from "react-router-dom";

const Contents = ({wallet, onConnect}) => {

    return (
        <div className='content-root'>
            <Routes>
                <Route exact path="/" element={(wallet.connected ? null: <Login wallet={wallet} onConnect={onConnect}/>)} />
                <Route exact path='/login' Component={Login} />
                <Route exact path='/options' element={null} />
                <Route exact path='/portfolio' element={null} />
            </Routes>
        </div>
    )
}

export default Contents;