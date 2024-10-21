// import React, { useEffect, useState, useContext } from 'react';
// import NewsCard from '../components/NewsCard';
// import { GET } from '../api.js';
// import Skeleton from '@mui/material/Skeleton';
// import Stack from '@mui/material/Stack';
// import InputAdornment from '@mui/material/InputAdornment';
// import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
// import TextField from '@mui/material/TextField';
// import Box from '@mui/material/Box';
// import { ThemeContext } from '../context/ThemeContext';
// import { useQuery } from '@tanstack/react-query';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';

// gsap.registerPlugin(ScrollTrigger); // Register the ScrollTrigger plugin

// const LoggedHome = () => {
//   const { mode } = useContext(ThemeContext);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filteredArticles, setFilteredArticles] = useState([]);

//   // Fetching data using useQuery
//   const { data: articles = [], isLoading, isError } = useQuery({
//     queryKey: ['top_stories'], // Set the query key
//     queryFn: async () => {
//       const resultFromBackend = await GET('/api/algorithms/top_stories');
//       if (resultFromBackend.data.success) {
//         return resultFromBackend.data.articles;
//       } else {
//         throw new Error('Error fetching data from backend');
//       }
//     },
//     onError: (error) => {
//       console.error("GET request error:", error);
//     },
//     staleTime: 6000000, // 100 minutes
//     cacheTime: 6000000,
//     refetchOnWindowFocus: false,
//     refetchOnReconnect: false,
//     retry: false, // Disable retries on error if not needed
//   });

//   // Filtering articles based on search query
//   useEffect(() => {
//     setFilteredArticles(
//       articles.filter(article =>
//         article.title.toLowerCase().includes(searchQuery.toLowerCase())
//       )
//     );
//   }, [searchQuery, articles]);

//   // GSAP Animation Setup
//   useEffect(() => {
//     gsap.defaults({ ease: "power3" });
//     gsap.set(".box", { y: 100 });

//     ScrollTrigger.batch(".box", {
//       onEnter: batch => gsap.to(batch, { opacity: 1, y: 0, stagger: { each: 0.15, grid: [1, 3] }, overwrite: true }),
//       onLeave: batch => gsap.set(batch, { opacity: 0, y: -100, overwrite: true }),
//       onEnterBack: batch => gsap.to(batch, { opacity: 1, y: 0, stagger: 0.15, overwrite: true }),
//       onLeaveBack: batch => gsap.set(batch, { opacity: 0, y: 100, overwrite: true }),
//     });

//     return () => {
//       ScrollTrigger.getAll().forEach(trigger => trigger.kill()); // Clean up the ScrollTriggers on component unmount
//     };
//   }, [filteredArticles]); // Re-run effect when filteredArticles changes

//   return (
//     <>
//       <Box
//         sx={{
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           padding: '10px',
//           borderRadius: '25px', // Adjust the value as needed
//           transition: 'width 0.25s ease-in-out', // Smooth transition
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
//             borderRadius: '25px', // Adjust the value as needed
//             bgcolor: mode === 'dark' ? '#444' : 'rgb(173, 73, 73)', // Background color for both modes
//             transition: 'width 0.25s ease-in-out', // Smooth transition
//             "& .MuiOutlinedInput-root": {
//               borderRadius: '25px', // Adjust the value as needed
//               "& fieldset": {
//                 borderColor: "transparent", // Initial border color
//               },
//               "&:hover fieldset": {
//                 borderColor: "transparent", // Border color on hover
//               },
//               "&.Mui-focused fieldset": {
//                 borderColor: "transparent", // Border color on focus
//               },
//             },
//             "&:hover": {
//               bgcolor: mode === 'dark' ? '#555' : 'rgb(240, 240, 240)', // Background color on hover
//             },
//             '&:focus-within': {
//               width: '600px', // Increase width on focus/typing
//               bgcolor: mode === 'dark' ? '#555' : 'rgb(240, 240, 240)', // Background color on focus
//               '& .MuiInputAdornment-root .MuiSvgIcon-root': {
//                 color: 'blue', // Change color on focus
//                 transform: 'scale(1.4) rotateY(360deg)', // Increase size on focus
//                 transition: 'transform 1.1s ease-in-out, color 0.3s ease-in-out', // Smooth transition for size and color change
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
//                 color: mode === 'dark' ? '#bbb' : '#888', // Placeholder color for both modes
//               },
//             },
//           }}
//         />
//       </Box>

//       {isLoading ? ( // Show skeleton while loading
//         <div style={{ display: "flex", justifyContent: "center" }}>
//           <Stack spacing={2} sx={{ display: "flex", justifyContent: "center" }}>
//             {[1, 2, 3, 4, 5, 6, 7].map((item, index) => (
//               <Skeleton animation="wave" key={index} variant="rounded" width={800} height={140} />
//             ))}
//           </Stack>
//         </div>
//       ) : isError ? ( // Show error message if there's an error
//         <div style={{ display: "flex", justifyContent: "center" }}>
//           <span>Error fetching articles.</span>
//         </div>
//       ) : (
//         filteredArticles.length > 0 ? (
//           filteredArticles.map((article, index) => (
//             article && (
//               <div className="box" key={index}>
//                 <NewsCard
//                   title={article.title}
//                   link={article.link}
//                   time={article.time}
//                   providerImg={article.providerImg}
//                 />
//               </div>
//             )
//           ))
//         ) : (
//           <div style={{ display: "flex", justifyContent: "center" }}>
//             <Stack spacing={2} sx={{ display: "flex", justifyContent: "center" }}>
//               {[1, 2, 3, 4, 5, 6, 7].map((item, index) => (
//                 <Skeleton animation="wave" key={index} variant="rounded" width={800} height={140} />
//               ))}
//             </Stack>
//           </div>
//         )
//       )}
//     </>
//   );
// };

// export default LoggedHome;

// import React, { useEffect, useState, useContext } from 'react';
// import NewsCard from '../components/NewsCard';
// import { GET } from '../api.js';
// import Skeleton from '@mui/material/Skeleton';
// import Stack from '@mui/material/Stack';
// import InputAdornment from '@mui/material/InputAdornment';
// import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
// import TextField from '@mui/material/TextField';
// import Box from '@mui/material/Box';
// import { ThemeContext } from '../context/ThemeContext';
// import { useQuery } from '@tanstack/react-query';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import InfiniteScroll from 'react-infinite-scroll-component';

// gsap.registerPlugin(ScrollTrigger);

// const LoggedHome = () => {
//   const { mode } = useContext(ThemeContext);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filteredArticles, setFilteredArticles] = useState([]);
//   const [displayedArticles, setDisplayedArticles] = useState([]);
//   const [hasMore, setHasMore] = useState(true);
//   const PAGE_SIZE = 15;

//   // Fetching data using useQuery
//   const { data: articles = [], isLoading, isError } = useQuery({
//     queryKey: ['top_stories'],
//     queryFn: async () => {
//       const resultFromBackend = await GET('/api/algorithms/top_stories');
//       if (resultFromBackend.data.success) {
//         return resultFromBackend.data.articles;
//       } else {
//         throw new Error('Error fetching data from backend');
//       }
//     },
//     onError: (error) => {
//       console.error("GET request error:", error);
//     },
//     staleTime: 6000000,
//     cacheTime: 6000000,
//     refetchOnWindowFocus: false,
//     refetchOnReconnect: false,
//     retry: false,
//   });

//   // Filtering articles based on search query
//   useEffect(() => {
//     const filtered = articles.filter(article =>
//       article.title.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//     setFilteredArticles(filtered);
//     setDisplayedArticles(filtered.slice(0, PAGE_SIZE));
//     setHasMore(filtered.length > PAGE_SIZE);
//   }, [searchQuery, articles]);

//   // GSAP Animation Setup
//   useEffect(() => {
//     gsap.defaults({ ease: "power3" });
//     gsap.set(".box", { y: 100 });

//     ScrollTrigger.batch(".box", {
//       onEnter: batch => gsap.to(batch, { opacity: 1, y: 0, stagger: { each: 0.15, grid: [1, 3] }, overwrite: true }),
//       onLeave: batch => gsap.set(batch, { opacity: 0, y: -100, overwrite: true }),
//       onEnterBack: batch => gsap.to(batch, { opacity: 1, y: 0, stagger: 0.15, overwrite: true }),
//       onLeaveBack: batch => gsap.set(batch, { opacity: 0, y: 100, overwrite: true }),
//     });

//     return () => {
//       ScrollTrigger.getAll().forEach(trigger => trigger.kill());
//     };
//   }, [displayedArticles]);

//   // Function to load more articles
//   const loadMoreArticles = () => {
//     const currentLength = displayedArticles.length;
//     const moreArticles = filteredArticles.slice(currentLength, currentLength + PAGE_SIZE);
//     setDisplayedArticles(prevArticles => [...prevArticles, ...moreArticles]);
//     setHasMore(currentLength + PAGE_SIZE < filteredArticles.length);
//   };

//   return (
//     <>
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
//         <div style={{ display: "flex", justifyContent: "center" }}>
//           <Stack spacing={2} sx={{ display: "flex", justifyContent: "center" }}>
//             {[1, 2, 3, 4, 5, 6, 7].map((item, index) => (
//               <Skeleton animation="wave" key={index} variant="rounded" width={800} height={140} />
//             ))}
//           </Stack>
//         </div>
//       ) : isError ? (
//         <div style={{ display: "flex", justifyContent: "center" }}>
//           <span>Error fetching articles.</span>
//         </div>
//       ) : (
//         <InfiniteScroll
//           dataLength={displayedArticles.length}
//           next={loadMoreArticles}
//           hasMore={hasMore}
//           loader={
//             <div style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
//               <Skeleton animation="wave" variant="rounded" width={800} height={140} />
//             </div>
//           }
//           endMessage={
//             <p style={{ textAlign: 'center' }}>
//               <b>Yay! You have seen it all</b>
//             </p>
//           }
//           scrollableTarget="scrollableDiv"
//           scrollThreshold="200px"
//         >
//           {displayedArticles.map((article, index) => (
//             article && (
//               <div className="box" key={index}>
//                 <NewsCard
//                   title={article.title}
//                   link={article.link}
//                   time={article.time}
//                   providerImg={article.providerImg}
//                 />
//               </div>
//             )
//           ))}
//         </InfiniteScroll>
//       )}
//     </>
//   );
// };

// export default LoggedHome;


import React, { useEffect, useState, useContext } from 'react';
import NewsCard from '../components/NewsCard';
import { GET } from '../api.js';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import InputAdornment from '@mui/material/InputAdornment';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { ThemeContext } from '../context/ThemeContext';
import { useQuery } from '@tanstack/react-query';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import InfiniteScroll from 'react-infinite-scroll-component';

gsap.registerPlugin(ScrollTrigger);

const LoggedHome = () => {
  const { mode } = useContext(ThemeContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [displayedArticles, setDisplayedArticles] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const PAGE_SIZE = 15;

  // Fetching data using useQuery
  const { data: articles = [], isLoading, isError } = useQuery({
    queryKey: ['top_stories'],
    queryFn: async () => {
      const resultFromBackend = await GET('/api/algorithms/top_stories');
      if (resultFromBackend.data.success) {
        return resultFromBackend.data.articles;
      } else {
        throw new Error('Error fetching data from backend');
      }
    },
    onError: (error) => {
      console.error("GET request error:", error);
    },
    staleTime: 6000000,
    cacheTime: 6000000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  });

  // Filtering articles based on search query
  useEffect(() => {
    const filtered = articles.filter(article =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredArticles(filtered);
    setDisplayedArticles(filtered.slice(0, PAGE_SIZE));
    setHasMore(filtered.length > PAGE_SIZE);
  }, [searchQuery, articles]);

  // GSAP Animation Setup
  useEffect(() => {
    gsap.defaults({ ease: "power3" });
    gsap.set(".box", { y: 100 });

    ScrollTrigger.batch(".box", {
      onEnter: batch => gsap.to(batch, { opacity: 1, y: 0, stagger: { each: 0.15, grid: [1, 3] }, overwrite: true }),
      onLeave: batch => gsap.set(batch, { opacity: 0, y: -100, overwrite: true }),
      onEnterBack: batch => gsap.to(batch, { opacity: 1, y: 0, stagger: 0.15, overwrite: true }),
      onLeaveBack: batch => gsap.set(batch, { opacity: 0, y: 100, overwrite: true }),
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [displayedArticles]);

  // Function to load more articles
  const loadMoreArticles = () => {

    setTimeout(() => {
      const currentLength = displayedArticles.length;
      const moreArticles = filteredArticles.slice(currentLength, currentLength + PAGE_SIZE);
      setDisplayedArticles(prevArticles => [...prevArticles, ...moreArticles]);
      setHasMore(currentLength + PAGE_SIZE < filteredArticles.length);
    }, 500);
  };

  return (
    <div style={{ overflow: 'visible' }}>  {/* This ensures the content isn't constrained */}
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
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Stack spacing={2} sx={{ display: "flex", justifyContent: "center" }}>
            {[1, 2, 3, 4, 5, 6, 7].map((item, index) => (
              <Skeleton animation="wave" key={index} variant="rounded" width={800} height={140} />
            ))}
          </Stack>
        </div>
      ) : isError ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <span>Error fetching articles.</span>
        </div>
      ) : (
        <InfiniteScroll
          dataLength={displayedArticles.length}
          next={loadMoreArticles}
          hasMore={hasMore}
          loader={
            <div style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
              <Skeleton animation="wave" variant="rounded" width={800} height={140} />
            </div>
          }
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
          style={{ overflow: 'visible' }} 
        >
          {displayedArticles.map((article, index) => (
            article && (
              <div className="box" key={index}>
                <NewsCard
                  title={article.title}
                  link={article.link}
                  time={article.time}
                  providerImg={article.providerImg}
                />
              </div>
            )
          ))}
        </InfiniteScroll>
      )}
    </div>
  );
};

export default LoggedHome;




// 0.4 0.1 20