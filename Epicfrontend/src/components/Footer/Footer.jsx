import { Button, Col, Container, Row } from 'react-bootstrap'
import { navLinks } from '../../components/dataSource/navData'
import { LogoInstagram, LogoTiktok, LogoTwitter } from 'react-ionicons'
import { useContext } from 'react'
import { DarkModeContext } from '../context/DarkModeContext'
import './Footer.css'
const Footer = () => {
    const { isDark, handleDarkMode } = useContext(DarkModeContext)
    return (
        <footer
            className={`text-center py-5 ${isDark ? 'bg-dark text-light' : 'bg-light text-dark'}`}
            style={{ padding: '60px 0' }}
        >
            <Container>
                <Row>
                    <Col>
                        <div className="d-flex flex-column gap-2 justify-content-center align-items-center">
                            <div>
                                <h2>Book Store</h2>
                            </div>

                            <div className="d-flex gap-3 align-items-center justify-content-center">
                                <LogoTwitter
                                    color={isDark ? 'white' : 'dark'}
                                    title="A"
                                    height="40px"
                                    width="40px"
                                />
                                <LogoTiktok
                                    color={isDark ? 'white' : 'dark'}
                                    title="B"
                                    height="40px"
                                    width="40px"
                                />
                                <LogoInstagram
                                    color={isDark ? 'white' : 'dark'}
                                    title="C"
                                    height="40px"
                                    width="40px"
                                />
                                <Button
                                    variant="outline-secondary"
                                    onClick={handleDarkMode}
                                >
                                    {isDark ? 'Dark Mode' : 'Light Mode'}
                                </Button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer
