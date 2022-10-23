import './Header.css'
import Logo from '../../assets/Logo.png'
import { NavLink } from 'react-router-dom'

const Header = () => (
    <footer className='header'>
        <div className='header__container'>
            <nav className='header__nav'>
                <div className='header__nav__left'>
                    <img className='nav__logo' src={Logo} alt='logo' width="128" height="128"/>
                </div>
                <h1 className='nav__title'>HRnet</h1>
                <div className='header__nav__right'>
                    <NavLink to='/home' className={({ isActive }) => 
                            (isActive ? "Link__active" : "Link" )}>Add employees</NavLink>
                    <NavLink to='/employees-list' className={({ isActive }) => 
                            (isActive ? "Link__active" : "Link" )}>Employees list</NavLink>
                </div>
            </nav>
        </div>
    </footer>
);


export default Header