import './CreateBookForm.css'
import { useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

function CreateBookForm(){

  const [Title, setTitle] = useState('');
  const [Author, setAuthor] = useState('');
  const [Genre, setGenre] = useState('');
  const [file, setfile] = useState('');
  const [Description, setDescription] = useState('');

  const Navigate = useNavigate()

  useEffect(() => {

    const fetchForm = async () => {

        const token = localStorage.getItem('token');
        if (!token) {

        Navigate('/logIn')
    
      }

    }

    fetchForm()

  },[])

  const handleSubmit = async (e) => {

    e.preventDefault()

    const formData = new FormData()

    formData.append('image', file)
    formData.append('Title', Title)
    formData.append('Author', Author)
    formData.append('Genre', Genre)
    formData.append('Description', Description)

    const token = localStorage.getItem('token')

    
      const response = await fetch('http://localhost:3000/books/create', {

        method: 'POST',
        body: formData,
        headers: {'Authorization' : `Bearer ${token}`},

      })

      if (response.ok) {

        Navigate('/books')

      }
      else{

        alert("COULDN'T CREATE")
        Navigate('/CreateBook')

      }

  }
    

  return (

        <div className='createBookBody'>

        <br />

        <h1 className='createBookMsg'>FEED IN YOUR IMAGINATION WITH CREATIVITY</h1>

        <h2 className='createBookMsg'>LET THE BOOK ENTHUSIASTS CHERISH</h2>

        <form onSubmit={handleSubmit} className='createBook-form' >

        <br />

        <label htmlFor="Title" className='createBook-label'><strong>TITLE</strong>: </label>

        <br />

        <input
          type="text"
          placeholder="TITLE"
          value={Title}
          name='Title'
          onChange={(e) => setTitle(e.target.value)}
          className='createBook-input'
        />

        <br />

        <label htmlFor="Author" className='createBook-label'><strong>AUTHOR</strong>: </label>

        <br />

        <input
          type="text"
          placeholder="AUTHOR"
          name='Author'
          value={Author}
          onChange={(e) => setAuthor(e.target.value)}
          className='createBook-input'
        />

        <br />

        <label htmlFor="Genre" className='createBook-label'><strong>Genre</strong>: </label>

      <br />

      <input
        type="text"
        placeholder="GENRE"
        name='Genre'
        value={Genre}
        onChange={(e) => setGenre(e.target.value)}
        className='createBook-input'
      />

      <br />

      <label htmlFor="Cover_page" className='createBook-label'><strong>COVER-PAGE</strong>: </label>

      <br />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setfile(e.target.files[0])}
        className='createBook-input'
      />

      <br />

      <label htmlFor="Description" className='createBook-label'><strong>DESCRIPTION</strong>: </label>

      <br />

      <textarea
        placeholder="DESCRIPTION"
        name='DESCRIPTION'
        value={Description}
        onChange={(e) => setDescription(e.target.value)}
        className='createBook-input'
      />

      <br />
      <br />

      <button type="submit">Create</button>

      </form>

      <h2 className='createBook-HR'>!!!NEW JOURNEY OF IDEAS AND MANY MORE!!!</h2>

    </div>

  )

}

export default CreateBookForm