import { Col, Container, Row } from 'react-bootstrap'
import BookCard from '../BookCard/BookCard'
import { useContext, useEffect } from 'react'
import { BookContext } from '../context/BookContext'
import { DarkModeContext } from '../context/DarkModeContext'
import { SelectContext } from '../context/SelectContext'
import ResponsivePagination from 'react-responsive-pagination'
import 'react-responsive-pagination/themes/classic.css'

const MainSection = () => {
    const { allBooks: books, page, pageSize, setPage } = useContext(BookContext)
    const { isDark } = useContext(DarkModeContext)
    const { setSelectAsin } = useContext(SelectContext)

    useEffect(() => {
        setSelectAsin(null)
    }, [setSelectAsin])
    console.log('Libri disponibili:', books)
    return (
        <main className={isDark ? 'bg-dark text-white' : 'bg-light text-dark'}>
            <Container fluid>
                <Row className="gy-2">
                    {books && books.books
                        ? books.books.map((book) => (
                              <BookCard
                                  key={book._id}
                                  title={book.title}
                                  price={book.price.$numberDecimal}
                                  category={book.category}
                                  img={book.img}
                                  asin={book.asin}
                                  _id={book._id}
                              />
                          ))
                        : books &&
                          books.map((book) => (
                              <BookCard
                                  key={book._id}
                                  title={book.title}
                                  price={book.price.$numberDecimal}
                                  category={book.category}
                                  img={book.img}
                                  asin={book.asin}
                                  _id={book._id}
                              />
                          ))}
                </Row>
                {books && (
                    <Row>
                        <Col>
                            <ResponsivePagination
                                current={page}
                                total={books.totalPages}
                                onPageChange={setPage}
                            />
                        </Col>
                    </Row>
                )}
            </Container>
        </main>
    )
}

export default MainSection
