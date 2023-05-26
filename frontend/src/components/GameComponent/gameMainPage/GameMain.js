import React, { useState } from "react";
import "../../HomeComponents/Home.css";
import "./gameMain.css";
import { Link } from "react-router-dom";
import { MdDelete, MdEdit, MdTrendingUp } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { useAuth0 } from "@auth0/auth0-react";

const GameList = ({List, setList}) => {

  const [search, setSearch] = useState("");

  
  const { user, isAuthenticated } = useAuth0();
  const handleDelete = (id) => {
    
    fetch(
      `${process.env.REACT_APP_DataBase_link_to_Access_data}/gameDelete/${id}`,
      {
        method: "DELETE",
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
        {isAuthenticated && (user.email === "arpit.gulati@kalvium.community" || user.email === "kasinath.sg@kalvium.community" || user.email === "sarthaksri2003@gmail.com") && (
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

                  {isAuthenticated &&
                    (user.email === "arpit.gulati@kalvium.community" || user.email === "kasinath.sg@kalvium.community" || user.email === "sarthaksri2003@gmail.com") && (
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
