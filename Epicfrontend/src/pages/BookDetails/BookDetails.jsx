import { useContext, useEffect } from 'react'
import { Col, Container, Row, Card } from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom'
import { BookContext } from '../../components/context/BookContext'
import { DarkModeContext } from '../../components/context/DarkModeContext'
import NavbarCustom from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import { useUserContext } from '../../components/context/UserContext'
import AllComments from '../../components/AllCommets/AllComments'
import { SelectContext } from '../../components/context/SelectContext'
//TODO: fare in modo se uttente non a il login puo vedere solo i commenti
const BookDetails = () => {
    const { bookId } = useParams()
    const { allBooks: books } = useContext(BookContext)
    const selectedBook = books?.books?.find((book) => book._id === bookId)

    const { isDark } = useContext(DarkModeContext)
    const { selectAsin, setSelectAsin } = useContext(SelectContext)
    const { user } = useUserContext()
    const navigate = useNavigate()

    useEffect(() => {
        if (!user) {
            navigate('/login', { state: { from: `/book/${bookId}` } })
        }
        setSelectAsin(bookId)
    }, [user, bookId, navigate, setSelectAsin])

    return (
        <>
            <NavbarCustom />
            <Container
                fluid
                className={`book-details-container ${isDark ? 'bg-dark text-white' : 'bg-light text-dark'}`}
            >
                <Row className="justify-content-center">
                    {selectedBook ? (
                        <>
                            <Col sm={6} md={6} lg={5}>
                                <Card className="book-card shadow-sm">
                                    <Card.Img
                                        variant="top"
                                        src={selectedBook.img}
                                        className="book-img"
                                    />
                                    <Card.Body>
                                        <Card.Title className="book-title">
                                            {selectedBook.title}
                                        </Card.Title>
                                        <Card.Text>
                                            <strong>Category:</strong>{' '}
                                            {selectedBook.category}
                                        </Card.Text>
                                        <Card.Text>
                                            <strong>Price:</strong>{' '}
                                            {selectedBook.price?.$numberDecimal}
                                            $
                                        </Card.Text>
                                        <Card.Text>
                                            {selectedBook.description}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col sm={12} md={6} lg={4}>
                                <Card className="comments-card shadow-sm">
                                    <Card.Body>
                                        <h5 className="comments-title">
                                            Comments
                                        </h5>
                                        <div className="comments-section">
                                            {selectAsin ? (
                                                <AllComments _id={selectAsin} />
                                            ) : (
                                                <p className="no-comments">
                                                    No comments available
                                                </p>
                                            )}
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </>
                    ) : (
                        <p>No book selected.</p>
                    )}
                </Row>
            </Container>
            <Footer />
        </>
    )
}

export default BookDetails
