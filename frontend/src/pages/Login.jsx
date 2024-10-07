import React, { useContext } from 'react';
import { alertContext } from '../context/alert/alert'; // Adjust the import path as needed
import CryptoJS from 'crypto-js';
import config from '../config'; // Adjust the import path as needed
import { POST } from '../api'; // Adjust the import path as needed
import { Container, Box, TextField, Button, Typography, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const navigate = useNavigate();
  const { showAlert } = useContext(alertContext);

  const handleLogin = async (e) => {

    e.preventDefault();
    const data = new FormData(e.target);
    const role = data.get('role');
    const email = data.get('email');
    const password = data.get('password');

    const encryptedPassword = CryptoJS.AES.encrypt(password, config.PWD_SECRET).toString();

    const loginDetails = {
      role,
      email,
      password: encryptedPassword
    };

    const result = await POST('/api/user/login', loginDetails);

    if (result.data.success) {
      window.localStorage.setItem('token', result.data.token);
      showAlert("Logged in successfully", "success");
      navigate('/');      
    }
    else {
      showAlert(result.data.message, "error");
    }
  };

  const handleSignupRedirect = () => {
    navigate('/signup');
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
          <FormControl fullWidth margin="normal">
            <InputLabel id="role-label">Role</InputLabel>
            <Select
              labelId="role-label"
              id="role"
              name="role"
              label="Role"
              defaultValue="READER"
            >
              <MenuItem value="READER">READER</MenuItem>
              <MenuItem value="PROVIDER">PROVIDER</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Log In
          </Button>
          <Typography variant="body2" align="center" margin="normal">
            Don't have an account?
          </Typography>
          <Button variant="text" color="primary" onClick={handleSignupRedirect} fullWidth>
            Go to Signup
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;