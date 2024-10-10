import React, { useEffect, useState } from 'react';
import NewsCard from '../components/NewsCard';
import { GET } from '../api.js';



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
      )) : <div>NO NEWS</div>}
    </>
  );

};

export default LoggedHome;