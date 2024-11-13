

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import About from './pages/About/About'
import BookDay from './pages/BookDay/BookDay'
import PageError from './pages/PageError/PageError'
import BookDetails from './pages/BookDetails/BookDetails'
import ContactPage from './pages/Contacts/Contacts'
import Login from './pages/Login/Login'
import Cart from './pages/Card/Card'
import ProtectedRoutes from './Middwlwers/ProtectRoutes'
import { CartProvider } from './components/context/CardContext'


const App = () => {
    return (
        <CartProvider>
            <BrowserRouter>
                <Routes>
                    {/* Wrappa solo le rotte HomePage e BookDetails con CartProvider */}
                    <Route exact path="/" element={<HomePage />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/homepage" element={<Navigate to="/" />} />
              
                    {/* Rotte protette */}
                    <Route element={<ProtectedRoutes />}>
                        <Route path="/card" element={<Cart />} />
                        <Route path="/bookDay" element={<BookDay />} />
                        <Route path="/contact" element={<ContactPage />} />
                        <Route path="/book/:bookId" element={<BookDetails />} />
                    </Route>
                    <Route path="*" element={<PageError />} />
                </Routes>
            </BrowserRouter>
        </CartProvider>
    )
}

export default App
