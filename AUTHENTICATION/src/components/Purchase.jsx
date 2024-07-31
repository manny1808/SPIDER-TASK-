import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import './Purchase.css'

export default function Purchase(){
  
  const [purchase, setpurchase] = useState([])
  const [purchased, setpurchased] = useState([])

  const Navigate = useNavigate()

  useEffect(() => {

    const fetchBook = async () => {

      const token = localStorage.getItem('token')
      if (!token) {
        Navigate('/logIn')
      
      }

        const response = await fetch('http://localhost:3000/books/purchase',{
          headers : { 'Authorization': `Bearer ${token}` },
        })

        if(response.ok)
        {

          const data = await response.json()
          setpurchase(data)

        }

        else
        {

          alert("COULDN'T LOAD")

        }
        
    }

    fetchBook()

    const fetchPurchaseBook = async () => {

      const token = localStorage.getItem('token')
      if (!token) {
        Navigate('/logIn')
      
      }

        const response = await fetch('http://localhost:3000/books/purchasedList',{
          headers : { 'Authorization': `Bearer ${token}` },
        })
        
        if(response.ok)
        {
          
        const data = await response.json()
        setpurchased(data)

        }

        else
        {

          alert("COULDN'T LOAD")

        }

    }

    fetchPurchaseBook()


  },[])

  async function handlePurchase(bookId){

    const token = localStorage.getItem('token')

    const response = await fetch(`http://localhost:3000/books/Purchase/${bookId}`,{
        method : 'PUT',
        headers : { 'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    })

    if(response.ok)
    {


    }

    else
    {

      alert('ERROR')
    }

  }

  
  return (

    <div className='BooksContainer'>
    <div className='BookList'>
        <h2>Available Books</h2>
        {purchase.map((book) => (
            <div className='Book' key={book._id}>
                <img
                    src={`data:${book.contentType};base64,${btoa(
                        String.fromCharCode(...new Uint8Array(book.data.data))
                    )}`}
                    alt={book.Title}
                />
                <div className='BookDetails'>
                    <h3>Title: {book.Title}</h3>
                    <h4>Author: {book.Author}</h4>
                    <h4>Genre: {book.Genre}</h4>
                    <p>Description: {book.Description}</p>
                    <button onClick={() => handlePurchase(book._id)}>PURCHASE</button>
                </div>
            </div>
        ))}
    </div>
    <div className='PurchasedList'>
        <h2>Purchased Books</h2>
        {purchased.map((book) => (
            <div className='Book' key={book._id}>
                <img
                    src={`data:${book.contentType};base64,${btoa(
                        String.fromCharCode(...new Uint8Array(book.data.data))
                    )}`}
                    alt={book.Title}
                />
                <div className='BookDetails'>
                    <h3>Title: {book.Title}</h3>
                </div>
            </div>
        ))}
    </div>
</div>
);

}
