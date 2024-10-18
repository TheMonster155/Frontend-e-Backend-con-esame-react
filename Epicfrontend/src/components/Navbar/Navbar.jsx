import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { navLinks } from '../dataSource/navData'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useContext } from 'react'
import { BookContext } from '../context/BookContext'
import { DarkModeContext } from '../context/DarkModeContext'
import { Link } from 'react-router-dom'

const NavbarCustom = () => {
    const { inputValue, handleInputChange, handleSubmitForm } =
        useContext(BookContext)
    const { isDark } = useContext(DarkModeContext)
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
                        </Row>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavbarCustom
