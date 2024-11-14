

import { useState } from 'react'
import { Col, Card, Form, Button, Container, Row } from 'react-bootstrap'
import NavbarCustom from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'

const BookOfTheDay = () => {
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        price: '',
        asin: '',
        img: '',
    })
    const [file, setFile] = useState(null)
    const [book, setBook] = useState(null)

    const uploadFile = async (fileToUpload) => {
        const fileData = new FormData()
        fileData.append('img', fileToUpload)

        try {
            const response = await fetch(
                `${import.meta.env.VITE_SERVER_BASE_URL}/books/upload/cloud`,
                {
                    method: 'POST',
                    body: fileData,
                }
            )
            const data = await response.json()
            return data.img
        } catch (error) {
            console.error(
                "Errore durante l'upload dell'immagine:",
                error.message
            )
        }
    }

    const handleOnChangeFiles = (e) => {
        setFile(e.target.files[0])
    }

    const handleOnChangeInput = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value,
        })
    }
    const handleSubmitBook = async (e) => {
        e.preventDefault()

        if (!file) {
            console.log('Nessun file selezionato.')
            return
        }

        try {
            const uploadedImageUrl = await uploadFile(file)
            if (!uploadedImageUrl) {
                console.log("Errore nel caricamento dell'immagine")
                return
            }

            const postFormData = { ...formData, img: uploadedImageUrl }
            const response = await fetch(
                `${import.meta.env.VITE_SERVER_BASE_URL}/books/create`,
                {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify(postFormData),
                }
            )

            if (!response.ok) {
                const errorResponse = await response.json()
                throw new Error(
                    errorResponse.message || 'Errore nella creazione del libro'
                )
            }

            const createdBook = await response.json()
            setBook(createdBook.book)
        } catch (error) {
            console.log('Errore durante la creazione del libro:', error.message)
        }
    }

    return (
        <>
            <NavbarCustom />
            <Container className="py-4">
                <Row>
                    <Col md={6} className="mb-4">
                        <h2>Crea un libro</h2>
                        <Form onSubmit={handleSubmitBook}>
                            {['title', 'category', 'price', 'asin'].map(
                                (field, idx) => (
                                    <Form.Group
                                        key={idx}
                                        controlId={`form${field.charAt(0).toUpperCase() + field.slice(1)}`}
                                    >
                                        <Form.Label>
                                            {field.charAt(0).toUpperCase() +
                                                field.slice(1)}
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                            name={field}
                                            value={formData[field]}
                                            onChange={handleOnChangeInput}
                                            required
                                        />
                                    </Form.Group>
                                )
                            )}
                            <Form.Group controlId="formImg">
                                <Form.Label>Immagine</Form.Label>
                                <Form.Control
                                    type="file"
                                    name="img"
                                    onChange={handleOnChangeFiles}
                                    required
                                />
                            </Form.Group>
                            <Button
                                variant="primary"
                                type="submit"
                                className="mt-3"
                            >
                                Crea
                            </Button>
                        </Form>
                    </Col>
                    <Col
                        md={6}
                        className="d-flex align-items-center justify-content-center"
                    >
                        {book && (
                            <Card
                                style={{ width: '18rem' }}
                                className="shadow-sm"
                            >
                                <Card.Img
                                    variant="top"
                                    src={book.img}
                                    alt="Book cover"
                                />
                                <Card.Body>
                                    <Card.Title>{book.title}</Card.Title>
                                    <Card.Text>
                                        <strong>Categoria:</strong>{' '}
                                        {book.category}
                                    </Card.Text>
                                    <Card.Text>
                                        <strong>Prezzo:</strong>{' '}
                                        {book.price.$numberDecimal} $
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        )}
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    )
}

export default BookOfTheDay
