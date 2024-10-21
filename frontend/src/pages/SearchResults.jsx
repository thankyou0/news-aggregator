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
//   console.log(queryKey);

//   // eslint-disable-next-line
//   const [_, q, site, tbs, gl, location] = queryKey;
//   const token = localStorage.getItem('token');

//   const response = await axios.get(`${config.BACKEND_API}/api/search/1`, {
//     headers: {
//       'Content-Type': 'application/json',
//       authorization: token ? `Bearer ${token}` : '',
//     },
//     params: { q, site, tbs, gl, location },
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
//   // console.log('SearchResults:', { q, site, tbs, gl, location });


//   // useQuery for fetching articles with caching and error handling
//   const {
//     data: articles = [],
//     isLoading,
//     isError
//   } = useQuery({
//     queryKey: ['searchResults', q, site, tbs, gl, location],
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
//               <Box
//                 sx={{
//                   display: 'flex',
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                   padding: '10px',
//                   borderRadius: '25px',
//                   transition: 'width 0.25s ease-in-out',
//                 }}
//               >
//                 <TextField
//                   hiddenLabel
//                   variant="outlined"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   placeholder="Search from given articles..."
//                   sx={{
//                     m: 1,
//                     width: '400px',
//                     height: '100%',
//                     borderRadius: '25px',
//                     bgcolor: mode === 'dark' ? '#444' : 'rgb(251, 248, 248)',
//                     transition: 'width 0.25s ease-in-out',
//                     "& .MuiOutlinedInput-root": {
//                       borderRadius: '25px',
//                       "& fieldset": {
//                         borderColor: "transparent",
//                       },
//                       "&:hover fieldset": {
//                         borderColor: "transparent",
//                       },
//                       "&.Mui-focused fieldset": {
//                         borderColor: "transparent",
//                       },
//                     },
//                     "&:hover": {
//                       bgcolor: mode === 'dark' ? '#555' : 'rgb(240, 240, 240)',
//                     },
//                     '&:focus-within': {
//                       width: '600px',
//                       bgcolor: mode === 'dark' ? '#555' : 'rgb(240, 240, 240)',
//                       '& .MuiInputAdornment-root .MuiSvgIcon-root': {
//                         color: 'blue',
//                         transform: 'scale(1.4) rotateY(360deg)',
//                         transition: 'transform 1.1s ease-in-out, color 0.3s ease-in-out',
//                       },
//                     },
//                   }}
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <SearchRoundedIcon />
//                       </InputAdornment>
//                     ),
//                     sx: {
//                       "&::placeholder": {
//                         color: mode === 'dark' ? '#bbb' : '#888',
//                       },
//                     },
//                   }}
//                 />
//               </Box>
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



// import React, { useEffect, useState, useContext, useRef } from 'react';
// import { useQuery } from '@tanstack/react-query';
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
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';

// gsap.registerPlugin(ScrollTrigger);

// // Fetch function for react-query to retrieve articles
// const fetchSearchResults = async ({ queryKey }) => {
//   console.log(queryKey);

//   // eslint-disable-next-line
//   const [_, q, site, tbs, gl, location] = queryKey;
//   const token = localStorage.getItem('token');

//   const response = await axios.get(`${config.BACKEND_API}/api/search/1`, {
//     headers: {
//       'Content-Type': 'application/json',
//       authorization: token ? `Bearer ${token}` : '',
//     },
//     params: { q, site, tbs, gl, location },
//   });

//   // Throw error if no articles found
//   if (!response.data?.articles) {
//     throw new Error('No articles found');
//   }
//   return response.data.articles;
// };

// const SearchResults = (props) => {
//   const { mode } = useContext(ThemeContext);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filteredArticles, setFilteredArticles] = useState([]);
//   const newsCardsRef = useRef([]);

//   const { q, site, tbs, gl, location } = props.queries;

//   const {
//     data: articles = [],
//     isLoading,
//     isError
//   } = useQuery({
//     queryKey: ['searchResults', q, site, tbs, gl, location],
//     queryFn: fetchSearchResults,
//     staleTime: 6000000,
//     cacheTime: 6000000,
//     refetchOnWindowFocus: false,
//   });

//   useEffect(() => {
//     setFilteredArticles(
//       articles.filter(article =>
//         article.title.toLowerCase().includes(searchQuery.toLowerCase())
//       )
//     );
//   }, [searchQuery, articles]);

//   useEffect(() => {
//     if (!isLoading && filteredArticles.length > 0) {
//       newsCardsRef.current = newsCardsRef.current.slice(0, filteredArticles.length);

//       newsCardsRef.current.forEach((card, index) => {
//         gsap.fromTo(card,
//           {
//             opacity: 0,
//             y: 50
//           },
//           {
//             opacity: 1,
//             y: 0,
//             duration: 0.5,
//             ease: "power3.out",
//             scrollTrigger: {
//               trigger: card,
//               start: "top bottom-=100",
//               toggleActions: "play none none reverse"
//             }
//           }
//         );
//       });
//     }

//     return () => {
//       ScrollTrigger.getAll().forEach(trigger => trigger.kill());
//     };
//   }, [filteredArticles, isLoading]);

//   return (
//     <>
//       <h1>Search Results for "{q}"</h1>

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
//         <div className="alert alert-warning" role="alert">
//           Error fetching results for "{q}"
//         </div>
//       ) : filteredArticles.length === 0 ? (
//         <div
//           className="alert alert-warning"
//           role="alert"
//           style={{ width: '50%', margin: '0 auto', zIndex: -1 }}
//         >
//           No results found for "{q}"
//         </div>
//       ) : (
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
//               width: '400px',
//               height: '100%',
//               borderRadius: '25px',
//               bgcolor: mode === 'dark' ? '#444' : 'rgb(251, 248, 248)',
//               transition: 'width 0.25s ease-in-out',
//               "& .MuiOutlinedInput-root": {
//                 borderRadius: '25px',
//                 "& fieldset": {
//                   borderColor: "transparent",
//                 },
//                 "&:hover fieldset": {
//                   borderColor: "transparent",
//                 },
//                 "&.Mui-focused fieldset": {
//                   borderColor: "transparent",
//                 },
//               },
//               "&:hover": {
//                 bgcolor: mode === 'dark' ? '#555' : 'rgb(240, 240, 240)',
//               },
//               '&:focus-within': {
//                 width: '600px',
//                 bgcolor: mode === 'dark' ? '#555' : 'rgb(240, 240, 240)',
//                 '& .MuiInputAdornment-root .MuiSvgIcon-root': {
//                   color: 'blue',
//                   transform: 'scale(1.4) rotateY(360deg)',
//                   transition: 'transform 1.1s ease-in-out, color 0.3s ease-in-out',
//                 },
//               },
//             }}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <SearchRoundedIcon />
//                 </InputAdornment>
//               ),
//               sx: {
//                 "&::placeholder": {
//                   color: mode === 'dark' ? '#bbb' : '#888',
//                 },
//               },
//             }}
//           />
//         </Box>
//       )}

//       {filteredArticles.map((article, index) => (
//         <div ref={el => newsCardsRef.current[index] = el} key={index}>
//           <NewsCard
//             title={article.title}
//             someText={article.someText}
//             imgURL={article.imgURL}
//             link={article.link}
//             time={article.time}
//             providerImg={article.providerImg}
//             providerName={article.providerName}
//           />
//         </div>
//       ))}
//     </>
//   );
// };

// export default SearchResults;


// import React, { useEffect, useState, useContext, useRef, useCallback } from 'react';
// import { useInfiniteQuery } from '@tanstack/react-query';
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
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';

// gsap.registerPlugin(ScrollTrigger);

// // Fetch function for react-query to retrieve articles
// const fetchSearchResults = async ({ pageParam = 0, queryKey }) => {
//   // eslint-disable-next-line
//   const [_, q, site, tbs, gl, location] = queryKey;
//   const token = localStorage.getItem('token');

//   const response = await axios.get(`${config.BACKEND_API}/api/search/${pageParam}`, {
//     headers: {
//       'Content-Type': 'application/json',
//       authorization: token ? `Bearer ${token}` : '',
//     },
//     params: { q, site, tbs, gl, location },
//   });

//   // Throw error if no articles found
//   if (!response.data?.articles) {
//     throw new Error('No articles found');
//   }
//   return response.data;
// };

// const SearchResults = (props) => {
//   const { mode } = useContext(ThemeContext);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filteredArticles, setFilteredArticles] = useState([]);
//   const newsCardsRef = useRef([]);
//   const observerRef = useRef(null);

//   const { q, site, tbs, gl, location } = props.queries;

//   const {
//     data,
//     fetchNextPage,
//     hasNextPage,
//     isFetchingNextPage,
//     isLoading,
//     isError
//   } = useInfiniteQuery({
//     queryKey: ['searchResults', q, site, tbs, gl, location],
//     queryFn: fetchSearchResults,
//     getNextPageParam: (lastPage, pages) => pages.length,
//     staleTime: 6000000,
//     cacheTime: 6000000,
//     refetchOnWindowFocus: false,
//   });

//   const articles = data ? data.pages.flatMap(page => page.articles) : [];

//   useEffect(() => {
//     setFilteredArticles(
//       articles.filter(article =>
//         article.title.toLowerCase().includes(searchQuery.toLowerCase())
//       )
//     );
//   }, [searchQuery, articles]);

//   useEffect(() => {
//     if (!isLoading && filteredArticles.length > 0) {
//       newsCardsRef.current = newsCardsRef.current.slice(0, filteredArticles.length);

//       newsCardsRef.current.forEach((card, index) => {
//         gsap.fromTo(card,
//           {
//             opacity: 0,
//             y: 50
//           },
//           {
//             opacity: 1,
//             y: 0,
//             duration: 0.5,
//             ease: "power3.out",
//             scrollTrigger: {
//               trigger: card,
//               start: "top bottom-=100",
//               toggleActions: "play none none reverse"
//             }
//           }
//         );
//       });
//     }

//     return () => {
//       ScrollTrigger.getAll().forEach(trigger => trigger.kill());
//     };
//   }, [filteredArticles, isLoading]);

//   const lastArticleRef = useCallback(node => {
//     if (observerRef.current) observerRef.current.disconnect();
//     observerRef.current = new IntersectionObserver(entries => {
//       if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
//         fetchNextPage();
//       }
//     });
//     if (node) observerRef.current.observe(node);
//   }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

//   return (
//     <>
//       <h1>Search Results for "{q}"</h1>

//       <Box
//         sx={{
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           padding: '10px',
//           borderRadius: '25px',
//           transition: 'width 0.25s ease-in-out',
//         }}
//       >
//         <TextField
//           hiddenLabel
//           variant="outlined"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           placeholder="Search from given articles..."
//           sx={{
//             m: 1,
//             width: '400px',
//             height: '100%',
//             borderRadius: '25px',
//             bgcolor: mode === 'dark' ? '#444' : 'rgb(251, 248, 248)',
//             transition: 'width 0.25s ease-in-out',
//             "& .MuiOutlinedInput-root": {
//               borderRadius: '25px',
//               "& fieldset": {
//                 borderColor: "transparent",
//               },
//               "&:hover fieldset": {
//                 borderColor: "transparent",
//               },
//               "&.Mui-focused fieldset": {
//                 borderColor: "transparent",
//               },
//             },
//             "&:hover": {
//               bgcolor: mode === 'dark' ? '#555' : 'rgb(240, 240, 240)',
//             },
//             '&:focus-within': {
//               width: '600px',
//               bgcolor: mode === 'dark' ? '#555' : 'rgb(240, 240, 240)',
//               '& .MuiInputAdornment-root .MuiSvgIcon-root': {
//                 color: 'blue',
//                 transform: 'scale(1.4) rotateY(360deg)',
//                 transition: 'transform 1.1s ease-in-out, color 0.3s ease-in-out',
//               },
//             },
//           }}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <SearchRoundedIcon />
//               </InputAdornment>
//             ),
//             sx: {
//               "&::placeholder": {
//                 color: mode === 'dark' ? '#bbb' : '#888',
//               },
//             },
//           }}
//         />
//       </Box>

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
//         <div className="alert alert-warning" role="alert">
//           Error fetching results for "{q}"
//         </div>
//       ) : filteredArticles.length === 0 ? (
//         <div
//           className="alert alert-warning"
//           role="alert"
//           style={{ width: '50%', margin: '0 auto', zIndex: -1 }}
//         >
//           No results found for "{q}"
//         </div>
//       ) : (
//         <>
//           {filteredArticles.map((article, index) => (
//             <div
//               ref={index === filteredArticles.length - 1 ? lastArticleRef : el => newsCardsRef.current[index] = el}
//               key={index}
//             >
//               <NewsCard
//                 title={article.title}
//                 someText={article.someText}
//                 imgURL={article.imgURL}
//                 link={article.link}
//                 time={article.time}
//                 providerImg={article.providerImg}
//                 providerName={article.providerName}
//               />
//             </div>
//           ))}
//           {isFetchingNextPage && (
//             <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
//               <Skeleton animation="wave" variant="rounded" width={800} height={160} />
//             </div>
//           )}
//         </>
//       )}
//     </>
//   );
// };

// export default SearchResults;





// import React, { useEffect, useState, useContext, useRef, useCallback } from 'react';
// import { useInfiniteQuery } from '@tanstack/react-query';
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
// // import { gsap } from 'gsap';
// // import { ScrollTrigger } from 'gsap/ScrollTrigger';


// // Fetch function for react-query to retrieve articles
// const fetchSearchResults = async ({ pageParam = 0, queryKey }) => {
//   // eslint-disable-next-line
//   const [_, q, site, tbs, gl, location] = queryKey;
//   const token = localStorage.getItem('token');

//   const response = await axios.get(`${config.BACKEND_API}/api/search/${pageParam}`, {
//     headers: {
//       'Content-Type': 'application/json',
//       authorization: token ? `Bearer ${token}` : '',
//     },
//     params: { q, site, tbs, gl, location },
//   });

//   // Throw error if no articles found
//   if (!response.data?.articles) {
//     throw new Error('No articles found');
//   }
//   return response.data;
// };

// const SearchResults = (props) => {
//   const { mode } = useContext(ThemeContext);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filteredArticles, setFilteredArticles] = useState([]);
//   const observerRef = useRef(null);
//   const newsCardsContainerRef = useRef(null);

//   const { q, site, tbs, gl, location } = props.queries;

//   const {
//     data,
//     fetchNextPage,
//     hasNextPage,
//     isFetchingNextPage,
//     isLoading,
//     isError
//   } = useInfiniteQuery({
//     queryKey: ['searchResults', q, site, tbs, gl, location],
//     queryFn: fetchSearchResults,
//     getNextPageParam: (lastPage, pages) => pages.length,
//     staleTime: 6000000,
//     cacheTime: 6000000,
//     refetchOnWindowFocus: false,
//   });

//   const articles = data ? data.pages.flatMap(page => page.articles) : [];

//   useEffect(() => {
//     setFilteredArticles(
//       articles.filter(article =>
//         article.title.toLowerCase().includes(searchQuery.toLowerCase())
//       )
//     );
//   }, [searchQuery, articles]);


//   const lastArticleRef = useCallback(node => {
//     if (observerRef.current) observerRef.current.disconnect();
//     observerRef.current = new IntersectionObserver(entries => {
//       if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
//         fetchNextPage();
//       }
//     });
//     if (node) observerRef.current.observe(node);
//   }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

//   return (
//     <>
//       <h1>Search Results for "{q}"</h1>

//       <Box
//         sx={{
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           padding: '10px',
//           borderRadius: '25px',
//           transition: 'width 0.25s ease-in-out',
//         }}
//       >
//         <TextField
//           hiddenLabel
//           variant="outlined"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           placeholder="Search from given articles..."
//           sx={{
//             m: 1,
//             width: '400px',
//             height: '100%',
//             borderRadius: '25px',
//             bgcolor: mode === 'dark' ? '#444' : 'rgb(251, 248, 248)',
//             transition: 'width 0.25s ease-in-out',
//             "& .MuiOutlinedInput-root": {
//               borderRadius: '25px',
//               "& fieldset": {
//                 borderColor: "transparent",
//               },
//               "&:hover fieldset": {
//                 borderColor: "transparent",
//               },
//               "&.Mui-focused fieldset": {
//                 borderColor: "transparent",
//               },
//             },
//             "&:hover": {
//               bgcolor: mode === 'dark' ? '#555' : 'rgb(240, 240, 240)',
//             },
//             '&:focus-within': {
//               width: '600px',
//               bgcolor: mode === 'dark' ? '#555' : 'rgb(240, 240, 240)',
//               '& .MuiInputAdornment-root .MuiSvgIcon-root': {
//                 color: 'blue',
//                 transform: 'scale(1.4) rotateY(360deg)',
//                 transition: 'transform 1.1s ease-in-out, color 0.3s ease-in-out',
//               },
//             },
//           }}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <SearchRoundedIcon />
//               </InputAdornment>
//             ),
//             sx: {
//               "&::placeholder": {
//                 color: mode === 'dark' ? '#bbb' : '#888',
//               },
//             },
//           }}
//         />
//       </Box>

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
//         <div className="alert alert-warning" role="alert">
//           Error fetching results for "{q}"
//         </div>
//       ) : filteredArticles.length === 0 ? (
//         <div
//           className="alert alert-warning"
//           role="alert"
//           style={{ width: '50%', margin: '0 auto', zIndex: -1 }}
//         >
//           No results found for "{q}"
//         </div>
//       ) : (
//         <>
//           <div ref={newsCardsContainerRef}>
//             {filteredArticles.map((article, index) => (
//               <div
//                 key={index}
//                 ref={index === filteredArticles.length - 1 ? lastArticleRef : null}
//               >
//                 <NewsCard
//                   title={article.title}
//                   someText={article.someText}
//                   imgURL={article.imgURL}
//                   link={article.link}
//                   time={article.time}
//                   providerImg={article.providerImg}
//                   providerName={article.providerName}
//                 />
//               </div>
//             ))}
//           </div>
//           {isFetchingNextPage && (
//             <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
//               <Skeleton animation="wave" variant="rounded" width={800} height={160} />
//             </div>
//           )}
//         </>
//       )}
//     </>
//   );
// };

// export default SearchResults;





// import React, { useEffect, useState, useContext, useRef, useCallback } from 'react';
// import { useInfiniteQuery } from '@tanstack/react-query';
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
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';

// gsap.registerPlugin(ScrollTrigger);

// // Fetch function for react-query
// const fetchSearchResults = async ({ pageParam = 0, queryKey }) => {
//   const [_, q, site, tbs, gl, location] = queryKey;
//   const token = localStorage.getItem('token');

//   const response = await axios.get(`${config.BACKEND_API}/api/search/${pageParam}`, {
//     headers: {
//       'Content-Type': 'application/json',
//       authorization: token ? `Bearer ${token}` : '',
//     },
//     params: { q, site, tbs, gl, location },
//   });

//   if (!response.data?.articles) {
//     throw new Error('No articles found');
//   }
//   return response.data;
// };

// const SearchResults = (props) => {
//   const { mode } = useContext(ThemeContext);
//   const [searchQuery, setSearchQuery] = useState('');
//   const observerRef = useRef(null);
//   const newsCardsContainerRef = useRef(null);

//   const { q, site, tbs, gl, location } = props.queries;

//   const {
//     data,
//     fetchNextPage,
//     hasNextPage,
//     isFetchingNextPage,
//     isLoading,
//     isError,
//   } = useInfiniteQuery({
//     queryKey: ['searchResults', q, site, tbs, gl, location],
//     queryFn: fetchSearchResults,
//     getNextPageParam: (lastPage, pages) => pages.length,
//     staleTime: 6000000,
//     cacheTime: 6000000,
//     refetchOnWindowFocus: false,
//   });

//   const articles = data ? data.pages.flatMap((page) => page.articles) : [];

//   useEffect(() => {
//     if (newsCardsContainerRef.current) {
//       const newsCards = newsCardsContainerRef.current.children;

//       // GSAP animation setup
//       gsap.fromTo(
//         newsCards,
//         { opacity: 0, y: 50, scale: 0.9 },
//         {
//           opacity: 1,
//           y: 0,
//           scale: 1,
//           duration: 0.6,
//           ease: 'power3.out',
//           stagger: 0.1,
//           scrollTrigger: {
//             trigger: newsCardsContainerRef.current,
//             start: 'top bottom-=100',
//             end: 'bottom top+=100',
//             toggleActions: 'play none none reverse',
//             scrub: 1,
//           },
//         }
//       );

//       // Hover effect using GSAP
//       Array.from(newsCards).forEach((card) => {
//         const hoverAnimation = gsap.to(card, {
//           scale: 1.03,
//           boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
//           duration: 0.3,
//           paused: true,
//         });

//         card.addEventListener('mouseenter', () => hoverAnimation.play());
//         card.addEventListener('mouseleave', () => hoverAnimation.reverse());
//       });

//       // Refresh ScrollTrigger when new articles are loaded
//       ScrollTrigger.refresh();
//     }

//     return () => {
//       ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
//     };
//   }, [articles]);

//   const lastArticleRef = useCallback(
//     (node) => {
//       if (observerRef.current) observerRef.current.disconnect();
//       observerRef.current = new IntersectionObserver((entries) => {
//         if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
//           fetchNextPage();
//         }
//       });
//       if (node) observerRef.current.observe(node);
//     },
//     [hasNextPage, isFetchingNextPage, fetchNextPage]
//   );

//   return (
//     <>
//       <h1>Search Results for "{q}"</h1>

//       <Box
//         sx={{
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           padding: '10px',
//           borderRadius: '25px',
//           transition: 'width 0.25s ease-in-out',
//         }}
//       >
//         <TextField
//           hiddenLabel
//           variant="outlined"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           placeholder="Search from given articles..."
//           sx={{
//             m: 1,
//             width: '400px',
//             borderRadius: '25px',
//             bgcolor: mode === 'dark' ? '#444' : 'rgb(251, 248, 248)',
//             transition: 'width 0.25s ease-in-out',
//             '&:focus-within': {
//               width: '600px',
//               bgcolor: mode === 'dark' ? '#555' : 'rgb(240, 240, 240)',
//             },
//           }}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <SearchRoundedIcon />
//               </InputAdornment>
//             ),
//           }}
//         />
//       </Box>

//       {isLoading ? (
//         <Stack spacing={2} sx={{ display: 'flex', justifyContent: 'center' }}>
//           {[...Array(7)].map((_, index) => (
//             <Skeleton key={index} variant="rounded" width={800} height={160} />
//           ))}
//         </Stack>
//       ) : isError ? (
//         <div className="alert alert-warning">Error fetching results for "{q}"</div>
//       ) : articles.length === 0 ? (
//         <div className="alert alert-warning" style={{ width: '50%', margin: '0 auto' }}>
//           No results found for "{q}"
//         </div>
//       ) : (
//         <div ref={newsCardsContainerRef}>
//           {articles.map((article, index) => (
//             <div
//               key={index}
//               ref={index === articles.length - 1 ? lastArticleRef : null}
//               style={{ opacity: 0 }}
//             >
//               <NewsCard {...article} />
//             </div>
//           ))}
//         </div>
//       )}

//       {isFetchingNextPage && (
//         <Skeleton variant="rounded" width={800} height={160} sx={{ marginTop: '20px' }} />
//       )}
//     </>
//   );
// };

// export default SearchResults;


// import React, { useEffect, useState, useContext, useRef, useCallback } from 'react';
// import { useInfiniteQuery } from '@tanstack/react-query';
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
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';

// gsap.registerPlugin(ScrollTrigger);

// const fetchSearchResults = async ({ pageParam = 0, queryKey }) => {
//   const [_, q, site, tbs, gl, location] = queryKey;
//   const token = localStorage.getItem('token');

//   const response = await axios.get(`${config.BACKEND_API}/api/search/${pageParam}`, {
//     headers: {
//       'Content-Type': 'application/json',
//       authorization: token ? `Bearer ${token}` : '',
//     },
//     params: { q, site, tbs, gl, location },
//   });

//   if (!response.data?.articles) {
//     throw new Error('No articles found');
//   }
//   return response.data;
// };

// const SearchResults = (props) => {
//   const { mode } = useContext(ThemeContext);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filteredArticles, setFilteredArticles] = useState([]);
//   const observerRef = useRef(null);
//   const newsCardsContainerRef = useRef(null);

//   const { q, site, tbs, gl, location } = props.queries;

//   const {
//     data,
//     fetchNextPage,
//     hasNextPage,
//     isFetchingNextPage,
//     isLoading,
//     isError,
//   } = useInfiniteQuery({
//     queryKey: ['searchResults', q, site, tbs, gl, location],
//     queryFn: fetchSearchResults,
//     getNextPageParam: (lastPage, pages) => pages.length,
//     staleTime: 6000000,
//     cacheTime: 6000000,
//     refetchOnWindowFocus: false,
//   });

//   const articles = data ? data.pages.flatMap(page => page.articles) : [];

//   useEffect(() => {
//     setFilteredArticles(
//       articles.filter(article =>
//         article.title.toLowerCase().includes(searchQuery.toLowerCase())
//       )
//     );
//   }, [searchQuery, articles]);

//   // GSAP Animation: Triggering animation as you scroll through news cards
//   // useEffect(() => {
//   //   if (!isLoading && filteredArticles.length > 0 && newsCardsContainerRef.current) {
//   //     const newsCards = gsap.utils.toArray(newsCardsContainerRef.current.children);

//   //     gsap.fromTo(
//   //       newsCards,
//   //       { opacity: 0, y: 20 }, // Initial state
//   //       {
//   //         opacity: 1,
//   //         y: 0,
//   //         duration: 0.8, // Slightly longer animation
//   //         ease: 'power2.out',
//   //         stagger: 0.1, // Smooth delay between each card
//   //         scrollTrigger: {
//   //           trigger: newsCardsContainerRef.current,
//   //           start: 'top bottom',
//   //           end: 'bottom top',
//   //           toggleActions: 'play none none reverse',
//   //           scrub: false, // Disable scrub for better responsiveness
//   //         },
//   //         onComplete: () => gsap.set(newsCards, { opacity: 1 }), // Ensure full opacity
//   //       }
//   //     );
//   //   }

//   //   return () => {
//   //     ScrollTrigger.getAll().forEach(trigger => trigger.kill());
//   //   };
//   // }, [filteredArticles.length]); // Optimized dependency


//   const lastArticleRef = useCallback(
//     (node) => {
//       if (observerRef.current) observerRef.current.disconnect();
//       observerRef.current = new IntersectionObserver((entries) => {
//         if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
//           fetchNextPage();
//         }
//       });
//       if (node) observerRef.current.observe(node);
//     },
//     [hasNextPage, isFetchingNextPage, fetchNextPage]
//   );

//   return (
//     <>
//       <h1>Search Results for "{q}"</h1>

//       <Box
//         sx={{
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           padding: '10px',
//           borderRadius: '25px',
//           transition: 'width 0.25s ease-in-out',
//         }}
//       >
//         <TextField
//           hiddenLabel
//           variant="outlined"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           placeholder="Search from given articles..."
//           sx={{
//             m: 1,
//             width: '400px',
//             height: '100%',
//             borderRadius: '25px',
//             bgcolor: mode === 'dark' ? '#444' : 'rgb(251, 248, 248)',
//             transition: 'width 0.25s ease-in-out',
//             "& .MuiOutlinedInput-root": {
//               borderRadius: '25px',
//               "& fieldset": { borderColor: 'transparent' },
//               "&:hover fieldset": { borderColor: 'transparent' },
//               "&.Mui-focused fieldset": { borderColor: 'transparent' },
//             },
//             "&:hover": {
//               bgcolor: mode === 'dark' ? '#555' : 'rgb(240, 240, 240)',
//             },
//             '&:focus-within': {
//               width: '600px',
//               bgcolor: mode === 'dark' ? '#555' : 'rgb(240, 240, 240)',
//               '& .MuiInputAdornment-root .MuiSvgIcon-root': {
//                 color: 'blue',
//                 transform: 'scale(1.4) rotateY(360deg)',
//                 transition: 'transform 1.1s ease-in-out, color 0.3s ease-in-out',
//               },
//             },
//           }}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <SearchRoundedIcon />
//               </InputAdornment>
//             ),
//             sx: {
//               "&::placeholder": {
//                 color: mode === 'dark' ? '#bbb' : '#888',
//               },
//             },
//           }}
//         />
//       </Box>

//       {isLoading ? (
//         <div style={{ display: 'flex', justifyContent: 'center' }}>
//           <Stack spacing={2}>
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
//         <div className="alert alert-warning" role="alert">
//           Error fetching results for "{q}"
//         </div>
//       ) : filteredArticles.length === 0 ? (
//         <div
//           className="alert alert-warning"
//           role="alert"
//           style={{ width: '50%', margin: '0 auto' }}
//         >
//           No results found for "{q}"
//         </div>
//       ) : (
//         <>
//           <div ref={newsCardsContainerRef}>
//             {filteredArticles.map((article, index) => (
//               <div
//                 key={index}
//                 ref={index === filteredArticles.length - 1 ? lastArticleRef : null}
//                 style={{ opacity: 0 }}
//               >
//                 <NewsCard {...article} />
//               </div>
//             ))}
//           </div>
//           {isFetchingNextPage && (
//             <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
//               <Skeleton animation="wave" variant="rounded" width={800} height={160} />
//             </div>
//           )}
//         </>
//       )}
//     </>
//   );
// };

// export default SearchResults;





// import React, { useEffect, useState, useContext, useRef, useCallback } from 'react';
// import { useInfiniteQuery } from '@tanstack/react-query';
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
// // import { gsap } from 'gsap';
// // import { ScrollTrigger } from 'gsap/ScrollTrigger';


// // Fetch function for react-query to retrieve articles
// const fetchSearchResults = async ({ pageParam = 0, queryKey }) => {
//   const [_, q, site, tbs, gl, location] = queryKey;
//   const token = localStorage.getItem('token');

//   const response = await axios.get(`${config.BACKEND_API}/api/search/${pageParam}`, {
//     headers: {
//       'Content-Type': 'application/json',
//       authorization: token ? `Bearer ${token}` : '',
//     },
//     params: { q, site, tbs, gl, location },
//   });

//   const articles = response.data?.articles;

//   // Stop fetching if no articles are found
//   if (!articles || articles.length === 0) {
//     setEndmessage('No more articles to show');
//     return { articles: [], noMoreData: true };
//   }

//   return response.data;
// };


// const SearchResults = (props) => {
//   const { mode } = useContext(ThemeContext);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filteredArticles, setFilteredArticles] = useState([]);
//   const [endmessage, setEndmessage] = useState('');
//   const observerRef = useRef(null);
//   const newsCardsContainerRef = useRef(null);

//   const { q, site, tbs, gl, location } = props.queries;

//   const {
//     data,
//     fetchNextPage,
//     hasNextPage,
//     isFetchingNextPage,
//     isLoading,
//     isError,
//   } = useInfiniteQuery({
//     queryKey: ['searchResults', q, site, tbs, gl, location],
//     queryFn: fetchSearchResults,
//     getNextPageParam: (lastPage, allPages) => (lastPage.noMoreData ? undefined : allPages.length),
//     staleTime: 6000000,
//     cacheTime: 6000000,
//     refetchOnWindowFocus: false,
//   });



//   const articles = data ? data.pages.flatMap(page => page.articles) : [];

//   useEffect(() => {
//     setFilteredArticles(
//       articles.filter(article =>
//         article.title.toLowerCase().includes(searchQuery.toLowerCase())
//       )
//     );
//   }, [searchQuery, articles]);


//   const lastArticleRef = useCallback(node => {
//     if (observerRef.current) observerRef.current.disconnect();
//     observerRef.current = new IntersectionObserver(entries => {
//       if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
//         fetchNextPage();
//       }
//     });
//     if (node) observerRef.current.observe(node);
//   }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

//   return (
//     <>
//       <h1>Search Results for "{q}"</h1>

//       <Box
//         sx={{
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           padding: '10px',
//           borderRadius: '25px',
//           transition: 'width 0.25s ease-in-out',
//         }}
//       >
//         <TextField
//           hiddenLabel
//           variant="outlined"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           placeholder="Search from given articles..."
//           sx={{
//             m: 1,
//             width: '400px',
//             height: '100%',
//             borderRadius: '25px',
//             bgcolor: mode === 'dark' ? '#444' : 'rgb(251, 248, 248)',
//             transition: 'width 0.25s ease-in-out',
//             "& .MuiOutlinedInput-root": {
//               borderRadius: '25px',
//               "& fieldset": {
//                 borderColor: "transparent",
//               },
//               "&:hover fieldset": {
//                 borderColor: "transparent",
//               },
//               "&.Mui-focused fieldset": {
//                 borderColor: "transparent",
//               },
//             },
//             "&:hover": {
//               bgcolor: mode === 'dark' ? '#555' : 'rgb(240, 240, 240)',
//             },
//             '&:focus-within': {
//               width: '600px',
//               bgcolor: mode === 'dark' ? '#555' : 'rgb(240, 240, 240)',
//               '& .MuiInputAdornment-root .MuiSvgIcon-root': {
//                 color: 'blue',
//                 transform: 'scale(1.4) rotateY(360deg)',
//                 transition: 'transform 1.1s ease-in-out, color 0.3s ease-in-out',
//               },
//             },
//           }}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <SearchRoundedIcon />
//               </InputAdornment>
//             ),
//             sx: {
//               "&::placeholder": {
//                 color: mode === 'dark' ? '#bbb' : '#888',
//               },
//             },
//           }}
//         />
//       </Box>

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
//         <div className="alert alert-warning" role="alert">
//           Error fetching results for "{q}"
//         </div>
//       ) : filteredArticles.length === 0 ? (
//         <div
//           className="alert alert-warning"
//           role="alert"
//           style={{ width: '40%', margin: '0 auto', zIndex: -1, textAlign: 'center' }}
//         >
//           Looks like the news has left you hanging. Try a better search!
//         </div>
//       ) : (
//         <>
//           <div ref={newsCardsContainerRef}>
//             {filteredArticles.map((article, index) => (
//               <div
//                 key={index}
//                 ref={index === filteredArticles.length - 1 ? lastArticleRef : null}
//               >
//                 <NewsCard
//                   title={article.title}
//                   someText={article.someText}
//                   imgURL={article.imgURL}
//                   link={article.link}
//                   time={article.time}
//                   providerImg={article.providerImg}
//                   providerName={article.providerName}
//                 />
//               </div>
//             ))}
//           </div>
//           {isFetchingNextPage && (
//             <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
//               <Skeleton animation="wave" variant="rounded" width={800} height={160} />
//             </div>
//           )}
//           {
//             endmessage && (
//               <div className="alert alert-warning" role="alert" style={{ width: '40%', margin: '0 auto', zIndex: -1, textAlign: 'center' }}>
//                 {endmessage}
//               </div>
//             )
//           }
//         </>
//       )}
//     </>
//   );
// };

// export default SearchResults;


import React, { useEffect, useState, useContext, useRef, useCallback, useMemo } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import NewsCard from '../components/NewsCard';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import InputAdornment from '@mui/material/InputAdornment';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { ThemeContext } from '../context/ThemeContext';
import config from '../config';

// Fetch function for react-query to retrieve articles
const fetchSearchResults = async ({ pageParam = 0, queryKey }) => {

  // eslint-disable-next-line
  const [_unused, q, site, tbs, gl, location] = queryKey;
  const token = localStorage.getItem('token');

  const response = await axios.get(`${config.BACKEND_API}/api/search/${pageParam}`, {
    headers: {
      'Content-Type': 'application/json',
      authorization: token ? `Bearer ${token}` : '',
    },
    params: { q, site, tbs, gl, location },
  });

  const articles = response.data?.articles;

  // Return message if no articles are found
  if (!articles || articles.length === 0) {
    return { articles: [], noMoreData: true, endMessage: 'No more articles to show' };
  }

  return { articles, noMoreData: false, endMessage: '' };
};

const SearchResults = (props) => {
  const { mode } = useContext(ThemeContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredArticles, setFilteredArticles] = useState([]);
  const observerRef = useRef(null);
  const newsCardsContainerRef = useRef(null);

  const { q, site, tbs, gl, location } = props.queries;

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ['searchResults', q, site, tbs, gl, location],
    queryFn: fetchSearchResults,
    getNextPageParam: (lastPage, allPages) => (lastPage.noMoreData ? undefined : allPages.length),
    staleTime: 6000000,
    cacheTime: 6000000,
    refetchOnWindowFocus: false,
  });

  const articles = useMemo(() => {
    return data ? data.pages.flatMap(page => page.articles) : [];
  }, [data]);


  useEffect(() => {
    setFilteredArticles(
      articles.filter(article =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, articles]);

  const lastArticleRef = useCallback(node => {
    if (observerRef.current) observerRef.current.disconnect();
    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    });
    if (node) observerRef.current.observe(node);
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <>
      <h1>Search Results for "{q}"</h1>

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

      {isLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Stack spacing={2} sx={{ display: 'flex', justifyContent: 'center' }}>
            {[1, 2, 3, 4, 5, 6, 7].map((_, index) => (
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
        <div className="alert alert-warning" role="alert">
          Error fetching results for "{q}"
        </div>
      ) : filteredArticles.length === 0 ? (
        <div
          className="alert alert-warning"
          role="alert"
          style={{ width: '40%', margin: '0 auto', zIndex: -1, textAlign: 'center' }}
        >
          Looks like the news has left you hanging. Try a better search!
        </div>
      ) : (
        <>
          <div ref={newsCardsContainerRef}>
            {filteredArticles.map((article, index) => (
              <div
                key={index}
                ref={index === filteredArticles.length - 1 ? lastArticleRef : null}
              >
                <NewsCard
                  title={article.title}
                  someText={article.someText}
                  imgURL={article.imgURL}
                  link={article.link}
                  time={article.time}
                  providerImg={article.providerImg}
                  providerName={article.providerName}
                />
              </div>
            ))}
          </div>
          {isFetchingNextPage && (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
              <Skeleton animation="wave" variant="rounded" width={800} height={160} />
            </div>
          )}
          
        </>
      )}
    </>
  );
};

export default SearchResults;
