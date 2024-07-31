import { useNavigate } from 'react-router-dom'
import './Log-out.css'

function Logout(){
    
  const Navigate = useNavigate()

  const handleSubmit = async(e)=>{
  
    e.preventDefault()
    
    localStorage.removeItem('token')

      Navigate('/logIn')

}

  return (

      <button onClick={handleSubmit} className='logout-button'>Log out</button>

  )

}

export default Logout
