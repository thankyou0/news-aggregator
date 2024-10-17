import React, { useEffect, useState, useContext } from 'react';
import NewsCard from '../components/NewsCard';
import { GET } from '../api.js';
import Skelaton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import InputAdornment from '@mui/material/InputAdornment';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { ThemeContext } from '../context/ThemeContext';


const LoggedHome = () => {

  const { mode } = useContext(ThemeContext);
  const [articles, setArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredArticles, setFilteredArticles] = useState([]);


  useEffect(() => {

    (async () => {
      const resultFromBackend = await GET('/api/algorithms/top_stories');

      if (resultFromBackend.data.success) {
        setArticles(resultFromBackend.data.articles);
      } else {
        console.log('Error fetching data from backend');
      }
    })();

  }, []);



  useEffect(() => {
    setFilteredArticles(
      articles.filter(article =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, articles]);






  return (
    <>


      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: '10px',
          borderRadius: '25px', // Adjust the value as needed
          transition: 'width 0.25s ease-in-out', // Smooth transition
        }}
      >
        <TextField
          hiddenLabel
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search from given articles..."
          sx={{
            m: 1,
            width: "300px",
            borderRadius: '25px', // Adjust the value as needed
            bgcolor: mode === 'dark' ? '#444' : 'rgb(250, 250, 250)', // Background color for both modes
            transition: 'width 0.25s ease-in-out', // Smooth transition
            "& .MuiOutlinedInput-root": {
              borderRadius: '25px', // Adjust the value as needed
              "& fieldset": {
                borderColor: "transparent", // Initial border color
              },
              "&:hover fieldset": {
                borderColor: "transparent", // Border color on hover
              },
              "&.Mui-focused fieldset": {
                borderColor: "transparent", // Border color on focus
              },
            },
            "&:hover": {
              bgcolor: mode === 'dark' ? '#555' : 'rgb(240, 240, 240)', // Background color on hover
            },
            '&:focus-within': {
              width: '500px', // Increase width on focus/typing
              bgcolor: mode === 'dark' ? '#555' : 'rgb(240, 240, 240)', // Background color on focus
              '& .MuiInputAdornment-root .MuiSvgIcon-root': {
                color: 'blue', // Change color on focus
                transform: 'scale(1.3)', // Increase size on focus
                transition: 'transform 0.3s ease-in-out, color 0.3s ease-in-out', // Smooth transition for size and color change
              },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchRoundedIcon />
              </InputAdornment>
            ),
            sx: {
              "&::placeholder": {
                color: mode === 'dark' ? '#bbb' : '#888', // Placeholder color for both modes
              },
            },
          }}
        />
      </Box>
      

      
      {filteredArticles.length > 0 ? filteredArticles.map((article, index) => (
        article &&
        <NewsCard
          key={index}
          title={article.title}
          link={article.link}
          time={article.time}
          providerImg={article.providerImg}
        />
      )) :
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Stack spacing={2} sx={{ display: "flex", justifyContent: "center" }}>
            {[1, 2, 3, 4, 5, 6, 7].map((item, index) => (
              <Skelaton animation="wave" key={index} variant="rounded" width={800} height={140} />
            ))}
          </Stack>
        </div>
      }

    </>
  );
};

export default LoggedHome;