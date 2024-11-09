import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const PageError = () => {
    const navigate = useNavigate()

    const redirectHomePage = () => {
        navigate(`/`)
    }

    return (
        <div>
            <div>
                <h1>Sorry, not found page </h1>
            </div>

            <Button onClick={redirectHomePage}>HomePage</Button>
        </div>
    )
}

export default PageError
