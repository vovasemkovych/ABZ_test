// App header with logo and quick navigation buttons
import React from 'react';
import './Header.scss';
import Button from '../Button/Button';
import Logo from '../../assets/Logo.svg';


const Header = () => (
    <header className="header">
        <div className="header__inner">
            <div className="header__logo">
                  <img src={Logo} alt="Testtask logo" className="header__logo-img" />
                            {/* <span className="header__brand">TESTTASK</span> */}

            </div>
            <nav className="header__nav">
                <Button className="btn--pill" onClick={() => document.getElementById('users')?.scrollIntoView({ behavior: 'smooth' })}>Users</Button>
                <Button className="btn--pill" onClick={() => document.getElementById('signup')?.scrollIntoView({ behavior: 'smooth' })}>Sign up</Button>

            </nav>
        </div>
    </header>
);

export default Header;