import logo from '../../assets/images/logo.png';
import Navbar from 'react-bootstrap/Navbar';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Header = () => {
    const [expanded, setExpanded] = useState(false);
    return (
        <Navbar expanded={expanded} collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand>
                <img
                    alt=""
                    src={logo}
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                />{' '}
                <span style={{ fontSize: 25 }}>ncodR</span>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={() => setExpanded(!expanded)} />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Link className="nav-link" role="button" to="/" onClick={() => setExpanded(false)}>Base64 Encode/Decode</Link>
                    <Link className="nav-link" role="button" to="/urlencode" onClick={() => setExpanded(false)}>URL Encode/Decode</Link>
                    <Link className="nav-link" role="button" to="/jsonminify" onClick={() => setExpanded(false)}>JSON Minify/Beautify</Link>
                    <Link className="nav-link" role="button" to="/jsminify" onClick={() => setExpanded(false)}>JS Minify/Beautify</Link>
                    <Link className="nav-link" role="button" to="/cssminify" onClick={() => setExpanded(false)}>CSS Minify/Beautify</Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}
export default Header;

