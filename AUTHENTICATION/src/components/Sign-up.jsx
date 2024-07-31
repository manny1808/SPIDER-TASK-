import './Sign-up.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Signup() {

  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const Navigate = useNavigate()

  const handleSubmit = async (e) => {

    e.preventDefault()
    
      const response = await fetch('http://localhost:3000/signUp', {

        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({userName,password}),

      })

      if (response.ok) {

        const {token} = await response.json()
        localStorage.setItem('token', token)
        Navigate('/homePage')


      }
      else{

        Navigate('/signUp')
        
      }

  }
    

  return (

      <div className='signUp'>

      <br />

      <h2 className='log-in-link'>CREATE ACCOUNT</h2>

      <form onSubmit={handleSubmit} className='signUp-form' >

        <br />

        <label htmlFor="userName" className='signUp-label'><strong>USERNAME</strong>: </label>

        <br />

        <input
          type="text"
          placeholder="USERNAME"
          value={userName}
          name='userName'
          onChange={(e) => setUserName(e.target.value)}
          className='signUp-input'
        />

        <br />

        <label htmlFor="password" className='signUp-label'><strong>PASSWORD</strong>: </label>

        <br />

        <input
          type="password"
          placeholder="PASSWORD"
          name='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='signUp-input'
        />

        <br />
        <br />

        <button type="submit">Sign Up</button>

      </form>

      <p className='log-in-link'>Existing user? <a href="http://localhost:5173/logIn">Log in</a></p>

      <h2 className='HR'>!!!HAPPY READING!!!</h2>

    </div>

  )

}

export default Signup;
