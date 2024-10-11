import AlertDisplay from './components/AlertDisplay';
import LoggedHome from './pages/LoggedHome';
import SearchResults from './pages/SearchResults';
import { ThemeContextProvider, ThemeContext } from './context/ThemeContext';
import { Button, IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useLocation, useSearchParams, Routes, Route } from 'react-router-dom';
import { AlertState } from './context/alert/alert';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import PageNotFound from './pages/PageNotFound';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';

function App() {

  // const theme = createTheme({
  //   palette: {
  //     mode: 'dark',
  //   },
  // });

  const location = useLocation();
  const validRoutes = ['/', '/login', '/signup', '/search'];
  const hideNavbarRoutes = ['/login', '/signup'];

  const isValidRoute = validRoutes.includes(location.pathname.split('?')[0]);
  const shouldShowNavbar = isValidRoute && !hideNavbarRoutes.includes(location.pathname.split('?')[0]);

  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');

  return (
    // <ThemeProvider theme={theme}>
      // <CssBaseline />
      <ThemeContextProvider>


        <AlertState>
          {shouldShowNavbar && <Navbar />}
          <ThemeContext.Consumer>
            {({ toggleTheme, mode }) => {
              const isDarkMode = mode === 'dark';
              const buttonStyle = {
                position: 'fixed',
                top: 10,
                right: 10,
                backgroundColor: isDarkMode ? 'white' : 'black',
                color: isDarkMode ? 'black' : 'white',
                boxShadow: "rgba(255, 255, 255, 0.25) 0px 30px 60px -12px inset, rgba(206, 180, 180, 0.3) 0px 18px 36px -18px inset"
              };

              return (
                <IconButton
                  onClick={toggleTheme}
                  style={buttonStyle}
                >
                  {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
              );
            }}
          </ThemeContext.Consumer>
          <AlertDisplay />
          <Routes>
            <Route path="/" element={window.localStorage.getItem('token') ? <LoggedHome /> : <Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/search" element={<SearchResults query={query} />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </AlertState>
      </ThemeContextProvider>
    // </ThemeProvider>
  );
}

export default App;