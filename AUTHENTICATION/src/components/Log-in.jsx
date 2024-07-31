import './Log-in.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const Navigate = useNavigate()

  const handleSubmit = async (e) => {

    e.preventDefault()
    
      const response = await fetch('http://localhost:3000/logIn', {

        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({userName,password}),

      })

      if (response.ok)
      {

        const {token} = await response.json()
        localStorage.setItem('token', token)
        Navigate('/homePage')

      }

      else
      {

        alert('INVALID CREDENTIALS')
        Navigate('/logIn')

      }

  }
    

  return (

    <div className='signUp'>

      <br />

      <h2 className='H2'>ENTER CREDENTIALS</h2>

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

        <button type="submit">Log in</button>

      </form>

      <p><a href="http://localhost:5173/passwordReset" className='log-in-link'>forgot password?</a></p>

      <p className='log-in-link'>New user? <a href="http://localhost:5173/signUp">Sign up</a></p>

      <h2 className='HR'>!!!HAPPY READING!!!</h2>

    </div>

  )

}

export default Login;
