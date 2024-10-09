import React, { useEffect, useState } from 'react';
import NewsCard from '../components/NewsCard';
import { GET } from '../api.js';



const LoggedHome = () => {
  
  const [articles, setArticles] = useState([]);

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


  return (
    <>
      {articles.length > 0 ? articles?.map((article, index) => (
        article && 
        <NewsCard
          key={index}
          title={article.title}
          link={article.link}
          time={article.time}
          imageURL={article.imageURL}
          providerImg={article.providerImg}
        />
      )) : <>
          <div>NO NEWS</div>
      </>}
    </>
  );

};

export default LoggedHome;