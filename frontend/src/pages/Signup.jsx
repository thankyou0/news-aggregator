import React, { useState, useContext } from 'react';
import { Container, TextField, Button, Typography, Box, MenuItem, Select, InputLabel, FormControl, CircularProgress } from '@mui/material';
// import { POST } from '../api'; // Adjust the import path as needed
import CryptoJS from 'crypto-js';
import config from '../config'; // Adjust the import path as needed
import { alertContext } from '../context/alert/alert';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ThemeContext } from '../context/ThemeContext';

const Signup = () => {
  const { toggleTheme } = useContext(ThemeContext);
  const [role, setRole] = useState('READER');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { showAlert } = React.useContext(alertContext);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData(e.target);

    const password = data.get('password');
    const encryptedPassword = CryptoJS.AES.encrypt(password, config.PWD_SECRET).toString();
    data.set('password', encryptedPassword);

    try {
      const result = await axios.post('http://localhost:9000/api/user/signup', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          "authorization": "Bearer " + localStorage.getItem("token")
        }
      });

      if (result.data.success) {
        window.localStorage.setItem('token', result.data.token);
        showAlert("Signup successfully", "success");
        navigate('/');
      } else {
        showAlert(result.data.message, "error");
      }
    } catch (error) {
      showAlert("Signup failed", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <>
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSignup} sx={{ mt: 3 }}>
          <TextField variant="outlined" margin="normal" required fullWidth id="username" label="Username" name="username" autoComplete="username" autoFocus />
          <TextField variant="outlined" margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" />
          <TextField variant="outlined" margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" />
          <FormControl fullWidth margin="normal">
            <InputLabel id="role-label">Role</InputLabel>
            <Select
              labelId="role-label"
              id="role"
              name="role"
              label="Role"
              defaultValue="READER"
              onChange={handleRoleChange}
            >
              <MenuItem value="READER">READER</MenuItem>
              <MenuItem value="PROVIDER">PROVIDER</MenuItem>
            </Select>
          </FormControl>
          {role === 'PROVIDER' && (
            <>
              <Typography variant="body2" align="left" margin="normal">
                Provide Certificate
              </Typography>
              <TextField
                name="certificate"
                type="file"
                fullWidth
                margin="normal"
                required
              />
            </>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Sign Up'}
          </Button>
          <Typography variant="body2" align="center" margin="normal">
            Already have an account?
          </Typography>
          <Button variant="text" color="primary" onClick={handleLoginRedirect} fullWidth>
            Go to Login
          </Button>
        </Box>
      </Box>
    </Container>
    </>
  );
};

export default Signup;