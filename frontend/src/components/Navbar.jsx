import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';

const Navbar = () => {
  const { mode} = useContext(ThemeContext);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const token = window.localStorage.getItem('token');

  const handleLogout = () => {
    window.localStorage.removeItem('token');
    navigate('/login');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const navbarStyle = {
    position: 'relative',
    backgroundColor: mode === 'dark' ? '#f0f0f0' : '#2c2c2c',
    backdropFilter: "blur(10px)",
  };

  const afterStyle = {
    content: '""',
    position: 'absolute',
    top: 0,
    right: 0,
    width: '20%',
    height: '100%',
    zIndex: -1,
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg" style={navbarStyle}>
        <div className="container-fluid">
          <Link className={`navbar-brand ${mode === 'dark' ? 'text-dark' : 'text-light'}`} to="/">News Aggregator</Link>

          <div className="collapse navbar-collapse justify-content-between" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link active ${mode === 'dark' ? 'text-dark' : 'text-light'}`} aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${mode === 'dark' ? 'text-dark' : 'text-light'}`} to="#">Link</Link>
              </li>
            </ul>
            {token && (
              <form className="d-flex mx-auto" onSubmit={handleSearch} style={{ flexGrow: 1, justifyContent: 'center' }}>
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search for topics"
                  aria-label="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ maxWidth: '300px' }} // Optional: limit the width of the search input
                />
                <button className="btn btn-outline-success" type="submit">Search</button>
              </form>
            )}
            <form className="d-flex mx-5">
              {token ? (
                <button className="btn btn-danger mx-1" onClick={handleLogout}>Logout</button>
              ) : (
                <>
                  <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
                  <Link className="btn btn-primary mx-1" to="/signup" role="button">Signup</Link>
                </>
              )}
            </form>
            {/* <div style={{ flexGrow: 1 }}></div> This div will take up remaining space */}
            
          </div>
        </div>
        <div style={afterStyle}></div>
      </nav>
    </>
  );
};

export default Navbar;