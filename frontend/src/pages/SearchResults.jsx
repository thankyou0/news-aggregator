import React, { useEffect, useCallback, useState } from 'react';
import config from '../config';
import axios from 'axios';
import NewsCard from '../components/NewsCard';
import Skelaton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

const SearchResults = (props) => {

  const [articles, setArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);

  
  const fetchSearchResults = useCallback(async () => {
    try {

      const response = await axios.get(config.BACKEND_API + "/api/search", {
        headers: {
          'Content-Type': 'application/json',
          'authorization': "Bearer " + localStorage.getItem("token")
        },
        params: {
          q: props.query
        }
      });

      if (response.data.articles.length === 0) {
        setIsEmpty(true);
      } else {
        setArticles(response.data.articles);
        setIsEmpty(false);
      }
    } catch (error) {
      console.error("GET request error:", error);
      return { success: false, message: "An error occurred while fetching data." };
    }
  }, [props.query]);


  useEffect(() => {
    fetchSearchResults();
  }, [fetchSearchResults]);

  useEffect(() => {
    setFilteredArticles(
      articles.filter(article =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, articles]);

  return (
    <>
      <h1>Search Results for "{props.query}"</h1>
      <input
        type="text"
        placeholder="Search from given articles..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ width: "200px" }}
      />
      {isEmpty ? (
        <div className="alert alert-warning" role="alert">
          No results found for "{props.query}"
        </div>
      ) : (
        filteredArticles.length > 0 ? filteredArticles.map((article, index) => (
          article &&
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
        )) : <div>Loading...
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Stack spacing={2} sx={{ display: "flex", justifyContent: "center" }}>
                  {[1, 2, 3, 4, 5, 6, 7].map((item, index) => (
                    <Skelaton animation="wave" key={index} variant="rounded" width={800} height={160} />
                  ))}
                </Stack>
              </div>
        </div>
      )}
    </>
  );
};

export default SearchResults;

