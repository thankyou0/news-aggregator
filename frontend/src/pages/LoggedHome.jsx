import React, { useEffect, useState } from 'react';
import NewsCard from '../components/NewsCard';
import { GET } from '../api.js';
import Skelaton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';


const LoggedHome = () => {
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
      <input
        type="text"
        placeholder="Search from given articles..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ width: "200px" }}
      />
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