import { useContext, useEffect, useState } from 'react'
import { Col, Container, Row, Card } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { BookContext } from '../../components/context/BookContext'
import { DarkModeContext } from '../../components/context/DarkModeContext'
import NavbarCustom from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import { APIKEY } from '../../constants'

const BookDetails = () => {
    const { bookId } = useParams()
    const { books } = useContext(BookContext)
    const bookSelect = books.find((book) => book.asin === bookId)
    const [comments, setComments] = useState([])
    const { isDark } = useContext(DarkModeContext)

    const ENDPOINT = `https://striveschool-api.herokuapp.com/api/books/${bookId}/comments/`

    const getCommentsRatings = async () => {
        if (!bookId) return
        try {
            const response = await fetch(ENDPOINT, {
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

    useEffect(() => {
        getCommentsRatings()
    }, [bookId])

    return (
        <>
            <NavbarCustom />
            <Container
                fluid
                className={`py-5 ${isDark ? 'bg-dark text-white' : 'bg-light text-dark'}`}
            >
                <Row className="g-4">
                    {bookSelect ? (
                        <>
                            <Col sm={12} md={6} className="d-flex">
                                <Card className="flex-fill h-100 shadow-lg rounded-3">
                                    <Card.Img
                                        variant="top"
                                        src={bookSelect.img}
                                        className="rounded-top"
                                        style={{
                                            height: '400px',
                                            objectFit: 'cover',
                                            width: '100%',
                                        }}
                                    />
                                    <Card.Body>
                                        <Card.Title>
                                            {bookSelect.title}
                                        </Card.Title>
                                        <Card.Text>
                                            <strong>Category:</strong>{' '}
                                            {bookSelect.category}
                                        </Card.Text>
                                        <Card.Text>
                                            <strong>Price:</strong>{' '}
                                            {bookSelect.price}£
                                        </Card.Text>
                                        <Card.Text>
                                            {bookSelect.description}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col sm={12} md={6}>
                                <Card className="h-100 shadow-sm">
                                    <Card.Body className="p-4">
                                        <h3>Comments</h3>
                                        {comments.length > 0 ? (
                                            comments.map((comment) => (
                                                <div
                                                    key={comment._id}
                                                    className="mb-3 border-bottom pb-2"
                                                >
                                                    <p className="mb-1">
                                                        {comment.comment}
                                                    </p>
                                                    <small className="text-muted">
                                                        Rating: {comment.rate}
                                                    </small>
                                                </div>
                                            ))
                                        ) : (
                                            <p>No comments available</p>
                                        )}
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
