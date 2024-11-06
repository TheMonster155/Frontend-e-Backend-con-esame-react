import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import About from './pages/About/About'
import BookDay from './pages/BookDay/BookDay'
import PageError from './pages/PageError/PageError'
import BookDetails from './pages/BookDetails/BookDetails'

import { useState } from 'react'

import ProtectedRoutes from './Middwlwers/ProtectRoutes'
import ContactPage from './pages/Contacts/Contacts'
import Login from './pages/Login/Login'

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/about" element={<About />} />
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<PageError />} />
                <Route path="/homepage" element={<Navigate to="/" />} />

                {/* Rotte protette */}

                <Route element={<ProtectedRoutes />}>
                    <Route path="/bookDay" element={<BookDay />} />
                    <Route path="/contact" element={<ContactPage />} />

                    <Route path="/book/:bookId" element={<BookDetails />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
/*

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
*/
