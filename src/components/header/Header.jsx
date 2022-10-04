import './Header.css'
import Logo from '../../assets/Logo.png'
import { Link } from 'react-router-dom'

const Header = () => (
    <footer className="header">
        <div>
            <nav>
                <Link>
                    <img className="header__logo" src={Logo} alt='logo' />
                    <h1>HRnet</h1>
                </Link>
            </nav>
        </div>
    </footer>
);


export default Header