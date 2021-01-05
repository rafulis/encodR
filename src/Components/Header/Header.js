import logo from '../../logo.svg';
import Navbar from 'react-bootstrap/Navbar';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const Header = () => {
    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand>
                <img
                    alt=""
                    src={logo}
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                />{' '}
                encodR
            </Navbar.Brand>
            <Nav className="mr-auto">
                <Link className="nav-link" role="button" to="/">Base64 Encode/Decode</Link>
                <Link className="nav-link" role="button" to="/urlencode">URL Encode/Decode</Link>
                <Link className="nav-link" role="button" to="/jsonminify">JSON Minify/Beautify</Link>
                <Link className="nav-link" role="button" to="/jsminify">JS Minify/Beautify</Link>
                <Link className="nav-link" role="button" to="/cssminify">CSS Minify/Beautify</Link>
            </Nav>
        </Navbar>
    );
}

export default Header;
