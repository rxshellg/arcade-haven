import { Link } from "react-router-dom";
import Logo from "../assets/icon.png"
import './NavBar.css'
import '../styles/global.css'

const NavBar = () => {
    return (
        <>
            <div className="header">
                <div className="logo">
                    <img src={Logo} alt="Arcade Haven's logo, an arcade machine" />
                </div>
                <div className="links">
                    <Link to="/" id="header-element"> Home page </Link>
                    <Link to="/" id="header-element"> Leaderboards </Link>
                    <Link to="" id="header-element"> Community </Link>
                    <Link to="/" id="header-element"> Play now </Link>
                    <Link to="/" id="header-element"> Contact </Link>
                </div>
            </div>
        </>
    )
}

export default NavBar;