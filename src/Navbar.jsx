import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ onSearch }) {
  const [input, setInput] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() !== '') {
      onSearch(input);
      navigate('/'); 
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-content container">
        <Link to="/" className="logo">Box<span>D</span></Link>
        
        <div className="nav-links">
          <Link to="/profile">Profile</Link>
          <Link to="/">Browse</Link>
          <Link to="/">Random</Link> 
        </div>

        <form onSubmit={handleSubmit} className="search-form">
          <input
            type="text"
            placeholder="Search for a show..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoComplete="off"
          />
          <button type="submit">Search</button>
        </form>
      </div>
    </nav>
  );
}

export default Navbar;