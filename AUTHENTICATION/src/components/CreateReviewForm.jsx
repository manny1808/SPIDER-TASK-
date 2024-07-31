import { useState } from 'react';

export default function CreateReview({ bookTitle }) {
  const [newreview, setNewReview] = useState('');

  const postReview = async (e) => {
    e.preventDefault()

    const token = localStorage.getItem('token');

    const response = await fetch(`http://localhost:3000/books/review/create/${bookTitle}`, {
      method: 'POST',
      body: JSON.stringify({ newreview }),
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      console.log('Review posted successfully');
    } else {
      console.error('Failed to post review:', response.statusText);
    }
  };

  return (
    <form onSubmit={postReview}>
      <label htmlFor="REVIEW">WRITE-REVIEW</label>
      <textarea
        name="REVIEW"
        id="REVIEW"
        value={newreview}
        onChange={(e) => setNewReview(e.target.value)}
      />
      <button type='submit'>Submit</button>
    </form>
  );
}
