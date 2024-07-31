import Homepage from './components/Home-page'
import Signup from './components/Sign-up'
import Login from './components/Log-in'
import CreateBookForm from './components/CreateBookForm'
import Books from './components/Books'
import PasswordReset from './components/PasswordReset'
import Purchase from './components/Purchase'
import Saved from './components/Saved'
import Profile from './components/Profile'
import UpdatePassword from './components/UpdatePassword'
import UpdateProfile from './components/UpdateProfile'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
function App() {

  return (

    <Router>

      <Routes>

        <Route path = "/signUp" element = {<Signup />} />
        
        <Route path = "/homePage" element = {<Homepage />} />

        <Route path = "/logIn" element = {<Login />} />

        <Route path = "/CreateBook" element = {<CreateBookForm />} />

        <Route path = "/books" element = {<Books />} />

        <Route path = "/passwordReset" element = {<PasswordReset />} />

        <Route path = "/purchaseBooks" element = {<Purchase />} />

        <Route path = "/savedBooks" element = {<Saved />} />

        <Route path = "/profile" element = {<Profile />} />

        <Route path = '/updatePassword' element = {<UpdatePassword />} />

        <Route path = '/updateProfile' element = {<UpdateProfile />} />
   
      </Routes>

    </Router>

  )

}

export default App
