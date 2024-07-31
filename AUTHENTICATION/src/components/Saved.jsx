import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import './Saved.css'

export default function Saved(){
  
  const [saved, setsaved] = useState([])

  const Navigate = useNavigate()

  useEffect(() => {

      const fetchSavedBook = async () => {

      const token = localStorage.getItem('token')
      if (!token) {
        Navigate('/logIn')
      
      }

        const response = await fetch('http://localhost:3000/books/savedList',{
          headers : { 'Authorization': `Bearer ${token}` },
        })
        
        if(response.ok)
        {
          
        const data = await response.json()
        setsaved(data)

        }

        else
        {

          alert('ERROR LOADING')
        }

    }

    fetchSavedBook()


  },[])

  return (

    <div className='savedBookList'>
        {saved.map((book) => (
            <div className='savedBook' key={book._id}>
                <img
                    src={`data:${book.contentType};base64,${btoa(
                        String.fromCharCode(...new Uint8Array(book.data.data))
                    )}`}
                    alt={book.Title}
                />
                <div className='savedBookDetails'>
                    <h3>Title: {book.Title}</h3>
                    <h4>Author: {book.Author}</h4>
                    <h4>Genre: {book.Genre}</h4>
                    <p>Description: {book.Description}</p>
                </div>
            </div>
        ))}
      </div>
)

}
