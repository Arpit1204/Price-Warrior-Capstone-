import React, { useState } from "react";
import "../../HomeComponents/Home.css";
import "./gameMain.css";
import { Link } from "react-router-dom";
import { MdDelete, MdEdit, MdTrendingUp } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { useAuth0 } from "@auth0/auth0-react";
import  {  useEffect } from 'react';
import jwt_decode from 'jwt-decode'

const GameList = ({List, setList}) => {

  const [search, setSearch] = useState("");
  const [userDetail, setUserDetail] = useState([]);

  const Token=sessionStorage.getItem("token")
  useEffect(()=>{
    console.log("detail",userDetail);
  },[userDetail])
  useEffect(() => {
    // Get the JWT token from local storage or another source

    if (Token) {
      try {
        // Decode the JWT token
        const decodedToken = jwt_decode(Token);
        console.log(decodedToken)
// 
        // Extract the user ID from the decoded token
        const userId = decodedToken._id;

        // Fetch the user profile data from Atlas API using the user ID
        fetch(`${process.env.REACT_APP_DataBase_link_to_Access_data}/user/${userId}`)
          .then(res => res.json())
          .then(data => {
            setUserDetail(data);
          });
      } catch (error) {
        console.error('Error decoding JWT token:', error);
      }
    }
  }, []);
  
  

  const handleDelete = (id) => {
    
    fetch(
      `${process.env.REACT_APP_DataBase_link_to_Access_data}/gameDelete/${id}`,
      {
        method: "DELETE",


        headers: {
          'Authorization': 'Bearer ' + Token,
          "Content-type": "application/json; charset=UTF-8",
        }
      }
    );
    setList((prev) => prev.filter((elt) => elt._id !== id));
  };

  const SearchGame = List.filter((e) => {
    const searchedTerm = search.toLocaleLowerCase().trim();
    const fullGameName = e.name + e.lastName;
    const fullName = fullGameName.toLocaleLowerCase();
    return (
      fullName.includes(searchedTerm) ||
      (fullName.startsWith(searchedTerm) && fullName !== searchedTerm)
    );
  });
  console.log(SearchGame);

  console.log(List);
  return (
    <div>
      <div className="outer-box">
      {userDetail && userDetail.isAdmin && (
          <div className="box">
            <input
              type="search"
              placeholder="Only For Admin To Search "
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <a>
              <FaSearch className="fas" />
            </a>
          </div>
        )}
      </div>
      <div className="game-page-list">
        <div className="game-page-listCard">
          {SearchGame.map((game, index) => {
            return (
              <div key={index}>
                <div className="game-page-card">
                  <img className="game-page-cards-img" src={game.homeImage} />

                  
                  {userDetail && userDetail.isAdmin &&(
                    <div className="delete-edit">
                        
                    <div onClick={() => {if(window.confirm('Do you realy want to delete?')){handleDelete(game._id)}} }>
                      
                      <MdDelete
                        style={{ color: "#fff", fontSize: "2.5rem" }}
                      />
                    </div>

                    <div className="delete">
                      <Link to={`/adminopput/${game._id}`}>
                        <MdEdit
                          style={{ color: "#fff", fontSize: "2.5rem" }}
                        />
                      </Link>
                    </div>
                  </div>
                  )}  
                      
                    
                  <Link
                    to={`/games/${game._id}`}
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    <div className="game-page-card-overlay">
                      <div>
                        <div className="game-page-card-title">
                          {game.name}{" "}
                          <span style={{ color: "#FFB800" }}>
                            {game.lastName}
                          </span>
                        </div>
                        <div className="game-page-card-runtime">
                          <span style={{ color: "#FFB800" }}>
                            {game.homeGenre}
                          </span>
                          <span className="game-page-card-rating">
                            {game.rating}
                          </span>
                        </div>

                        <div className="game-page-card-desc">
                          {game.description.slice(0, 130) + "..."}
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GameList;
