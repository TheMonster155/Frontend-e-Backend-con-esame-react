import NavbarCustom from '../../components/Navbar/Navbar'
import MainSection from '../../components/MainSection/MainSection'
import Swal from 'sweetalert2'
import Footer from '../../components/Footer/Footer'
import WelcomeSection from '../../components/WelcomeSection/WelcomeSection'
import { useSession } from '../../Middwlwers/ProtectRoutes'

const HomePage = () => {
    const sweetAlert = () => {
        Swal.fire({
            title: 'Welcome To My Page!',
            text: 'Enjoy browsing our book collection!',
            icon: 'success',
            confirmButtonText: 'Cool',
        })
    }

    const sessionNavigation = useSession()

    return (
        <>
            <NavbarCustom />
            <WelcomeSection sweetAlert={sweetAlert} />
            <MainSection />
            <Footer />
        </>
    )
}

export default HomePage
