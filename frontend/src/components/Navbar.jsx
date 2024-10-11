import React, { useContext, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import { Tooltip, Zoom } from '@mui/material';

const Navbar = () => {
  const token = window.localStorage.getItem('token');
  const { mode } = useContext(ThemeContext);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const [advancedSearchOpen, setAdvancedSearchOpen] = useState(false);
  const [advancedParams, setAdvancedParams] = useState({
    site: '',
    last_update: '',
  });

  // Reference for the advanced search button
  const advancedSearchButtonRef = useRef(null);

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

  const handleAdvancedSearch = (e) => {
    e.preventDefault();
    console.log('Advanced Search:', searchQuery, advancedParams);
    setAdvancedSearchOpen(false);
    navigate(`/search?q=${encodeURIComponent(searchQuery)}&site=${encodeURIComponent(advancedParams.site)}&last_update=${encodeURIComponent(advancedParams.last_update)}`);
  };

  // Get the position of the advanced search button
  const getAdvancedSearchBoxStyle = () => {
    if (advancedSearchButtonRef.current) {
      const rect = advancedSearchButtonRef.current.getBoundingClientRect();
      return {
        position: 'absolute',
        top: `${rect.bottom + window.scrollY + 9.02}px`,
        left: `${rect.left + window.scrollX - 87}px`,
        backgroundColor: mode === 'light' ? '#ddd5d5' : '#595353',
        padding: '20px',
        boxShadow: '0px 4px 8px rgba(0,0,0,0.1)',
        zIndex: 1000,
        width: '300px',  // You can adjust the width of the box here
      };
    }
    return {};
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
              <div>
                <form className="d-flex mx-auto" onSubmit={handleSearch} style={{ flexGrow: 1, justifyContent: 'center' }}>
                  <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search for topics"
                    aria-label="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ maxWidth: '300px' }}
                  />
                  <div className="btn-group">
                    <button className="btn btn-outline-success btn-sm" type="submit" style={{ backgroundColor: "lightgreen" }}>
                      Search
                    </button>
                    <Tooltip title="Advanced Search" placement='top' TransitionComponent={Zoom} arrow>
                      <button
                        ref={advancedSearchButtonRef} // Reference the advanced search button
                        type="button"
                        className="btn btn-sm btn-secondary dropdown-toggle dropdown-toggle-split"
                        onClick={() => setAdvancedSearchOpen(!advancedSearchOpen)}
                        aria-expanded="false"
                        style={{ backgroundColor: "lightgreen" }}
                      >
                        <span className="visually-hidden">Toggle Dropdown</span>
                      </button>
                    </Tooltip>
                    <ul className="dropdown-menu">
                      <li>
                        <button className="dropdown-item" onClick={() => setAdvancedSearchOpen(true)}>
                          Advanced
                        </button>
                      </li>
                    </ul>
                  </div>
                </form>

                {advancedSearchOpen && (
                  <div className="advanced-search-box" style={getAdvancedSearchBoxStyle()}>
                    <h3 style={{ color: mode === 'light' ? 'black' : 'white', textAlign: "center" }}> Advanced Search</h3>
                    <IconButton
                      style={{ position: 'absolute', top: '0px', right: '0px' }}
                      onClick={() => setAdvancedSearchOpen(false)}
                    >
                      <ClearIcon onClick={() => setAdvancedSearchOpen(false)} />
                    </IconButton>
                    <form onSubmit={handleAdvancedSearch}>
                      <div className="mb-3">
                        <label htmlFor="site:" className="form-label" style={{ color: mode === 'light' ? 'black' : 'white' }}>Site</label>
                        <input
                          type="text"
                          className="form-control"
                          id="site"
                          value={advancedParams.site}
                          onChange={(e) => setAdvancedParams({ ...advancedParams, site: e.target.value })}
                          placeholder="Enter site"
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="last_update" className="form-label" style={{ color: mode === 'light' ? 'black' : 'white' }}>
                          Last Update
                        </label>
                        <select
                          className="form-control"
                          id="last_update"
                          value={advancedParams.last_update}
                          onChange={(e) => setAdvancedParams({ ...advancedParams, last_update: e.target.value })}
                          style={{ cursor: 'pointer', padding: '10px', backgroundImage: 'url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0Ij4KICA8cGF0aCBmaWxsPSIjN0U3RTdFIiBkPSJNMTIgMTYuN2wtNi01LjVMMTIgNS45bDYgNS41eiIvPgo8L3N2Zz4=)', backgroundPosition: 'right 10px center', backgroundRepeat: 'no-repeat', backgroundSize: '12px' }}
                        >
                          <option value="Anytime" selected>Anytime</option>
                          <option value="24 hours">24 hours</option>
                          <option value="Upto a Week ago">Upto a Week ago</option>
                          <option value="Upto a Month ago">Upto a Month ago</option>
                          <option value="Upto a Year ago">Upto a Year ago</option>
                        </select>
                      </div>

                      <button type="submit" className="btn btn-primary">Advanced Search</button>
                    </form>
                  </div>
                )}
              </div>
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
          </div>
        </div>
        <div style={afterStyle}></div>
      </nav>
    </>
  );
};

export default Navbar;
