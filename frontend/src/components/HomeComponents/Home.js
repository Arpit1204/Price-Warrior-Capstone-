import React from "react";
import HomeTop from "./HomeTopComponent/HomeTop";
import LatestGame from "./LatestGames/LatestGame";
import UpcomingGames from "./UpcomingGames/UpcomingGames";
import Something from "./Something/Something";
import { useState, useEffect } from "react";
import axios from "axios";
import loadin from '../asseets/loadinghd8.gif'



function Home({mainRef}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const apiCallGame = async()=>{
      const res = await axios.get(`${process.env.REACT_APP_DataBase_link_to_Access_data}/gameGet`)
        
          setData(res.data);
          setTimeout(()=>{
            setLoading(false)
          },2000)
       

    }
    apiCallGame();
  }, []);
  

  return (
    <div>
      
      {loading?(
        <div className="loading-ani-main">
        <img width='250' src={loadin}/>
        <h2>Loading... Plz Stand By!</h2>
        </div>
      ):(
        <>
        <HomeTop />
        <Something mainRef = {mainRef} />
        <LatestGame data={data}/>
        <UpcomingGames data={data}/>
        
      </>
)}
    </div>

  );
}

export default Home;
