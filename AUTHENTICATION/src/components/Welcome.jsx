import './Welcome.css'
import Navbar from './Navbar'
import Logout from './Log-out'

export default function Welcome(){

    return(

        <div className="WelcomeBody">

            <Navbar />

            <Logout />
            
        </div>

    )

}