import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

const NewsCard = (props) => {



  const handleClick = () => {
    window.open(props.link, '_blank');
  };

  // console.log(props.imageURL);


  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', maxWidth: 800, margin: '20px auto', border: '1px solid #e0e0e0' }}>
      <Box sx={{ display: 'flex', flexDirection: 'row', flex: '1' }}>
        <CardContent sx={{ flex: '1' }}>
          {/* <Typography variant="subtitle3" component="div" gutterBottom>
          </Typography> */}
          <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", width: "100%", height: "40px", overflow: "hidden"  // Ensures that images don't overflow their container
          }}>
            <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "flex-start", alignItems: "center"
            }}>
              {props.providerImg && (
                <img src={props.providerImg} alt="Provider Logo" style={{   maxWidth: "100%",   maxHeight: "80%",   width: "auto",   height: "auto",   objectFit: "contain" }}/>
              )}
            </div>
          </div>

          <Typography
            variant="h6"
            component="div"
            gutterBottom
            onClick={handleClick}
            style={{ cursor: 'pointer' }}
          >
            {props.title}
          </Typography>
        </CardContent>
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