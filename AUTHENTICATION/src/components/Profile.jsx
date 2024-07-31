import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './Profile.css'; // Import the CSS file

export default function Profile() {
  let k1 = localStorage.getItem('k1') || 0;
  const [user, setuser] = useState(null);
  const Navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        Navigate('/logIn');
        return;
      }

      const response = await fetch('http://localhost:3000/profile', {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        setuser(data);
      } else {
        alert('ERROR')
        console.error('Failed to fetch profile:', response.statusText);
      }
    };

    fetchProfile();
  }, [Navigate]);

  const updateProfile = () => {
    k1 = 1;
    localStorage.setItem('k1', k1);
    Navigate('/updateProfile');
  };

  const updatePassword = () => {
    Navigate('/updatePassword');
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-photo">
        <h2>PROFILE PHOTO:</h2>

          <img
          src={
            user.data && user.data.data
              ? `data:${user.contentType};base64,${btoa(
                  String.fromCharCode(...new Uint8Array(user.data.data))
                )}`
              : 'https://www.shutterstock.com/shutterstock/photos/1760295569/display_1500/stock-vector-profile-picture-avatar-icon-vector-1760295569.jpg' // Provide a default image path or URL
          }
          
            alt="Profile"
          />

      </div>

      <div className="profile-info">
        <div className="profile-section">
          <h2>USERNAME:</h2>
          <p>{user.userName}</p>
        </div>

        <div className="profile-section">
          <h2>BIO:</h2>
          <p>{user.bio}</p>
        </div>
      </div>

      <div className="profile-actions">
        <button onClick={updatePassword}>Change Password</button>
        <button onClick={updateProfile}>Update Profile</button>
      </div>
    </div>
  );
}

