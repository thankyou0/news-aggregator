import React, { useState } from 'react';
import { Routes, Route, useLocation, useSearchParams } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box, CssBaseline, AppBar } from '@mui/material';
import SidebarNavigation from './components/SidebarNavigation'; // Import the sidebar
import Navbar from './components/Navbar';
import LoggedHome from './pages/LoggedHome';
import SearchResults from './pages/SearchResults';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import MyFeed from './pages/MyFeed';
import Bookmark from './pages/Bookmark.jsx';
import PageNotFound from './pages/PageNotFound';
import { ThemeContextProvider, ThemeContext } from './context/ThemeContext';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import IconButton from '@mui/material/IconButton';
import UserProfile from './pages/UserProfile';
import NewsProviderPage from './pages/NewsProviderPage.jsx';
import QuizApp from './components/QuizApp.jsx';
import History from './pages/History'; // Import the history page
import ProviderPage from './pages/ProviderPage.jsx';
const theme = createTheme({
  typography: {
    fontFamily: 'Quicksand, Arial, sans-serif',
  },
});


function App() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const validRoutes = ['/', '/login', '/signup', '/search', '/myfeed', '/history','/account', '/bookmark', '/providers/all', '/providers/following'];
  const hideNavbar_SidebarRoutes = ['/login', '/signup'];

  const shouldShowNavbar_Sidebar =
    validRoutes.includes(location.pathname.split('?')[0]) &&
    !hideNavbar_SidebarRoutes.includes(location.pathname.split('?')[0]);

  const [searchParams] = useSearchParams();
  const queries = {
    q: searchParams.get('q'),
    site: searchParams.get('site'),
    tbs: searchParams.get('tbs'),
    gl: searchParams.get('gl'),
    location: searchParams.get('location'),
  };



  return (
    <ThemeProvider theme={theme}>
      <ThemeContextProvider>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />

          <Box sx={{ zIndex: (theme) => theme.zIndex.appBar + 2 }}>
            {shouldShowNavbar_Sidebar && <SidebarNavigation open={open} setOpen={setOpen} />}
          </Box>

          <Box component="main" sx={{
            flexGrow: 1,
            ml: `${open ? '-120px' : '60px'}`,
            padding: '24px',
            position: 'relative',
          }}>
            <AppBar
              position="fixed"
              sx={{
                top: 0,
              }}
            >
              <Box sx={{ marginLeft: "60px" }}>
                {shouldShowNavbar_Sidebar && <Navbar />} {/* Show Navbar conditionally */}
              </Box>
            </AppBar>

            {shouldShowNavbar_Sidebar && (
              <ThemeContext.Consumer>
                {({ toggleTheme, mode }) => (
                  <IconButton
                    onClick={toggleTheme}
                    sx={{
                      position: 'fixed',
                      top: 10,
                      right: 10,
                      backgroundColor: mode === 'dark' ? 'white' : 'black',
                      color: mode === 'dark' ? 'black' : 'white',
                      zIndex: 999999999,
                    }}
                  >
                    {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                  </IconButton>
                )}
              </ThemeContext.Consumer>
            )}

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
              <Route path="/account" element={<UserProfile />} />
              <Route path="/bookmark" element={<Bookmark />} />
              <Route path="/providers/all" element={<NewsProviderPage provider={"all"} />} />
              <Route path="/providers/following" element={<NewsProviderPage provider={"following"} />} />
              <Route path="/providers/create" element={<ProviderPage/>} />
              <Route path="*" element={<PageNotFound />} />
              <Route path="/quiz" element={<QuizApp />} />
              <Route path="/history" element={<History />} />
              {/* <Route path */}
            </Routes>
          </Box>
        </Box>
      </ThemeContextProvider>
    </ThemeProvider>
  );
}

export default App;

