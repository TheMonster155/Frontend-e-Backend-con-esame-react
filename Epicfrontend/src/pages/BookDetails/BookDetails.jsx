import { useContext, useEffect, useState } from 'react'
import { Col, Container, Row, Card } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { BookContext } from '../../components/context/BookContext'
import { DarkModeContext } from '../../components/context/DarkModeContext'
import NavbarCustom from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import { APIKEY } from '../../constants'
import { SelectContext } from '../../components/context/SelectContext'
import AllComments from '../../components/AllCommets/AllComments'

const BookDetails = () => {
    const { bookId } = useParams() // Prendi l'id del libro dai parametri dell'URL
    const { allBooks: books } = useContext(BookContext) // Usa il contesto per i libri
    const selectedBook = books?.books?.find((book) => book.asin === bookId) // Trova il libro in base all'ASIN

    const { isDark } = useContext(DarkModeContext) // Usa il contesto per la modalità scura
    const { selectAsin, setSelectAsin } = useContext(SelectContext) // Usa il contesto per la selezione del libro

    const [comments, setComments] = useState([])

    const ENDPOINTGET = `https://striveschool-api.herokuapp.com/api/books/${bookId}/comments/`

    const getRatings = async () => {
        if (!bookId) return
        try {
            const response = await fetch(ENDPOINTGET, {
                headers: {
                    Authorization: `Bearer ${APIKEY}`,
                },
            })
            if (response.ok) {
                const result = await response.json()
                setComments(result)
            } else {
                console.log('Error fetching comments:', response.status)
            }
        } catch (error) {
            console.log(error)
        }
    }

    // Usa l'effetto per ottenere i commenti del libro selezionato e impostare l'asin selezionato
    useEffect(() => {
        getRatings()
        setSelectAsin(bookId) // Imposta l'asin del libro selezionato
    }, [bookId, setSelectAsin])

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
                                                <AllComments
                                                    asin={selectAsin}
                                                />
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
