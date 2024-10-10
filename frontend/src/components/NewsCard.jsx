import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

const NewsCard = (props) => {
  const handleClick = () => {
    window.open(props.link, '_blank');
  };

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        maxWidth: 800,
        margin: '20px auto',
        border: 'none',        // No border
        boxShadow: 'none'      // Remove box-shadow (which might appear like a border)
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'row', flex: '1' }}>
        <CardContent sx={{ flex: '1' }}>
          <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", width: "100%", height: "40px", overflow: "hidden" }}>
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
          </div>

          <Typography
            variant="h6"
            component="div"
            gutterBottom
            onClick={handleClick}
            style={{ cursor: 'pointer', color: '#1E90FF' }} // DodgerBlue color
          >
            {props.title}
          </Typography>

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
