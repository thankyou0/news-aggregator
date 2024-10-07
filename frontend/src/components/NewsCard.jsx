import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';

const NewsCard = () => {
  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', maxWidth: 800, margin: '20px auto', border: '1px solid #e0e0e0' }}>
      <Box sx={{ display: 'flex', flexDirection: 'row', flex: '1' }}>
        <CardContent sx={{ flex: '1' }}>
          <Typography variant="subtitle3" component="div" gutterBottom>
            Hindustan Times
          </Typography>
          <Typography variant="h6" component="div" gutterBottom>
            Hamas attack 1st anniversary: What happened on October 7? How Israel responded | Explained in 10 points
          </Typography>
        </CardContent>
        <CardMedia
          component="img"
          sx={{ width: 150 }}
          image="https://static.vecteezy.com/system/resources/previews/008/306/791/original/square-with-round-corner-glyph-black-icon-vector.jpg"
          alt="News Image"
        />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', pl: 2, mt: -1 }}>
        <Typography variant="caption" color="text.secondary">
          3 hours ago • By aniruddha DHAR
        </Typography>
      </Box>
    </Card>
  );
};

export default NewsCard;