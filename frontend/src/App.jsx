import React, {useEffect} from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Home from "./pages/Home"; // Assuming you have a Home component
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PageNotFound from './pages/PageNotFound';
import { AlertState } from './context/alert/alert'; // Import with a capital letter
import AlertDisplay from './components/AlertDisplay'; // Adjust the import path as needed
import { useNavigate } from 'react-router-dom';
import LoggedHome from './pages/LoggedHome';

function App() {
  const location = useLocation();
  const validRoutes = ['/', '/login', '/signup'];
  const hideNavbarRoutes = ['/login', '/signup'];

  const isValidRoute = validRoutes.includes(location.pathname);
  const shouldShowNavbar = isValidRoute && !hideNavbarRoutes.includes(location.pathname);

  const navigate = useNavigate();
  useEffect(() => {
    if (window.localStorage.getItem('token') === null) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <AlertState> {/* Use with a capital letter */}
      {shouldShowNavbar && <Navbar />}
      <AlertDisplay />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/loggedhome" element={<LoggedHome />} />
        
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </AlertState>
  );
}


export default App;