/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import './Explore.css'
import { useNavigate } from 'react-router-dom';

const Explore = () => {

  const navigate = useNavigate();

  const [selectedButton, setSelectedButton] = useState(0);

  const [sideBarData, setSideBarData] = useState({
    searchTerm: '',
    category: 'all'
  })

  const [loading, setLoading] = useState(false);

  const [blogs, setBlogs] = useState([]);

  console.log(blogs)

  const categoryArray = ['all', 'technology', 'lifestyle', 'business_and_finance', 'entertainment', 'science_and_education', 'personal', 'others'];

  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search);

    const searchTermFromUrl = urlParams.get('searchTerm');
    const categoryFromUrl = urlParams.get('category');


    if(searchTermFromUrl || categoryFromUrl){
        setSideBarData({
            searchTerm: searchTermFromUrl || '',
            category: categoryFromUrl || categoryArray[selectedButton],
        })
    }

    const fetchBlogs = async ()=>{
        setLoading(true);
        
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/blog/get?${searchQuery}`);
        const data = await res.json();

        console.log(data);
        // if(data.length > 8){
        //     setShowMore(true);
        // }else{
        //     setShowMore(false);
        // }

        setBlogs(data);
        setLoading(false);

    }

    fetchBlogs();

  }, [location.search])

  const handleClick = async (buttonId)=>{

    setSelectedButton(buttonId);

    handleFind(buttonId);


  }

  const handleFind = (id)=>{


    const urlParams = new URLSearchParams();
    urlParams.set('category', categoryArray[id]);

    urlParams.set('searchTerm', sideBarData.searchTerm);

    const searchQuery = urlParams.toString();


    navigate(`/search?${searchQuery}`);
  }

  console.log(selectedButton);

  return (
    <main>
      <div className="blogOptionsBlock">
        <h3>CATEGORY:</h3>
        <div className="blogOptions">
          <button className={sideBarData.category === 'all' ? 'active': ''} onClick={()=>handleClick(0)} id='all'>All</button>
          <button className={sideBarData.category === 'technology' ? 'active': ''} onClick={()=>handleClick(1)} id='technology'>Technology</button>
          <button className={sideBarData.category === 'lifestyle' ? 'active': ''} onClick={()=>handleClick(2)} id='lifestyle'>Lifestyle</button>
          <button className={sideBarData.category === 'business_and_finance' ? 'active': ''} onClick={()=>handleClick(3)} id='business_and_finance'>Business and Finance</button>
          <button className={sideBarData.category === 'entertainment' ? 'active': ''} onClick={()=>handleClick(4)} id='entertainment'>Entertainment</button>
          <button className={sideBarData.category === 'science_and_education' ? 'active': ''} onClick={()=>handleClick(5)} id='science_and_education'>Science and Education</button>
          <button className={sideBarData.category === 'personal' ? 'active': ''} onClick={()=>handleClick(6)} id='personal'>Personal</button>
          <button className={sideBarData.category === 'others' ? 'active': ''} onClick={()=>handleClick(7)} id='others'>Others</button>
        </div>
      </div>
      <div className="blogsFound">
        <h2>BLOGS:</h2>
      </div>
      
    </main>
  )
}

export default Explore
