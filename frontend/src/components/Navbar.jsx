import React, { useContext, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import { TextField, Tooltip, Typography, Zoom } from '@mui/material';
import { useEffect } from 'react';
import { City, Country, State } from "country-state-city";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Box, Button, Menu } from '@mui/material';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs';



const Navbar = () => {

  const handleCountryChange = (event) => {
    const selectedCountry = event.target.value;
    setCountry(selectedCountry);  // Store selected country object
    setCountryCode(selectedCountry.isoCode);  // Extract and store ISO code
  };


  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setCountry("");
    setState("");
    setCity("");
  }


  let countryData = Country.getAllCountries();
  // console.log(countryData);

  const [stateData, setStateData] = useState("");
  const [cityData, setCityData] = useState("");

  const [country, setCountry] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");


  const token = window.localStorage.getItem('token');
  const { mode } = useContext(ThemeContext);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const [advancedSearchOpen, setAdvancedSearchOpen] = useState(false);
  const [advancedParams, setAdvancedParams] = useState({
    site: '',
    tbs: '',
  });

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const safeDayjs = (date) => (date ? dayjs(date) : null)
  const [isAdvancedSearchDisabled, setIsAdvancedSearchDisabled] = useState(false);
  const advancedSearchButtonRef = useRef(null);

  useEffect(() => {



    if ((startDate && !endDate) || (!startDate && endDate)) {
      setIsAdvancedSearchDisabled(true);
      return;
    }
    const isInvalid =
      (startDate && endDate && dayjs(startDate).isAfter(endDate)) || // Start date > End date
      (endDate && dayjs(endDate).isAfter(dayjs())); // End date > Current date

    setIsAdvancedSearchDisabled(isInvalid);
  }, [startDate, endDate]);


  useEffect(() => {
    setStateData(State.getStatesOfCountry(country?.isoCode));
    setCityData("");
  }, [country]);

  useEffect(() => {
    setCityData(City.getCitiesOfState(country?.isoCode, state?.isoCode));
  }, [state, country]);

  useEffect(() => {
    stateData && setState("");
  }, [stateData]);

  useEffect(() => {
    cityData && setCity("");
  }, [cityData]);



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
    console.log('Start Date:', startDate);
    let site = "";
    let tbs = "";

    if (advancedParams.site) {
      site = `&site=${encodeURIComponent(advancedParams.site)}`;
    }

    if (startDate && endDate) {
      tbs = `&tbs=cdr:1,cd_min:${startDate.$M + 1}/${startDate.$D}/${startDate.$y},cd_max:${endDate.$M + 1}/${endDate.$D}/${endDate.$y}`;
    }

    setAdvancedSearchOpen(false);
    navigate(`/search?q=${encodeURIComponent(searchQuery)}${site}${tbs}`);
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



                    <form
                      onSubmit={handleAdvancedSearch}
                      style={{
                        padding: '20px',
                        borderRadius: '8px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        backgroundColor: mode === 'light' ? '#ffffff' : '#495057',
                        color: mode === 'light' ? 'black' : 'white',
                        maxWidth: '800px', // Increase maximum width for the form
                        margin: '0 auto', // Center the form horizontally
                      }}
                    >
                      {/* Site Input Section */}
                      <Box
                        sx={{
                          marginBottom: '10px',
                          padding: '12px',
                          borderRadius: '8px',
                          backgroundColor: mode === 'light' ? '#f8f9fa' : '#343a40',
                          border: `1px solid ${mode === 'light' ? '#ced4da' : '#495057'}`,
                          textAlign: 'center',
                        }}
                      >
                        <label
                          htmlFor="site"
                          className="form-label"
                          style={{ color: mode === 'light' ? 'black' : 'white' }}
                        >
                          Site
                        </label>
                        <input
                          type="text"
                          id="site"
                          value={advancedParams.site}
                          onChange={(e) => setAdvancedParams({ ...advancedParams, site: e.target.value })}
                          style={{
                            border: '1px solid',
                            borderColor: mode === 'light' ? '#ced4da' : '#495057',
                            borderRadius: '4px',
                            padding: '8px',
                            width: '100%', // Keep input width at 100%
                            boxSizing: 'border-box',
                            color: mode === 'light' ? 'black' : 'white', // Input text color
                            backgroundColor: mode === 'light' ? '#fff' : '#495057', // Input background color
                          }}
                          // Placeholder color styling
                          placeholder="Enter site"
                          className={`placeholder-${mode === 'dark' ? 'dark' : 'light'} form-control`}
                        />
                        <style>
                          {`
        .placeholder-dark::placeholder {
          color: #bbb; /* Date range text color in dark mode */
        }
        .placeholder-light::placeholder {
          color: #888; /* Placeholder color in light mode */
        }
      `}
                        </style>
                      </Box>

                      {/* Date Range Section */}
                      <Box
                        sx={{
                          padding: '12px',
                          borderRadius: '8px',
                          backgroundColor: mode === 'light' ? '#f8f9fa' : '#343a40',
                          border: `1px solid ${mode === 'light' ? '#ced4da' : '#495057'}`,
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '8px',
                        }}
                      >
                        <Typography
                          variant="h6"
                          sx={{ color: mode === 'light' ? 'black' : 'white', fontSize: '1rem', textAlign: 'center' }}
                        >
                          Date Range
                        </Typography>

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          {/* Start Date Picker */}
                          <DatePicker
                            label="Start Date"
                            value={startDate}
                            maxDate={safeDayjs(endDate) || dayjs()}
                            onChange={(newValue) => setStartDate(newValue)}
                            renderInput={(params) => <TextField {...params} fullWidth />}
                          />

                          {/* End Date Picker */}
                          <DatePicker
                            label="End Date"
                            value={endDate}
                            minDate={safeDayjs(startDate)}
                            maxDate={dayjs()}
                            onChange={(newValue) => setEndDate(newValue)}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                inputProps={{ ...params.inputProps, readOnly: true }}
                                fullWidth
                              />
                            )}
                          />
                        </LocalizationProvider>
                      </Box>

                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={isAdvancedSearchDisabled}
                        sx={{
                          padding: '10px 20px',
                          textAlign: 'center',
                          justifyContent: 'center',
                          display: 'flex',
                          margin: '12px auto 0',
                          width: '80%', // Width for the button
                          borderRadius: '4px',
                          backgroundColor: isAdvancedSearchDisabled ? '#ced4da' : '#007bff',
                          color: 'white',
                          fontWeight: 'bold',
                          marginBottom: '-10px',
                        }}
                      >
                        Advanced Search
                      </Button>
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



      <Box
        sx={{
          fontFamily: "Quicksand",
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          padding: '10px 0',
          overflowX: 'auto', // Handles overflow on small screens
          backgroundColor: mode === 'dark' ? '#333' : 'rgb(230, 230, 230)', // Background color for both modes
          color: mode === 'dark' ? '#fff' : '#000', // Text color for both modes
        }}
      >
        <div>
          <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            endIcon={<KeyboardArrowDownRoundedIcon />}
            color='error'
            sx={{
              fontWeight: 'bold',
              fontSize: 'large',
              fontFamily: "Quicksand",
              color: mode === 'dark' ? 'rgb(255, 255, 255)' : '#000', // Button text color for both modes
            }}
          >
            Global
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            sx={{ p: 0 }}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-filled-label">Country</InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={country}
                onChange={handleCountryChange}
              >
                {countryData && countryData.map((country, index) => (
                  <MenuItem key={index} value={country}>{country.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-filled-label">State</InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={state}
                onChange={(e) => { setState(e.target.value) }}
              >
                {stateData && stateData.map((state, index) => (
                  <MenuItem key={index} value={state}>{state.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-filled-label">City</InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={city}
                onChange={(e) => { setCity(e.target.value) }}
              >
                {cityData && cityData.map((city, index) => (
                  <MenuItem key={index} value={city}>{city.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  // Add your search logic here
                  console.log('Search button clicked');
                  navigate(`/search?gl=${countryCode}&location=${city.name ? city.name : state.name ? state.name : ""}`);
                }}
                sx={{ fontWeight: "bold", fontSize: "large", borderRadius: 2, m: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', width: '80%' }}
              >
                Localized News
              </Button>
            </div>
          </Menu>
        </div>
        <div>
          <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            sx={{
              fontSize: 'large',
              fontFamily: "Quicksand",
              color: mode === 'dark' ? '#fff' : '#000', // Button text color for both modes
            }}
            onClick={() => {
              navigate(`/search?q=${encodeURIComponent('AI')}`);
            }
            }
          >
            AI
          </Button>
        </div>
        <div>
          <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            sx={{
              fontSize: 'large',
              fontFamily: "Quicksand",
              color: mode === 'dark' ? '#fff' : '#000', // Button text color for both modes
            }}
            onClick={() => {
              navigate(`/search?q=${encodeURIComponent('Finance')}`);
            }}
          >
            Finance
          </Button>
        </div>
        <div>
          <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            sx={{
              fontSize: 'large',
              fontFamily: "Quicksand",
              color: mode === 'dark' ? '#fff' : '#000', // Button text color for both modes
            }}
            onClick={() => {
              navigate(`/search?q=${encodeURIComponent('Tech')}`);
            }}
          >
            Tech
          </Button>
        </div>
        <div>
          <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            sx={{
              fontSize: 'large',
              fontFamily: "Quicksand",
              color: mode === 'dark' ? '#fff' : '#000', // Button text color for both modes
            }}
            onClick={() => {
              navigate(`/search?q=${encodeURIComponent('Education')}`);
            }}
          >
            Education
          </Button>
        </div>
        <div>
          <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            sx={{
              fontSize: 'large',
              fontFamily: "Quicksand",
              color: mode === 'dark' ? '#fff' : '#000', // Button text color for both modes
            }}
            onClick={() => {
              navigate(`/search?q=${encodeURIComponent('Entertainment')}`);
            }}
          >
            Entertainment
          </Button>
        </div>
        <div>
          <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            sx={{
              fontSize: 'large',
              fontFamily: "Quicksand",
              color: mode === 'dark' ? '#fff' : '#000', // Button text color for both modes
            }}
            onClick={() => {
              navigate(`/search?q=${encodeURIComponent('Climate Change')}`);
            }}
          >
            Climate Change
          </Button>
        </div>
        <div>
          <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            sx={{
              fontSize: 'large',
              fontFamily: "Quicksand",
              color: mode === 'dark' ? '#fff' : '#000', // Button text color for both modes
            }}
            onClick={() => {
              navigate(`/search?q=${encodeURIComponent('Society')}`);
            }}
          >
            Society
          </Button>
        </div>
        <div>
          <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            sx={{
              fontSize: 'large',
              fontFamily: "Quicksand",
              color: mode === 'dark' ? '#fff' : '#000', // Button text color for both modes
            }}
            onClick={() => {
              navigate(`/search?q=${encodeURIComponent('culture')}`);
            }}
          >
            culture
          </Button>
        </div>
        <div>
          <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            sx={{
              fontSize: 'large',
              fontFamily: "Quicksand",
              color: mode === 'dark' ? '#fff' : '#000', // Button text color for both modes
            }}
            onClick={() => {
              navigate(`/search?q=${encodeURIComponent('Sports')}`);
            }}
          >
            Sports
          </Button>
        </div>

        <div>
          <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            sx={{
              fontSize: 'large',
              fontFamily: "Quicksand",
              color: mode === 'dark' ? '#fff' : '#000', // Button text color for both modes
            }}
            onClick={() => {
              navigate(`/myfeed`);
            }}
          >
            MyFeed
          </Button>
        </div>
      </Box>


    </>
  );
};

export default Navbar;