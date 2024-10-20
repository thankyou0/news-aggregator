// import React, { useState } from 'react';
// import { Container, TextField, Button, Typography, Box, MenuItem, Select, InputLabel, FormControl, CircularProgress } from '@mui/material';
// // import { POST } from '../api'; // Adjust the import path as needed
// import CryptoJS from 'crypto-js';
// import config from '../config'; // Adjust the import path as needed
// import { alertContext } from '../context/alert/alert';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const Signup = () => {
//   const [role, setRole] = useState('READER');
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();
//   const { showAlert } = React.useContext(alertContext);

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     const data = new FormData(e.target);

//     const password = data.get('password');
//     const encryptedPassword = CryptoJS.AES.encrypt(password, config.PWD_SECRET).toString();
//     data.set('password', encryptedPassword);

//     try {
//       const result = await axios.post('http://localhost:9000/api/user/signup', data, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           "authorization": "Bearer " + localStorage.getItem("token")
//         }
//       });

//       if (result.data.success) {
//         window.localStorage.setItem('token', result.data.token);
//         showAlert("Signup successfully", "success");
//         navigate('/');
//       } else {
//         showAlert(result.data.message, "error");
//       }
//     } catch (error) {
//       showAlert("Signup failed", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRoleChange = (e) => {
//     setRole(e.target.value);
//   };

//   const handleLoginRedirect = () => {
//     navigate('/login');
//   };

//   return (
//     <>
//     <Container maxWidth="sm">
//       <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//         <Typography component="h1" variant="h5">
//           Sign Up
//         </Typography>
//         <Box component="form" onSubmit={handleSignup} sx={{ mt: 3 }}>
//           <TextField variant="outlined" margin="normal" required fullWidth id="username" label="Username" name="username" autoComplete="username" autoFocus />
//           <TextField variant="outlined" margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" />
//           <TextField variant="outlined" margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" />
//           <FormControl fullWidth margin="normal">
//             <InputLabel id="role-label">Role</InputLabel>
//             <Select
//               labelId="role-label"
//               id="role"
//               name="role"
//               label="Role"
//               defaultValue="READER"
//               onChange={handleRoleChange}
//             >
//               <MenuItem value="READER">READER</MenuItem>
//               <MenuItem value="PROVIDER">PROVIDER</MenuItem>
//             </Select>
//           </FormControl>
//           {role === 'PROVIDER' && (
//             <>
//               <Typography variant="body2" align="left" margin="normal">
//                 Provide Certificate
//               </Typography>
//               <TextField
//                 name="certificate"
//                 type="file"
//                 fullWidth
//                 margin="normal"
//                 required
//               />
//             </>
//           )}
//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             color="primary"
//             sx={{ mt: 3, mb: 2 }}
//             disabled={loading}
//           >
//             {loading ? <CircularProgress size={24} /> : 'Sign Up'}
//           </Button>
//           <Typography variant="body2" align="center" margin="normal">
//             Already have an account?
//           </Typography>
//           <Button variant="text" color="primary" onClick={handleLoginRedirect} fullWidth>
//             Go to Login
//           </Button>
//         </Box>
//       </Box>
//     </Container>
//     </>
//   );
// };

// export default Signup;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useAuth }  from "../context/auth";
import { toast } from "react-hot-toast";
import axios from "axios";
import config from '../config'; // Adjust the import path as needed
import CryptoJS from 'crypto-js';
import PersonIcon from "@mui/icons-material/Person";
import VpnKeyRoundedIcon from "@mui/icons-material/VpnKeyRounded";
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import {
  InputAdornment,
  IconButton,
  Grid,
  Typography,
  Button,
  TextField,
  Avatar,
  CircularProgress,
  FormControl,
  Select,
  MenuItem,
  InputLabel
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InfoIcon from "@mui/icons-material/Info";
import image1 from "../images/bg2.jpg";

export default function Register() {
  // axios.defaults.withCredentials = true;
  const [loading, setloading] = useState(false);
  const [justVerify, setJustVerify] = useState(false);
  const [validPassword, setValidPassword] = useState(false);

  const handlePasswordofLogin = (e) => {
    const input = e.target.value;
    setPassword(input);
    if (input.length < 8) {
      setValidPassword(false);
      return;
    } else {
      setValidPassword(true);
    }
  };
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("READER");
  const [showPassword, setShowPassword] = useState(false);
  const [errorEmailId, setErrorEmailId] = useState(false);

  const [selectedFile, setSelectedFile] = useState(null);

  // Function to handle file selection
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const navigate = useNavigate();
  // const { validateUser, isLoggedIn } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setJustVerify(true);

    if (
      errorEmailId ||
      username === "" ||
      email === "" ||
      !validPassword ||
      role === "" ||
      username.length >= 255 ||
      email.length >= 255 ||
      password.length >= 255
    ) {
      toast("Please fill out all fields correctly.", {
        icon: <InfoIcon />,
      });
      return;
    }

    setloading(true);
    const data = new FormData();
    data.append("username", username);
    data.append("email", email);
    data.append("role", role);
    data.append("certificate", selectedFile);

    const encryptedPassword = CryptoJS.AES.encrypt(password, config.PWD_SECRET).toString();
    data.append('password', encryptedPassword);

    try {

      const result = await axios.post(`${config.BACKEND_API}/api/user/signup`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          "authorization": "Bearer " + localStorage.getItem("token")
        }
      });
      console.log(result.data);

      if (result.data.success) {
        window.localStorage.setItem('token', result.data.token);
        toast.success("Signup successfully");
        navigate('/');
      } else {
        toast.error(result.data.message);
      }
    } catch (error) {
      toast.error("Signup failed");
    } finally {
      setloading(false);
    }

  };

  return (
    <>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{
          minHeight: "100vh",
          padding: { xs: 2, sm: 3, md: 5 },
          background: `url(${image1}) no-repeat bottom center fixed`,
          backgroundSize: "cover",
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          backdropFilter: "blur(10px)",
          backgroundColor: "transparent",
        }}
      >
        <Grid
          item
          xs={12}
          sm={8}
          md={6}
          lg={4}
          xl={4}
          sx={{
            borderRadius: "16px",
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            backdropFilter: "blur(16px)",
            backgroundColor: "transparent",
          }}
        >
          <Grid
            item
            margin={0}
            padding={2}
            container
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Avatar sx={{ backgroundColor: "#25396F", mb: 1 }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography variant="h5" fontWeight="bold" sx={{
              fontFamily: "'Quicksand', 'Arial', sans-serif",
            }}>
              Create A New Account
            </Typography>
          </Grid>
          <Grid
            container
            component="form"
            onSubmit={handleSubmit}
            spacing={2}
            padding={2}
          >

            <Grid item xs={12}>
              <TextField
                value={username}
                onChange={(e) => {
                  const value = e.target.value;
                  setUsername(value);
                }}
                id="username"
                label="User Name"
                placeholder="username"
                variant="outlined"
                fullWidth
                required
                size="small"
                error={
                  justVerify &&
                  (username === "" || username.length >= 255)
                }
                helperText={
                  justVerify &&
                  (username === ""
                    ? "This field cannot be empty."
                    : "")
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon color="success" />
                    </InputAdornment>
                  ),
                  style: { fontFamily: "'Quicksand', 'Arial', sans-serif" }, // Use style for InputProps
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 25,
                    fontWeight: "bold",
                  },
                  "& label": {
                    fontFamily: "'Quicksand', 'Arial', sans-serif", // Apply font family to label
                  },
                  "& .MuiInputBase-input": {
                    fontFamily: "'Quicksand', 'Arial', sans-serif", // Apply font family to the input
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={email}
                onChange={(e) => {
                  const value = e.target.value;
                  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                  setEmail(value);
                  setErrorEmailId(!emailRegex.test(value));
                }}
                id="email"
                label="Email Address"
                placeholder="abc@gmail.com"
                variant="outlined"
                fullWidth
                required
                size="small"
                error={
                  justVerify &&
                  (email === "" || email.length >= 255 || errorEmailId)
                }
                helperText={
                  justVerify &&
                  (email === ""
                    ? "This field cannot be empty."
                    : errorEmailId
                      ? "Please, enter valid email id"
                      : "")
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailRoundedIcon color="success" />
                    </InputAdornment>
                  ),
                  style: { fontFamily: "'Quicksand', 'Arial', sans-serif" }, // Use style for InputProps
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 25,
                    fontWeight: "bold",
                  },
                  "& label": {
                    fontFamily: "'Quicksand', 'Arial', sans-serif", // Apply font family to label
                  },
                  "& .MuiInputBase-input": {
                    fontFamily: "'Quicksand', 'Arial', sans-serif", // Apply font family to the input
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={password}
                onChange={handlePasswordofLogin}
                id="password"
                label="Password"
                placeholder="e.g. 12345678"
                variant="outlined"
                name="password"
                type={showPassword ? "text" : "password"}
                fullWidth
                required
                size="small"
                error={
                  justVerify &&
                  (!validPassword || password === "" || password.length >= 255)
                }
                helperText={
                  justVerify &&
                  (password === ""
                    ? "This field cannot be empty."
                    : !validPassword
                      ? "The password must contain at least 8 characters."
                      : "")
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <VpnKeyRoundedIcon color="success" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? (
                          <Visibility color="success" />
                        ) : (
                          <VisibilityOff color="success" />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 25,
                    fontWeight: "bold",
                  },
                  "& label": {
                    fontFamily: "'Quicksand', 'Arial', sans-serif", // Apply font family to label
                  },
                  "& .MuiInputBase-input": {
                    fontFamily: "'Quicksand', 'Arial', sans-serif", // Apply font family to the input
                  },
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl size="small" fullWidth>
                <InputLabel id="role-label" color="success">
                  Role
                </InputLabel>
                <Select
                  color="success"
                  labelId="role-label"
                  id="role"
                  label="Role"
                  value={role}
                  onChange={(e) => { setRole(e.target.value); }}
                  sx={{
                    borderRadius: 25,
                    fontWeight: "bold",
                    "& .MuiSelect-select": {
                      fontFamily: "'Quicksand', 'Arial', sans-serif", // Apply font family to the selected value
                    },
                    "& .MuiInputLabel-root": {
                      fontFamily: "'Quicksand', 'Arial', sans-serif", // Apply font family to the label
                    },
                  }}
                  startAdornment={
                    <InputAdornment position="start">
                      <PeopleAltRoundedIcon color="success" />
                    </InputAdornment>
                  }
                >

                  <MenuItem value="READER" sx={{
                    fontFamily: "'Quicksand', 'Arial', sans-serif",

                  }}>READER</MenuItem>
                  <MenuItem value="PROVIDER" sx={{
                    fontFamily: "'Quicksand', 'Arial', sans-serif",

                  }}>PROVIDER</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              {role === 'PROVIDER' && (
                <>
                  <Typography variant="body2" align="left" sx={{
                    fontFamily: "'Quicksand', 'Arial', sans-serif",
                  }}>
                    Provide Certificate
                  </Typography>
                  <TextField
                    type="file"
                    fullWidth
                    required
                    onChange={handleFileChange}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 3,
                        fontWeight: "bold",
                      },
                      "& label": {
                        fontFamily: "'Quicksand', 'Arial', sans-serif", // Apply font family to label
                      },
                      "& .MuiInputBase-input": {
                        fontFamily: "'Quicksand', 'Arial', sans-serif", // Apply font family to the input
                      },
                    }}
                  />
                </>
              )}
            </Grid>

            <Grid item xs={12}>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                sx={{
                  position: "relative",
                  fontWeight: "bold",
                  borderRadius: "12px",
                  backgroundColor: "#02294F",
                  fontFamily: "'Quicksand', 'Arial', sans-serif",
                  color: "white",
                  "&:hover": {
                    color: "white",
                    backgroundColor: "#25396F",
                  },
                }}
              >
                {!loading ? "Sign Up" : "Signing Up"}
                {loading && <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>}
                {loading && (
                  <CircularProgress
                    size={20}
                    sx={{
                      color: "white",
                      right: 0,
                    }}
                  />
                )}
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                color="success"
                variant="text"
                onClick={() => {
                  navigate("/login");
                }}
                sx={{
                  fontWeight: "bold",
                  textDecoration: "underline",
                  fontFamily: "'Quicksand', 'Arial', sans-serif",

                }}
              >
                Already have an account? Sign In
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}