import { useState } from "react";

export default function UpdateReview({ review, Id }) {
    const [updated, setUpdated] = useState(review);

    const update = async (e) => {
        e.preventDefault()

        const token = localStorage.getItem('token')

        const response = await fetch(`http://localhost:3000/books/review/update/${Id}`, {
            method: 'PUT'
            ,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`

            },
            body: JSON.stringify({ updated })

        })

        if(response.ok)
        {

            console.log('done')

        }
    };

    return (
        <form onSubmit={(e) => update(e)}>
            <textarea
                value={updated}
                onChange={(e) => setUpdated(e.target.value)}
            ></textarea>
            <button type="submit">Submit</button>
        </form>
    );
}
