import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Assuming you have a CSS file for styling

import { accountContext } from '../contexts/userContext';

const Header = () => {
    const account = useContext(accountContext);

    useEffect(() =>{}, [account])

    return (
        <div className="header">
            <Link to="/home">
                <img className="eth-logo" src="logo.jpg" alt="Background" />
            </Link>
            <div id="account-container">
                {/* Display account name and reputation */}
                {!account.account ? <div id="loading-spinner"/> :
                    <div id="account-container-small">
                        <span id="account-name">
                            {account.account.name}
                        </span>
                        <span id="account-reputation">
                            <img className="reputation-icon" src="reputation.svg" alt="Reputation" />
                            <span id="account-karma">{account.account.karma}</span>
                        </span>
                        <div id="account-logout">
                            <img className="logout-icon" src="logout_icon.svg" alt="Logout" />
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

export default Header;