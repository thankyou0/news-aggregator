import React, { useEffect, useCallback, useState, useContext } from 'react';
import config from '../config';
import axios from 'axios';
import NewsCard from '../components/NewsCard';
import Skeleton from '@mui/material/Skeleton';  // Fixed typo
import Stack from '@mui/material/Stack';
import InputAdornment from '@mui/material/InputAdornment';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { ThemeContext } from '../context/ThemeContext';

const SearchResults = (props) => {
  const { mode } = useContext(ThemeContext);
  const [articles, setArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // New loading state

  // Destructuring props.queries to avoid dependency issues.
  const { q, site, tbs, gl, location } = props.queries;

  const fetchSearchResults = useCallback(async () => {
    setIsLoading(true); // Set loading to true when fetching starts
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${config.BACKEND_API}/api/search`, {
        headers: {
          'Content-Type': 'application/json',
          authorization: token ? `Bearer ${token}` : '',
        },
        params: { q, site, tbs, gl, location },
      });

      const articlesData = response.data?.articles || [];
      if (articlesData.length === 0) {
        setArticles([]); // No articles found
        setIsEmpty(true);
      } else {
        setArticles(articlesData);
        setIsEmpty(false);
      }
    } catch (error) {
      console.error("GET request error:", error);
    } finally {
      setIsLoading(false); // Set loading to false after fetching is done
    }
  }, [q, site, tbs, gl, location]);

  // Fetching search results on component mount.
  useEffect(() => {
    fetchSearchResults();
  }, [fetchSearchResults]);

  // Filtering articles based on search query.
  useEffect(() => {
    setFilteredArticles(
      articles.filter(article =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, articles]);

  return (
    <>
      <h1>Search Results for "{q}"</h1>
      {isLoading ? ( // Show skeleton while loading
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Stack spacing={2} sx={{ display: "flex", justifyContent: "center" }}>
            {[1, 2, 3, 4, 5, 6, 7].map((item, index) => (
              <Skeleton
                animation="wave"
                key={index}
                variant="rounded"
                width={800}
                height={160}
              />
            ))}
          </Stack>
        </div>
      ) : isEmpty ? (
        <div
          className="alert alert-warning"
          role="alert"
          style={{ width: "50%", margin: "0 auto", zIndex: -1 }}
        >
          No results found for "{q}"
        </div>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
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
              width: "300px",
              borderRadius: '25px',
              bgcolor: mode === 'dark' ? '#444' : 'rgb(250, 250, 250)',
              transition: 'width 0.25s ease-in-out',
              "& .MuiOutlinedInput-root": {
                borderRadius: '25px',
                "& fieldset": { borderColor: "transparent" },
                "&:hover fieldset": { borderColor: "transparent" },
                "&.Mui-focused fieldset": { borderColor: "transparent" },
              },
              "&:hover": {
                bgcolor: mode === 'dark' ? '#555' : 'rgb(240, 240, 240)',
              },
              '&:focus-within': {
                width: '500px',
                bgcolor: mode === 'dark' ? '#555' : 'rgb(240, 240, 240)',
                '& .MuiInputAdornment-root .MuiSvgIcon-root': {
                  color: 'blue',
                  transform: 'scale(1.3)',
                  transition: 'transform 0.3s ease-in-out, color 0.3s ease-in-out',
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
      )}

      {filteredArticles.length > 0 && !isLoading && (
        filteredArticles.map((article, index) => (
          <NewsCard
            key={index}
            title={article.title}
            someText={article.someText}
            imgURL={article.imgURL}
            link={article.link}
            time={article.time}
            providerImg={article.providerImg}
            providerName={article.providerName}
          />
        ))
      )}
    </>
  );
};

export default SearchResults;
