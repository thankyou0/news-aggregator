import React, { useEffect, useState, useContext, useRef, useCallback, useMemo } from 'react';
import NewsCard from '../components/NewsCard';
import Skeleton from '@mui/material/Skeleton';
import InputAdornment from '@mui/material/InputAdornment';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import TextField from '@mui/material/TextField';
import { Box, Grid } from '@mui/material';
import { ThemeContext } from '../context/ThemeContext';
import { GET } from "../api.js";

const MyFeed = () => {
  const { mode } = useContext(ThemeContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  const observerRef = useRef(null);

  // URLs to fetch articles from (based on pageIndex)
  const urls = useMemo(() => {
    return [
      "/api/myfeed/getmyfeed/text/1",
      "/api/myfeed/getmyfeed/text/2",
      "/api/myfeed/getmyfeed/text/3",
      "/api/myfeed/getmyfeed/text/4",
      "/api/myfeed/getmyfeed/topic/1",
      "/api/myfeed/getmyfeed/topic/2"
    ];
  }, []);

  // Function to load more articles
  const loadMoreArticles = useCallback(async () => {
    if (pageIndex >= urls.length || isLoading) return; // Prevent further loading if no more URLs or if loading

    setIsLoading(true);
    try {
      const response = await GET(urls[pageIndex]);
      if (response.data.success === false) {
        throw new Error("No more articles found");
      }

      const newArticles = response.data?.partialArticles || [];
      setArticles((prevArticles) => [...prevArticles, ...newArticles]);
      setPageIndex((prevIndex) => prevIndex + 1); // Move to next URL
    } catch (error) {
      setIsError(true);
      console.error("GET request error:", error);
    } finally {
      setIsLoading(false);
    }
  }, [pageIndex, isLoading, urls]);

  // Filtering articles based on search query
  useEffect(() => {
    setFilteredArticles(
      articles.filter(article =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, articles]);

  // Scroll event listener to trigger API call at 75% scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const threshold = document.documentElement.scrollHeight * 0.75;

      if (scrollPosition >= threshold && !isLoading) {
        loadMoreArticles();
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loadMoreArticles, isLoading]);

  // Initial load of articles
  useEffect(() => {
    loadMoreArticles();
    // eslint-disable-next-line
  }, []); // Empty dependency array to run only once on mount

  return (
    <>
      <h1>Search Results for "{searchQuery}"</h1>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '10px',
          borderRadius: '25px',
          transition: 'width 0.25s ease-in-out',
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
            width: '400px',
            height: '100%',
            borderRadius: '25px',
            bgcolor: mode === 'dark' ? '#444' : 'rgb(251, 248, 248)',
            transition: 'width 0.25s ease-in-out',
            "& .MuiOutlinedInput-root": {
              borderRadius: '25px',
              "& fieldset": {
                borderColor: "transparent",
              },
              "&:hover fieldset": {
                borderColor: "transparent",
              },
              "&.Mui-focused fieldset": {
                borderColor: "transparent",
              },
            },
            "&:hover": {
              bgcolor: mode === 'dark' ? '#555' : 'rgb(240, 240, 240)',
            },
            '&:focus-within': {
              width: '600px',
              bgcolor: mode === 'dark' ? '#555' : 'rgb(240, 240, 240)',
              '& .MuiInputAdornment-root .MuiSvgIcon-root': {
                color: 'blue',
                transform: 'scale(1.4) rotateY(360deg)',
                transition: 'transform 1.1s ease-in-out, color 0.3s ease-in-out',
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
                color: mode === 'dark' ? '#bbb' : '#888',
              },
            },
          }}
        />
      </Box>

      {filteredArticles.map((article, index) => (
        <Grid item xs={12} sm={12} md={12} lg={12} xl={6} key={index} className="card_1" sx={{ width: "100%", height: "100%" }}>
          <NewsCard
            title={article.title}
            someText={article.someText}
            imgURL={article.imgURL}
            link={article.link}
            time={article.time}
            providerImg={article.providerImg}
            providerName={article.providerName}
          />
        </Grid>
      ))}

      {isLoading && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Skeleton animation="wave" variant="rounded" width={800} height={140} />
        </div >
      )}
      {
        isError && (
          <div className="alert alert-warning" role="alert" style={{ width: "50%", margin: "0 auto", zIndex: -1 }}>
            Error fetching articles.
          </div>
        )
      }

      {/* Observer target for infinite scrolling */}
      <div ref={observerRef} style={{ height: '50px', marginTop: '20px' }}></div>
    </>
  );
};

export default MyFeed;