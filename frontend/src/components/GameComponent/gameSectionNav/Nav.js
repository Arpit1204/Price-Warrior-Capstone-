import React from "react";
import { Route, Routes, Link } from "react-router-dom";
import { RiAdminFill } from "react-icons/ri";
import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";

function Nav({ setSelectedButton }) {
  const [userDetail, setUserDetail] = useState([])



  const Token=sessionStorage.getItem("token")
  useEffect(()=>{
    console.log(userDetail);
  },[userDetail])
  useEffect(() => {
    // Get the JWT token from local storage or another source

    if (Token) {
      try {
        // Decode the JWT token
        const decodedToken = jwt_decode(Token);
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
  }, [Token]);
  const handleClick = (e) => {
    setSelectedButton(e.target.innerText);
    console.log(e);

    const a = document.getElementsByClassName("nav-heading");
    for (let i = 0; i < a.length; i++) {
      if (a[i].hasAttribute("id", "active-price-route")) {
        a[i].removeAttribute("id", "active-price-route");
      }
    }
    e.target.setAttribute("id", "active-price-route");
  };

  return (
    <div className="nav-outer-div">
      <nav className="game-nav">
        <ul className="ul-scrollbar" id="game-scroll">
          <li
            className="nav-heading"
            id="active-price-route"
            onClick={handleClick}
          >
            Prices
          </li>
          <li className="nav-heading" onClick={handleClick}>
            About
          </li>

          {userDetail && userDetail.isAdmin && (
           
              
                <li 
                className="nav-heading"
                onClick={handleClick}> 
           Admin <RiAdminFill/>
           </li> 
          
          
          )}
         
        </ul>
      </nav>
    </div>
  );
}

export default Nav;
