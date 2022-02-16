import { signOut } from 'firebase/auth';
import React, { useContext } from 'react'
// import { Button, Container, Form, FormControl, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import GoogleContext from '../../../Context/GoogleContext';
import { auth } from '../../../firebase-config';
import './header.css';

const Header = ({ isAuth, setIsAuth }) => {
    const { loggedUser } = useContext(GoogleContext);
    const signOutUser = () => {
        signOut(auth)
            .then(() => {
                setIsAuth(false);
                localStorage.clear();
                window.location.pathname = '/';
            })
            .catch((err) => {
                console.log(err.message);
            })
    }
    return (
        <>
            <nav className="bg-secondary">
                <Link to='/'>Home</Link>
                {!isAuth ? <Link to='/login'>Login</Link> : (
                    <>
                        <Link to='/create-post'>Create Post</Link>
                        <Link to='/' onClick={signOutUser}>Logout</Link>
                    </>
                )}
                {loggedUser.role === 'admin' && (
                    <Link to='/all-users'>Users</Link>
                )}
            </nav>
            {/* <Navbar bg="light" expand="lg">
                <Container fluid>
                    <Navbar.Brand href="#" className="outline">Firebase Authentication</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Nav.Link href="#action1">Article</Nav.Link>
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Nav.Link href="#action1">Article</Nav.Link>
                        </Nav>

                        <NavDropdown title="Options" id="navbarScrollingDropdown" className='option'>
                            <NavDropdown.Item href="#action3">Login</NavDropdown.Item>
                            <NavDropdown.Item href="#action4">Register</NavDropdown.Item>
                        </NavDropdown>
                    </Navbar.Collapse>
                </Container>
            </Navbar> */}
        </>

    )
}

export default Header