import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import About from './pages/About/About'
import BookDay from './pages/BookDay/BookDay'
import PageError from './pages/PageError/PageError'
import BookDetails from './pages/BookDetails/BookDetails'
import Login from './pages/Login/Login'
import { useState } from 'react'
const App = () => {
    const [isLogged, setIsLogged] = useState(false)

    const handleLogin = () => {
        setIsLogged(true)
    }
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={isLogged ? <HomePage /> : <Navigate to="/login" />}
                />
                <Route
                    path="/login"
                    element={<Login onlogin={handleLogin} />}
                />
                <Route path="/bookDay" element={<BookDay />} />
                <Route path="/about" element={<About />} />
                <Route path="/book/:bookId" element={<BookDetails />} />
                <Route path="*" element={<PageError />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
