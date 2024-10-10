import React from 'react';
import { Routes, Route, useLocation, useSearchParams } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Home from "./pages/Home"; // Assuming you have a Home component
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PageNotFound from './pages/PageNotFound';
import { AlertState } from './context/alert/alert'; // Import with a capital letter
import AlertDisplay from './components/AlertDisplay'; // Adjust the import path as needed
import LoggedHome from './pages/LoggedHome';
import SearchResults from './pages/SearchResults';

function App() {
  const location = useLocation();
  const validRoutes = ['/', '/login', '/signup', '/search'];
  const hideNavbarRoutes = ['/login', '/signup'];


  const isValidRoute = validRoutes.includes(location.pathname.split('?')[0]);
  const shouldShowNavbar = isValidRoute && !hideNavbarRoutes.includes(location.pathname.split('?')[0]);
  

  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');

  
  return (
    <AlertState>
      {shouldShowNavbar && <Navbar />}
      <AlertDisplay />
      <Routes>
        <Route path="/" element={window.localStorage.getItem('token') ? <LoggedHome /> : <Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/search" element={<SearchResults query={query} />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </AlertState>
  );
}

export default App;