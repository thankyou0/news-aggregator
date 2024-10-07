import React from 'react';
import { Container, Typography, Button, Grid, Paper } from '@mui/material';


const Home = () => {



  return (
    <Container>
      <Typography variant="h2" align="center" gutterBottom>
        Welcome to My Project
      </Typography>
      <Typography variant="h5" align="center" paragraph>
        This is the home page of your awesome project. Explore and enjoy!
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        <Grid item>
          <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
            <Typography variant="h6">Feature 1</Typography>
            <Typography variant="body1">Description of feature 1.</Typography>
          </Paper>
        </Grid>
        <Grid item>
          <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
            <Typography variant="h6">Feature 2</Typography>
            <Typography variant="body1">Description of feature 2.</Typography>
          </Paper>
        </Grid>
        <Grid item>
          <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
            <Typography variant="h6">Feature 3</Typography>
            <Typography variant="body1">Description of feature 3.</Typography>
          </Paper>
        </Grid>
      </Grid>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Button variant="contained" color="primary">
          Get Started
        </Button>
      </div>
    </Container>
  );
};

export default Home;