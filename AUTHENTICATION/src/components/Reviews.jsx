import { useEffect, useState } from 'react'
import UpdateReview from './UpdateReview'
import { useNavigate } from 'react-router-dom';
import './Review.css'

export default function Reviews({ bookTitle }) {
  const [reviews, setReviews] = useState([])
  const [selectedReview, setSelectedReview] = useState(null)
  const storedlikeCount = localStorage.getItem('likecount');
  const initiallikeCount = storedlikeCount ? parseInt(storedlikeCount, 10) : 0;
  const [likecount, setlikecount] = useState(initiallikeCount)
  const [liketoggle, setliketoggle] = useState(0)
  const storeddislikeCount = localStorage.getItem('dislikecount');
  const initialdislikeCount = storeddislikeCount ? parseInt(storeddislikeCount, 10) : 0;
  const [dislikecount, setdislikecount] = useState(initialdislikeCount)
  const [disliketoggle, setdisliketoggle] = useState(0)
  const Navigate = useNavigate()

  const fetchReview = async () => {
    const response = await fetch(`http://localhost:3000/books/reviews/${bookTitle}`);

    if (response.ok) {
      const data = await response.json();
      setReviews(data);
    } else {
      alert('ERROR')
      console.error('Could not fetch reviews:', response.statusText);
    }
  };

  useEffect(() => {
    fetchReview()

    localStorage.setItem('likecount', likecount)

    localStorage.setItem('dislikecount', dislikecount)

  }, [bookTitle, likecount, dislikecount]);

  const handleUpdateClick = (review) => {
    setSelectedReview(review);
  }

  const DeleteReview = async(Id) => {

    const token = localStorage.getItem('token')

    const response = await fetch(`http://localhost:3000/books/review/delete/${Id}`, {
      method: 'DELETE',
      headers: {'Authorization' : `Bearer ${token}`}
    })

    if(response.ok)
    {

      reviews.filter(review => review._id != Id)
      Navigate('/books')

    }

    else
    {

      alert('ERROR')

    }
    
  }

  const likes = async(Id) => {

      const token = localStorage.getItem('token')

      if(liketoggle === 0)

        {

          const response = await fetch(`http://localhost:3000/books/review/like/${Id}`,{
            method: 'PUT',
            headers: {'Authorization' : `Bearer ${token}`}})

          if(response.ok)
          {

            setlikecount((prevlikecount) => (prevlikecount + 1))
            setliketoggle(1)

            if(disliketoggle === 1)
            {

              setdislikecount((prevdislikecount) => (prevdislikecount - 1))
              setdisliketoggle(0)

            }

          }

          if(!response.ok)
          {

            const res = await fetch(`http://localhost:3000/books/review/like/remove/${Id}`,{
              method: 'PUT',
              headers: { 'Authorization' : `Bearer ${token}`}
            })

            if(res.ok)
            {

              setlikecount((prevlikecount) => (prevlikecount - 1))
              setliketoggle(0)
              
            }

          }
    
        }

        else if(liketoggle != 0)
        {

          const res = await fetch(`http://localhost:3000/books/review/like/remove/${Id}`,{
            method: 'PUT',
            headers: { 'Authorization' : `Bearer ${token}`}
          })

          if(res.ok)
          {

            setlikecount((prevlikecount) => (prevlikecount - 1))
            setliketoggle(0)
            
          }

        }

      }

  const dislikes = async(Id) => {

    const token = localStorage.getItem('token')

    if(disliketoggle === 0)

      {

        const response = await fetch(`http://localhost:3000/books/review/dislike/${Id}`,{
          method: 'PUT',
          headers: {'Authorization' : `Bearer ${token}`}})

        if(response.ok)
        {

          setdislikecount((prevdislikecount) => (prevdislikecount + 1))
          setdisliketoggle(1)
          if(liketoggle === 1)
            {

              setlikecount((prevlikecount) => (prevlikecount - 1))
              setliketoggle(0)

            }

        }

        if(!response.ok)
        {

          const res = await fetch(`http://localhost:3000/books/review/dislike/remove/${Id}`,{
            method: 'PUT',
            headers: { 'Authorization' : `Bearer ${token}`}
          })

          if(res.ok)
          {

            setdislikecount((prevdislikecount) => (prevdislikecount - 1))
            setdisliketoggle(0)
            
          }

        }
  
      }

      else if(disliketoggle != 0)
      {

        const res = await fetch(`http://localhost:3000/books/review/dislike/remove/${Id}`,{
          method: 'PUT',
          headers: { 'Authorization' : `Bearer ${token}`}
        })

        if(res.ok)
        {

          setdislikecount((prevdislikecount) => (prevdislikecount - 1))
          setdisliketoggle(0)
          
        }

      }

  }

  return (
    <div>
      <h3>Reviews</h3>
      {reviews.length > 0 ? (
        <ul>
          {reviews.map((review, index) => (
            <div key={index}>
              <li>{review.Review}</li>
              <img className = 'like' onClick = {()=>likes(review._id)} src="https://media.istockphoto.com/id/1175303918/vector/like-icon-vector-design.jpg?s=612x612&w=0&k=20&c=3dFZEggnAyodAcj9sSnnUvSZ69LQbE9kZof7vgGvAgs=" alt="" />
              <p>{likecount}</p>
              <img className='like' onClick={()=>dislikes(review._id)} src="data:image/jpeg;base64,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" alt="" />
              <p>{dislikecount}</p>
              <button onClick={() => handleUpdateClick(review)}>Update</button>
              {selectedReview && selectedReview._id === review._id && (
                <UpdateReview review={review.Review} Id={review._id} />
              )}
              <button onClick={()=>DeleteReview(review._id)}>DELETE</button>
            </div>
          ))}
        </ul>
      ) : (
        <p>No reviews yet.</p>
      )}
    </div>
  );
}
