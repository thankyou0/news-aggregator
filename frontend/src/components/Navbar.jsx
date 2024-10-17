import React, { useContext, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import { Tooltip, Zoom } from '@mui/material';
import { useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";



const Navbar = () => {



  const token = window.localStorage.getItem('token');
  const { mode } = useContext(ThemeContext);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const [advancedSearchOpen, setAdvancedSearchOpen] = useState(false);
  const [advancedParams, setAdvancedParams] = useState({
    site: '',
    tbs: '',
  });


  const [startDate, setStartDate] = useState({});
  const [endDate, setEndDate] = useState({});

  // console.log(startDate, endDate);

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
    navigate(`/search?q=${encodeURIComponent(searchQuery)}&site=${encodeURIComponent(advancedParams.site)}&tbs=cdr%3A1%2Ccd_min%3A${startDate.month}%2F${startDate.day}%2F${startDate.year}%2Ccd_max%3A${endDate.month}%2F${endDate.day}%2F${endDate.year}`);
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
        zIndex: 2000,
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
            
            {token && (<>
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


                      <button type="submit" className="btn btn-primary">Advanced Search</button>
                    </form>
                  </div>
                )}
              </div>
            </>)}
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





// https://www.bing.com/search?pglt=2083&q=afghanistan+news&cvid=54f3237ac34d4bab8d7d5ee36d1640c1&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIGCAEQLhhAMgYIAhAAGEAyBggDEC4YQDIGCAQQLhhAMgYIBRAuGEAyBggGEAAYQDIGCAcQABhAMgYICBAAGEDSAQgyMjE4ajBqMagCALACAA&FORM=ANNTA1&PC=HCTS
// https://www.google.com/search?as_q=cricket&as_epq=&as_oq=&as_eq=&as_nlo=&as_nhi=&lr=&cr=countryDZ&as_qdr=all&as_sitesearch=&as_occt=any&as_filetype=&tbs=