import Game from "./gameTop/Game";
import Nav from "./gameSectionNav/Nav";
import Prices from "./gameparts/Prices";
import axios from 'axios'
import About from "./gameparts/About";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import loadin from '../asseets/loadinghd7.gif'
import UserList from "../AdminOnlyZone/userList";
import { RiAdminFill } from "react-icons/ri";

function GameFinal() {
  const { id } = useParams();
  console.log(id);
  const [gameData, setGameData] = useState();
  const [loading, setLoading] = useState(true)
  const [selectedButton, setSelectedButton] = useState("Prices");

  useEffect(() => {
    const apiCall = async ()=>{
      const res=  await axios.get(`${process.env.REACT_APP_DataBase_link_to_Access_data}/gameGet/${id}`)
        
      setGameData(res.data);
      setTimeout(()=>{
        setLoading(false)
      },2000)
      
        

    }
    apiCall();
  }, [id]);

  

  return (
    <div className="gamefinal" >
      
    {loading ? (
      <div className="loading-ani">
         <img  src={loadin}/>
         <h2>Loading...</h2>

     </div>
    ):(
 <div className="gamefinal" style={{backgroundColor: 'rgb(115 108 108)'}}>
 <Game
   name={gameData.name}
   lastName={gameData.lastName}
   img={gameData.detailImage}
   edition={gameData.editions}
   rating={gameData.rating}
   currentMin={gameData.currentMin}
   currentAvg={gameData.currentAvg}
   currentMax={gameData.currentMax}
   historyMin={gameData.historyMin}
   historyAvg={gameData.historyAvg}
   historyMax={gameData.historyMax}
   carouselImage={gameData.crouselImage}
   sentence = {gameData.sentence}
   createdAt = {gameData.createdAt}
 />

 <Nav setSelectedButton={setSelectedButton} />

 {selectedButton === "Prices" && (
   <Prices
     img={gameData.detailImage}
     releaseDate={gameData.releaseDate}
     developer={gameData.developer}
     publisher={gameData.publisher}
     genres={gameData.genres}
     tags={gameData.tags}
     prices={gameData.prices}
     carouselImage={gameData.crouselImage}
   />
 )}

 {selectedButton === "About" && (
   <About
     description={gameData.description}
     relatedLinks={gameData.relatedLinks}
     minimumRequirements={gameData.minimumRequirements}
     recommendedRequirements={gameData.recommendedRequirements}
     trailer={gameData.trailer}
     releaseDate={gameData.releaseDate}
     developer={gameData.developer}
     publisher={gameData.publisher}
     genres={gameData.genres}
     tags={gameData.tags}
   />
 )}

 {
  selectedButton.includes('Admin') && (
    <UserList/>
  )
 }
</div>
    )}
    
     
    
  </div>
  );
}

export default GameFinal;
