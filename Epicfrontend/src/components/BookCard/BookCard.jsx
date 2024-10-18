import { Button, Col } from 'react-bootstrap'
import Card from 'react-bootstrap/Card'
import './BookCard.css'
import { useContext } from 'react'
import Swal from 'sweetalert2'
import { SelectContext } from '../context/SelectContext'
import { useNavigate } from 'react-router-dom'
import { DarkModeContext } from '../context/DarkModeContext'

const BookCard = ({ price, category, title, img, asin }) => {
    const { selectAsin, toggleAsin } = useContext(SelectContext)
    const { isDark } = useContext(DarkModeContext)
    const isSelected = selectAsin === asin
    const navigate = useNavigate()

    const redirectDetails = () => {
        navigate(`/book/${asin}`)
    }

    const toggleIsSelect = () => {
        toggleAsin(asin)
        Swal.fire({
            title: `${title}`,
            text: `Hai selezionato "${title}"`,
            icon: 'info',
            confirmButtonText: 'Ok',
        })
    }

    return (
        <Col sm={12} md={6} lg={4} className="mb-4">
            <Card
                className={`h-100 custom ${isDark ? 'border-3 white' : ''} shadow border-0 rounded-3 transition ${isSelected ? 'selected-border' : ''}`}
                onClick={toggleIsSelect}
            >
                <Card.Img variant="top" className="card-image" src={img} />
                <Card.Body
                    className={`custom-body ${isDark ? 'bg-dark text-light' : 'bg-light text-dark'}`}
                >
                    <Card.Title className="fw-bold fs-5">{category}</Card.Title>
                    <Card.Text className="text-truncate">{title}</Card.Text>
                    <Card.Text className="fs-5 fw-bold">{price}$</Card.Text>
                    <Button
                        onClick={redirectDetails}
                        className="w-100 btn-modern d-flex align-items-center justify-content-center"
                    >
                        Details
                    </Button>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default BookCard
