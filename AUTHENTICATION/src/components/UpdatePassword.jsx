import { useState } from "react"
import { useNavigate } from "react-router-dom"
import './PasswordReset.css'

export default function UpdatePassword(){

    const [newPassword, setnewPassword] = useState('')
    const [confirmPassword, setconfirmPassword] = useState('')

    const Navigate = useNavigate()

    async function HandleSubmit(e){

        e.preventDefault()

        const token = localStorage.getItem('token');
        if (!token) {
          Navigate('/logIn');
          return
        }  

        if(newPassword != confirmPassword)
        {

            alert('cant change')

        }

        const response = await fetch(`http://localhost:3000/updatePassword`,{

            method : 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
              },
              body: JSON.stringify({confirmPassword}),
      
        })

        if(response.ok)
        {

            Navigate('/profile')

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

        <label htmlFor="">NEW-PASSWORD</label>
        <input type="password" value={newPassword} onChange={(e)=>setnewPassword(e.target.value)}/>
        <label htmlFor="">CONFIRM-PASSWORD</label>
        <input type="password" value={confirmPassword} onChange={(e)=>setconfirmPassword(e.target.value)}/>
        <button onClick={HandleSubmit}>submit</button>

        </form>

        </div>
        
    )

}