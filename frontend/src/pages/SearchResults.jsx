// import React, { useEffect, useState, useContext } from 'react';
// import { useQuery } from '@tanstack/react-query'; // Importing useQuery
// import axios from 'axios';
// import NewsCard from '../components/NewsCard';
// import Skeleton from '@mui/material/Skeleton';
// import Stack from '@mui/material/Stack';
// import InputAdornment from '@mui/material/InputAdornment';
// import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
// import TextField from '@mui/material/TextField';
// import Box from '@mui/material/Box';
// import { ThemeContext } from '../context/ThemeContext';
// import config from '../config';

// // Fetch function for react-query to retrieve articles
// const fetchSearchResults = async ({ queryKey }) => {
//   // Extracting query parameters from queryKey
//   const [_key, { q, site, tbs, gl, location }] = queryKey;
//   const token = localStorage.getItem('token'); // Fetch token from local storage

//   const response = await axios.get(`${config.BACKEND_API}/api/search`, {
//     headers: {
//       'Content-Type': 'application/json',
//       authorization: token ? `Bearer ${token}` : '',
//     },
//     params: { q, site, tbs, gl, location }, // Sending query params to backend
//   });

//   // Throw error if no articles found
//   if (!response.data?.articles) {
//     throw new Error('No articles found');
//   }
//   return response.data.articles;
// };

// const SearchResults = (props) => {
//   const { mode } = useContext(ThemeContext); // Using ThemeContext to get mode (dark/light)
//   const [searchQuery, setSearchQuery] = useState(''); // State for search query input
//   const [filteredArticles, setFilteredArticles] = useState([]); // Filtered articles state

//   // Destructuring props.queries to avoid dependency issues
//   const { q, site, tbs, gl, location } = props.queries;

//   // useQuery for fetching articles with caching and error handling
//   const {
//     data: articles = [],
//     isLoading,
//     isError
//   } = useQuery({
//     queryKey: ['searchResults', { q, site, tbs, gl, location }],
//     queryFn: fetchSearchResults,
//     staleTime: 6000000, // 100 minutes
//     cacheTime: 6000000, // 100 minutes
//     refetchOnWindowFocus: false,
//   });

//   // Effect to filter articles based on search query
//   useEffect(() => {
//     setFilteredArticles(
//       articles.filter(article =>
//         article.title.toLowerCase().includes(searchQuery.toLowerCase())
//       )
//     );
//   }, [searchQuery, articles]); // Runs whenever searchQuery or articles change

//   return (
//     <>
//       <h1>Search Results for "{q}"</h1>

//       {/* Show skeleton loading while fetching data */}
//       {isLoading ? (
//         <div style={{ display: 'flex', justifyContent: 'center' }}>
//           <Stack spacing={2} sx={{ display: 'flex', justifyContent: 'center' }}>
//             {[1, 2, 3, 4, 5, 6, 7].map((_, index) => (
//               <Skeleton
//                 animation="wave"
//                 key={index}
//                 variant="rounded"
//                 width={800}
//                 height={160}
//               />
//             ))}
//           </Stack>
//         </div>
//       ) : isError ? (
//         // Error handling if fetching fails
//         <div className="alert alert-warning" role="alert">
//           Error fetching results for "{q}"
//         </div>
//       ) : filteredArticles.length === 0 ? (
//         // Message if no articles match the query
//         <div
//           className="alert alert-warning"
//           role="alert"
//           style={{ width: '50%', margin: '0 auto', zIndex: -1 }}
//         >
//           No results found for "{q}"
//         </div>
//       ) : (
//         // Search bar to filter articles from the fetched data
//         <Box
//           sx={{
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center',
//             padding: '10px',
//             borderRadius: '25px',
//             transition: 'width 0.25s ease-in-out',
//           }}
//         >
//           <TextField
//             hiddenLabel
//             variant="outlined"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             placeholder="Search from given articles..."
//             sx={{
//               m: 1,
//               width: '300px',
//               borderRadius: '25px',
//               bgcolor: mode === 'dark' ? '#444' : 'rgb(250, 250, 250)',
//               transition: 'width 0.25s ease-in-out',
//               '&:focus-within': {
//                 width: '500px',
//                 bgcolor: mode === 'dark' ? '#555' : 'rgb(240, 240, 240)',
//               },
//             }}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <SearchRoundedIcon />
//                 </InputAdornment>
//               ),
//             }}
//           />
//         </Box>
//       )}

//       {/* Render articles if available */}
//       {filteredArticles.map((article, index) => (
//         <NewsCard
//           key={index}
//           title={article.title}
//           someText={article.someText}
//           imgURL={article.imgURL}
//           link={article.link}
//           time={article.time}
//           providerImg={article.providerImg}
//           providerName={article.providerName}
//         />
//       ))}
//     </>
//   );
// };

// export default SearchResults;

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
      return response.data?.AllArticles || [];
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
            delay: index * 0.1
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
        <Box sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: '10px',
          borderRadius: '25px',
          transition: 'width 0.25s ease-in-out',
        }}>
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
      {filteredArticles.length === 0 && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Stack spacing={2} sx={{ display: "flex", justifyContent: "center" }}>
            {[1, 2, 3, 4, 5, 6, 7].map((item, index) => (
              <Skeleton animation="wave" key={index} variant="rounded" width={800} height={140} />
            ))}
          </Stack>
        </div>
      )}

      {filteredArticles.length > 0 && !isLoading && (
        filteredArticles.map((article, index) => (
          <NewsCard
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