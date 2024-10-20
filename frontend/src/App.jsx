import LoggedHome from './pages/LoggedHome';
import SearchResults from './pages/SearchResults';
import { ThemeContextProvider, ThemeContext } from './context/ThemeContext';
import { IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useLocation, useSearchParams, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import PageNotFound from './pages/PageNotFound';
import MyFeed from './pages/MyFeed';
// eslint-disable-next-line
import React, { useRef } from 'react';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
// eslint-disable-next-line
import cursorImage from "./images/cursor3.png";
// import './CSS/App.css';
// const cursorImage = "https://img.freepik.com/premium-vector/cartoon-star-icon-vector-illustration_444196-1109.jpg?w=2000";

function App() {
  const location = useLocation();
  const validRoutes = ['/', '/login', '/signup', '/search', "/myfeed"];
  const hideNavbarRoutes = ['/login', '/signup'];

  const isValidRoute = validRoutes.includes(location.pathname.split('?')[0]);
  const shouldShowNavbar = isValidRoute && !hideNavbarRoutes.includes(location.pathname.split('?')[0]);

  const [searchParams] = useSearchParams();
  const queries = {
    q: searchParams.get('q'),
    site: searchParams.get('site'),
    tbs: searchParams.get('tbs'),
    gl: searchParams.get('gl'),
    location: searchParams.get('location'),
  };

  const theme = createTheme({
    typography: {
      fontFamily: 'Quicksand, Arial, sans-serif', // Set the global font family
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            fontFamily: 'Quicksand, Arial, sans-serif',
          },
        },
      },
    },
  });

  // eslint-disable-next-line
  const cursorRef = useRef(null);

  // Cursor movement within the viewport
  // useEffect(() => {
  //   const moveCursor = (e) => {
  //     const cursor = cursorRef.current;
  //     if (cursor) {
  //       requestAnimationFrame(() => {
  //         // Use fixed positioning so the cursor stays in place even during scrolling
  //         cursor.style.top = `${e.clientY}px`;
  //         cursor.style.left = `${e.clientX}px`;
  //       });
  //     }
  //   };

  //   window.addEventListener('mousemove', moveCursor);

  //   return () => window.removeEventListener('mousemove', moveCursor);
  // }, []);

  return (
    // <div className="App" style={{ position: 'relative', cursor: 'none' }}>
    <ThemeProvider theme={theme}>
      <ThemeContextProvider>

        {/* Custom Image Cursor */}

        {/* <img
          ref={cursorRef}
          src={cursorImage}
          alt="custom cursor"
          className="custom-cursor"
          style={{
            width: '30px',
            height: '30px',
            position: 'fixed', // Stay fixed relative to the viewport
            pointerEvents: 'none', // Prevents blocking clicks
            transition: 'transform 0.05s ease-out',
            zIndex: 999999,
            transform: "rotate(15deg)",
          }}
        /> */}
        {shouldShowNavbar && <Navbar />}
        {shouldShowNavbar  && < ThemeContext.Consumer >
          {({ toggleTheme, mode }) => {
            const isDarkMode = mode === 'dark';
        const buttonStyle = {
          position: 'fixed',
        top: 10,
        right: 10,
        backgroundColor: isDarkMode ? 'white' : 'black',
        color: isDarkMode ? 'black' : 'white',
        boxShadow:
        'rgba(255, 255, 255, 0.25) 0px 30px 60px -12px inset, rgba(206, 180, 180, 0.3) 0px 18px 36px -18px inset',
        zIndex: 999999999,
            };

        return (
        <IconButton onClick={toggleTheme} style={buttonStyle}>
          {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
        );
          }}
      </ThemeContext.Consumer>}
      <Routes>
        <Route
          path="/"
          element={
            window.localStorage.getItem('token') ? (
              <LoggedHome />
            ) : (
              <Home />
            )
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/search" element={<SearchResults queries={queries} />} />
        <Route path="/myfeed" element={<MyFeed />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </ThemeContextProvider>
    </ThemeProvider >
    // </div>
  );
}

export default App;
