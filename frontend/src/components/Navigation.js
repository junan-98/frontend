import './Navigation.scss';
import logo from '../icons/dov.png';

const categories = [
    {
        name: 'portfolio',
        path: '/portfolio'
    },
    {
        name: 'vaults',
        path: '/vaults'
    }
]
const Navigation = ({wallet, onConnect}) => {
    return (
        <div className='navbar'>
            {/* dov logo */}
            <div className='navbar_logo'>
                <a href='/'>
                    <img src={logo}/>
                </a>
            </div>
            {/* portfolio, options link*/}
            <ul className='navbar_menu'>
                {categories.map(c => (
                    <li key={c.name}>
                        <a href={c.path}>{c.name}</a>
                    </li>
                ))}
            </ul>
            {/* metamask connect*/}
            {wallet.connected ? <div className='metamask_button'>{wallet.address}</div>: <div className='metamask_button' onClick={onConnect}>connect wallet</div>}
        </div>
    );
}

export default Navigation;