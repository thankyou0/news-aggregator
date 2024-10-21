import React, { useEffect, useState, useContext } from 'react';
import NewsCard from '../components/NewsCard';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import InputAdornment from '@mui/material/InputAdornment';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import TextField from '@mui/material/TextField';
import { Box, Grid } from '@mui/material';
import { ThemeContext } from '../context/ThemeContext';
import { GET } from "../api.js";
import { useQuery } from '@tanstack/react-query';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SearchResults = () => {
  const { mode } = useContext(ThemeContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredArticles, setFilteredArticles] = useState([]);

  const queryq = "your feed";

  const { data: articles = [], isLoading, isError } = useQuery({
    queryKey: ['myFeed'],
    queryFn: async () => {
      const response = await GET("/api/myfeed/getmyfeed");
      if (response.data.success === false) {
        throw new Error("No articles found");
      }
      return response.data?.articles || [];
    },
    onError: (error) => {
      console.error("GET request error:", error);
    },
    retry: false,
    staleTime: 6000000,
    cacheTime: 6000000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  useEffect(() => {
    setFilteredArticles(
      articles.filter(article =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, articles]);

  useEffect(() => {
    const cards = document.querySelectorAll('.card_1');

    cards.forEach((card, index) => {
      gsap.set(card, { y: 50, opacity: 0 });

      ScrollTrigger.create({
        trigger: card,
        start: "top bottom-=100",
        end: "bottom top+=100",
        onEnter: () => {
          gsap.to(card, {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
            delay: 0.1
          });
        },
        onLeave: () => {
          gsap.to(card, {
            y: -50,
            opacity: 0,
            duration: 0.5,
            ease: "power2.in"
          });
        },
        onEnterBack: () => {
          gsap.to(card, {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out"
          });
        },
        onLeaveBack: () => {
          gsap.to(card, {
            y: 50,
            opacity: 0,
            duration: 0.5,
            ease: "power2.in"
          });
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [filteredArticles]);

  return (
    <>
      <h1>Search Results for "{queryq}"</h1>
      {isLoading ? (
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
      ) : isError ? (
        <div className="alert alert-warning" role="alert" style={{ width: "50%", margin: "0 auto", zIndex: -1 }}>
          Error fetching articles.
        </div>
      ) : (
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
      )}
      {filteredArticles.length === 0 && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Stack spacing={2} sx={{ display: "flex", justifyContent: "center" }}>
            {[1, 2, 3, 4, 5, 6, 7].map((item, index) => (
              <Skeleton animation="wave" key={index} variant="rounded" width={800} height={140} />
            ))}
          </Stack>
        </div>
      )}

      {/* <Grid container sx={{ width: "100%", height: "100%" }}> */}
      {filteredArticles.length > 0 && !isLoading && (
        filteredArticles.map((article, index) => (
          <Grid item xs={12} sm={12} md={12} lg={12} xl={6} key={index} className="card_1" sx={{ opacity: 0, width: "100%", height: "100%" }}>
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
        ))
      )}
      {/* </Grid> */}
    </>
  );
};

export default SearchResults;