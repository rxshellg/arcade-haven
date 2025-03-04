import React, { useEffect, useState } from "react";
import { FaLock } from 'react-icons/fa';
import { Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/icon.png"
import './NavBar.css'
import '../styles/global.css'

const NavBar = () => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAuthStatus = async () => {
            try {
                const response = await fetch('/auth/session');
                const data = await response.json();
                setIsAuthenticated(data.isAuthenticated);
                setUser(data.user);
            } catch (error) {
                console.error('Error fetching authentication status:', error);
            }
        };
        fetchAuthStatus();
    }, []);

    const handleLogout = async () => {
        try {
            await fetch('/auth/logout');
            setIsAuthenticated(false);
            setUser(null);
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    const handleLoginClick = () => {
        navigate('/auth/google');
        window.location.reload();
    };

    return (
        <>
            <div className="header">
                <div className="logo">
                    <img src={Logo} alt="Arcade Haven's logo, an arcade machine" />
                </div>
                <div className="links">
                    <Link to="/" id="header-element"> Home page </Link>
                    <Link to="/play-now" id="header-element"> Play now </Link>
                    <Link to="/contact" id="header-element"> Contact </Link>
                    {isAuthenticated ? (
                        <Dropdown>
                            <Dropdown.Toggle variant="secondary" id="dropdown-basic" className="user-dropdown">
                                {user.displayName}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item as={Link} to="/profile">My Profile</Dropdown.Item>
                                <Dropdown.Item onClick={handleLogout}>Log Out</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    ) : (
                        <button onClick={handleLoginClick} className="btn btn-primary btn-sm" id="header-element">
                            <FaLock /> Login
                        </button>
                    )}
                </div>
            </div>
        </>
    )
}

export default NavBar;