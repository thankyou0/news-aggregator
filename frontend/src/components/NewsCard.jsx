import React from 'react';
import { useLocation } from 'react-router-dom';
import { Card, CardContent, Typography, Box, Tooltip, Zoom } from '@mui/material';
import { ThemeContext } from '../context/ThemeContext';
import { useContext } from 'react';


const NewsCard = (props) => {

  const { mode } = useContext(ThemeContext);


  const handleClick = () => {
    window.open(props.link, '_blank');
  };

  const location = useLocation();
  const isSearchPage = location.pathname === '/search';

  // <Card sx={{ display: 'flex', flexDirection: 'column', maxWidth: 800, margin: '20px auto', border: '1px solid #e0e0e0' }}>
  //   <Box sx={{ display: 'flex', flexDirection: 'row', flex: '1' }}>
  //     <CardContent sx={{ flex: '1' }}>
  //       <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", width: "100%", height: "40px", overflow: "hidden" }}>
  //         <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
  //           {props.providerImg && (
  //             <img src={props.providerImg} alt="Provider Logo" style={{ maxWidth: "100%", maxHeight: "80%", width: "auto", height: "auto", objectFit: "contain" }} />
  //           )}
  //         </div>
  //       </div>
  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        maxWidth: 800,
        margin: '20px auto',
        border: 'none',        // No border
        boxShadow: 'none',
        backgroundColor: mode==="light"? "rgb(250, 250, 250)": "rgb(50, 50, 50)", // Change background color based on theme
        "&:hover": { backgroundColor: mode === "light" ? "rgb(240, 240, 240)" : "rgb(60, 60, 60)" },
        // Remove box-shadow (which might appear like a border)
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'row', flex: '1' }}>
        <CardContent sx={{ flex: '1' }}>
          <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", width: "100%", height: "40px", overflow: "hidden" }}>
            {isSearchPage ? (
              <div style={{ display: "flex", alignItems: "center" }}>
                {props.providerImg && (
                  <img src={props.providerImg} alt="Provider Logo" style={{ maxWidth: "40px", maxHeight: "40px", width: "auto", height: "auto", objectFit: "contain" }} />
                )}
                {props.providerName && (
                  <Typography variant="subtitle2" color="text.secondary" style={{ marginLeft: '10px' }}>
                    {props.providerName}
                  </Typography>
                )}
              </div>
            ) : (
              <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
                {props.providerImg && (
                  <img src={props.providerImg} alt="Provider Logo" style={{ maxWidth: "100%", maxHeight: "80%", width: "auto", height: "auto", objectFit: "contain" }} />
                )}
              </div>
            )}
          </div>

          <Tooltip title="click" placement='top' TransitionComponent={Zoom} arrow>

            <Typography
              variant="h6"
              component="div"
              gutterBottom
              onClick={handleClick}
              sx={{ cursor: 'pointer', color: 'rgb(30, 144, 255)', "&:hover": { color: mode==="light"? "blue": "white" } }} // Change color to red when clicked
            >
              {props.title}
            </Typography>

          </Tooltip>

          {props.someText && (
            <Typography variant="body2" color="text.secondary">
              {props.someText}
            </Typography>
          )}
        </CardContent>
        {props.imgURL && (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 2 }}>
            <img src={props.imgURL} alt="Article" style={{ maxWidth: "150px", maxHeight: "150px", objectFit: "cover" }} />
          </Box>
        )}
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', pl: 2, mt: -1 }}>
        <Typography variant="caption" color="text.secondary">
          {props.time}
        </Typography>
      </Box>
    </Card>
  );
};

export default NewsCard;
