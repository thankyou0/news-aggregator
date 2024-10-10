import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {alertContext} from '../context/alert/alert';

const Navbar = () => {
  const navigate = useNavigate();
  const { showAlert } = useContext(alertContext);
  const token = window.localStorage.getItem('token');
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    window.localStorage.removeItem('token');
    navigate('/');
    showAlert('Successfully logged out.', 'success');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">News Aggregator</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="#">Link</Link>
              </li>
            </ul>
            {token && (
              <form className="d-flex mx-auto" onSubmit={handleSearch}>
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search for topics"
                  aria-label="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="btn btn-outline-success" type="submit">Search</button>
              </form>
            )}
            <form className="d-flex">
              {token ? (
                <button className="btn btn-danger mx-1" onClick={handleLogout}>Logout</button>
              ) : (
                <>
                  <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
                  <Link className="btn btn-primary mx-1" to="/signup" role="button">Signup</Link>
                </>
              )}
            </form>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;