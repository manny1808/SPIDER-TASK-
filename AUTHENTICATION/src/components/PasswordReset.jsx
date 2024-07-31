import { useState } from "react"
import { useNavigate } from "react-router-dom"
import './PasswordReset.css'

export default function PasswordReset(){

    const [userName, setUserName] = useState('')
    const [newPassword, setnewPassword] = useState('')
    const [confirmPassword, setconfirmPassword] = useState('')

    const Navigate = useNavigate()

    async function handlesubmit(e){

        e.preventDefault()

        if(newPassword != confirmPassword)
        {

            alert('cant change')

        }

        const response = await fetch(`http://localhost:3000/passwordReset/${ userName }`,{

            method : 'PUT',
            headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({confirmPassword}),
      
        })

        if(response.ok)
        {

            Navigate('/logIn')

        }
        else
        {

            alert('usuccessful')

        }

    }

    return(

        <div className="container">

        <h1>PASSWORD RESET</h1>

        <form >

        <label htmlFor="">USERNAME</label>
        <input type="text" value={userName} onChange={(e)=>setUserName(e.target.value)}/>
        <label htmlFor="">NEW-PASSWORD</label>
        <input type="password" value={newPassword} onChange={(e)=>setnewPassword(e.target.value)}/>
        <label htmlFor="">CONFIRM-PASSWORD</label>
        <input type="password" value={confirmPassword} onChange={(e)=>setconfirmPassword(e.target.value)}/>
        <button onClick={handlesubmit}>submit</button>

        </form>

        </div>
        
    )

}