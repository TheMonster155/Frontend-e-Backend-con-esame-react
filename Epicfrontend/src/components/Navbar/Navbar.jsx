import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { navLinks } from '../dataSource/navData'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap'
import { useContext, useState } from 'react'
import { BookContext } from '../context/BookContext'
import { DarkModeContext } from '../context/DarkModeContext'
import { Link } from 'react-router-dom'
import Login from '../../pages/Login/Login'
import { useUserContext } from '../context/UserContext' // Importa il contesto utente

const NavbarCustom = () => {
    const { inputValue, handleInputChange, handleSubmitForm } =
        useContext(BookContext)
    const { isDark } = useContext(DarkModeContext)
    const { user, login } = useUserContext() // Ottieni user e login dal UserContext

    const [showLoginModal, setShowLoginModal] = useState(false)

    const handleShowLogin = () => setShowLoginModal(true)
    const handleCloseLogin = () => setShowLoginModal(false)

    return (
        <Navbar
            bg={isDark ? 'dark' : 'light'}
            variant={isDark ? 'dark' : 'light'}
            className="fixed-top d-flex justify-content-between"
            expand="lg"
        >
            <Container>
                <Navbar.Brand>
                    <Link
                        to="/"
                        style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                        The Book
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {navLinks.map((link) => (
                            <Link
                                to={link.to}
                                key={link.to}
                                className="nav-link"
                            >
                                {link.text}
                            </Link>
                        ))}
                    </Nav>
                    <Form className="d-inline-flex" onSubmit={handleSubmitForm}>
                        <Row>
                            <Col>
                                <Form.Control
                                    type="text"
                                    placeholder="Search Book"
                                    value={inputValue}
                                    onChange={handleInputChange}
                                    className="me-2"
                                />
                            </Col>
                            <Col xs="auto">
                                <Button variant="success" type="submit">
                                    Search
                                </Button>
                            </Col>
                            <Col xs="auto">
                                {user ? (
                                    <h2>{user.name}</h2> // Mostra il nome dell'utente
                                ) : (
                                    <Button
                                        variant="success"
                                        onClick={handleShowLogin}
                                    >
                                        Login
                                    </Button>
                                )}
                            </Col>
                        </Row>
                    </Form>
                </Navbar.Collapse>
            </Container>
            <Modal show={showLoginModal} onHide={handleCloseLogin}>
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Login
                        onLogin={(userData) => {
                            login(userData) // Usa la funzione di login dal contesto
                            handleCloseLogin() // Chiudi il modulo di login
                        }}
                    />
                </Modal.Body>
            </Modal>
        </Navbar>
    )
}

export default NavbarCustom
