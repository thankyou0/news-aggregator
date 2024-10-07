import React, { useEffect } from 'react'
import NewsCard from '../components/NewsCard'


const handledata = async () => {

  
}


const LoggedHome = () => {

  
  useEffect(() => { 
    handledata();
  }, []);
  
  
  return (
    <>
    <NewsCard/>
    </>
  )
}

export default LoggedHome