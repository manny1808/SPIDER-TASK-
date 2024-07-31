import './UpdateProfile.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function UpdateProfile() {
  const [bio, setBio] = useState('')
  const [file, setFile] = useState(null)
  const [id, setId] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    const fetchForm = async () => {
      const token = localStorage.getItem('token')
      if (!token) {
        navigate('/profile')
        return
      }

      const response = await fetch('http://localhost:3000/profile', {
        headers: { 'Authorization': `Bearer ${token}` },
      })

      if (response.ok) {
        const data = await response.json()
        setBio(data.bio)
        setId(data._id)
      } else {
        alert('Failed to load profile data')
      }
    }

    fetchForm()
  }, [navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('image', file)
    formData.append('bio', bio)
    formData.append('id', id)

    const token = localStorage.getItem('token')

    const response = await fetch('http://localhost:3000/updateProfile', {
      method: 'PUT',
      body: formData,
      headers: { 'Authorization': `Bearer ${token}` },
    })

    if (response.ok) {
      navigate('/profile')
    } else {
      alert('Failed to update profile')
    }
  }

  return (
    <div className='updateProfile-container'>
      <div className='updateProfile-header'>
        <h1>Update Your Profile</h1>
        <h2>Personalize your profile details</h2>
      </div>

      <form onSubmit={handleSubmit} className='updateProfile-form'>
        <label htmlFor='bio' className='updateProfile-label'>Bio:</label>
        <textarea
          type='text'
          id='bio'
          placeholder='Enter your bio'
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className='updateProfile-input'
        />

        <label htmlFor='newPic' className='updateProfile-label'>New Profile Picture:</label>
        <input
          type='file'
          id='newPic'
          accept='image/*'
          onChange={(e) => setFile(e.target.files[0])}
          className='updateProfile-input'
        />

        <button type='submit' className='updateProfile-button'>Update Profile</button>
      </form>
    </div>
  )
}

export default UpdateProfile
