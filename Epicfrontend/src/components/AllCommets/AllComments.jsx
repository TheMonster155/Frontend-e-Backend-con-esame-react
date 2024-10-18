import { Button, ListGroup, Modal, Form } from 'react-bootstrap'
import { APIKEY } from '../../constants'
import { useContext, useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { DarkModeContext } from '../context/DarkModeContext'

const AllComments = ({ asin }) => {
    const { isDark } = useContext(DarkModeContext)

    const ENDPOINTGET = `https://striveschool-api.herokuapp.com/api/books/${asin}/comments/`
    const [comments, setComments] = useState([])
    const [modalFormState, setModalFormState] = useState({
        rate: '',
        comment: '',
        id: null,
        elementId: asin,
    })
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleInputChange = (e) => {
        const value =
            e.target.name === 'rate' ? Number(e.target.value) : e.target.value
        setModalFormState({
            ...modalFormState,
            [e.target.name]: value,
        })
    }

    const getRatings = async () => {
        if (!asin) return
        try {
            const response = await fetch(ENDPOINTGET, {
                headers: {
                    Authorization: `Bearer ${APIKEY}`,
                },
            })
            if (response.ok) {
                const result = await response.json()
                if (Array.isArray(result)) {
                    setComments(result)
                } else {
                    throw new Error('Unexpected response format')
                }
            } else {
                console.log('Error fetching comments:', response.status)
                Swal.fire('Error', 'Unable to fetch comments', 'error')
            }
        } catch (error) {
            console.log(error)
            Swal.fire(
                'Error',
                'Something went wrong while fetching comments',
                'error'
            )
        }
    }

    const addOrUpdateComment = async (e) => {
        e.preventDefault()

        if (isSubmitting) return

        setIsSubmitting(true)

        const endpoint = modalFormState.id
            ? `https://striveschool-api.herokuapp.com/api/comments/${modalFormState.id}`
            : 'https://striveschool-api.herokuapp.com/api/comments/'

        const method = modalFormState.id ? 'PUT' : 'POST'

        const result = await Swal.fire({
            title: modalFormState.id
                ? 'Do you want to edit this comment?'
                : 'Do you want to add this comment?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Save',
            denyButtonText: `Don't save`,
        })

        if (result.isConfirmed) {
            try {
                const response = await fetch(endpoint, {
                    method,
                    headers: {
                        Authorization: `Bearer ${APIKEY}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(modalFormState),
                })

                if (response.ok) {
                    Swal.fire('Saved!', '', 'success')
                    setModalFormState({
                        rate: '',
                        comment: '',
                        id: null,
                        elementId: asin,
                    }) // Resetta anche elementId
                    getRatings()
                } else {
                    const errorMsg = await response.text()
                    Swal.fire(
                        'Error!',
                        `Something went wrong: ${errorMsg}`,
                        'error'
                    )
                }
            } catch (error) {
                console.error(error)
                Swal.fire('Error!', 'Something went wrong.', 'error')
            } finally {
                setIsSubmitting(false)
            }
        } else if (result.isDenied) {
            Swal.fire('Changes are not saved', '', 'info')
            setIsSubmitting(false)
        }
    }

    const handleEditClick = (comment) => {
        setModalFormState({
            rate: comment.rate,
            comment: comment.comment,
            id: comment._id,
            elementId: asin,
        })
    }

    const deleteComment = async (commentId) => {
        const endpoint = `https://striveschool-api.herokuapp.com/api/comments/${commentId}`

        const result = await Swal.fire({
            title: 'Do you want to delete this comment?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Delete',
            denyButtonText: `Don't delete`,
        })

        if (result.isConfirmed) {
            try {
                const response = await fetch(endpoint, {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${APIKEY}`,
                    },
                })

                if (response.ok) {
                    Swal.fire('Deleted!', '', 'success')
                    getRatings()
                } else {
                    Swal.fire('Error!', 'Unable to delete comment.', 'error')
                }
            } catch (error) {
                console.error(error)
                Swal.fire('Error!', 'Something went wrong.', 'error')
            }
        } else if (result.isDenied) {
            Swal.fire('Changes are not saved', '', 'info')
        }
    }

    useEffect(() => {
        getRatings()
    }, [asin])

    return (
        <div
            className={`p-4 ${isDark ? 'bg-dark text-light' : 'bg-light text-dark'}`}
        >
            <ListGroup variant="flush">
                {comments.length > 0 ? (
                    comments.map((comment) => (
                        <ListGroup.Item
                            key={comment._id}
                            className="border-0 rounded-3 shadow-sm mb-2"
                        >
                            <div className="d-flex flex-column gap-1">
                                <div>
                                    <strong>Author:</strong> {comment.author}
                                </div>
                                <div>
                                    <strong>Comment:</strong> {comment.comment}
                                </div>
                                <div>
                                    <strong>Rating:</strong> {comment.rate}
                                </div>
                            </div>
                            <div className="d-flex gap-2 mt-2">
                                <Button
                                    variant="warning"
                                    onClick={() => handleEditClick(comment)}
                                    className="flex-grow-1"
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant="danger"
                                    onClick={() => deleteComment(comment._id)}
                                    className="flex-grow-1"
                                >
                                    Delete
                                </Button>
                            </div>
                        </ListGroup.Item>
                    ))
                ) : (
                    <ListGroup.Item>
                        Non ci sono commenti per questo libro
                    </ListGroup.Item>
                )}
            </ListGroup>
            <Form onSubmit={addOrUpdateComment} className="mt-4">
                <Form.Control
                    type="number"
                    min={1}
                    max={5}
                    required={true}
                    name="rate"
                    value={modalFormState.rate}
                    onChange={handleInputChange}
                    placeholder="Rate"
                    className="mb-2"
                />
                <Form.Control
                    type="text"
                    required={true}
                    name="comment"
                    value={modalFormState.comment}
                    onChange={handleInputChange}
                    placeholder="Comment"
                    className="mb-2"
                />
                <Button
                    type="submit"
                    variant="success"
                    className="w-100"
                    disabled={isSubmitting}
                >
                    {modalFormState.id ? 'Aggiorna Commento' : 'Invia Commento'}
                </Button>
            </Form>
        </div>
    )
}

export default AllComments
