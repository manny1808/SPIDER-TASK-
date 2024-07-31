
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-links">
        <li>
          <Link to="/books">Books</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link to="/logIn">Login</Link>
        </li>
        <li>
          <Link to="/purchaseBooks">Purchase</Link>
        </li>
        <li>
          <Link to="/savedBooks">Saved-Books</Link>
        </li>
        
      </ul>
    </nav>
  );
};

export default Navbar;
