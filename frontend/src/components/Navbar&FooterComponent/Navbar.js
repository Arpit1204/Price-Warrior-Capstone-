import "./navbar&footer.css";
import { FaSearch, FaHome, FaTags, FaGamepad, FaPlus } from "react-icons/fa";
import { FcAbout } from "react-icons/fc";
import { Button } from "@mui/material";
import logo from "../asseets/logo.png";
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LoginButton from "../RegistrationForm/LoginButton";
import { RiAdminFill } from "react-icons/ri";
import axios from "axios";
import logoPrice from "../asseets/logoPrice2.png";
import PersonIcon from "@mui/icons-material/Person";
import jwt_decode from 'jwt-decode'
import { MdLogout } from "react-icons/md";


function Navbar({ mainRef }) {
  const [isHovered, setIsHovered] = useState(false);
  const [value, setValue] = useState("");
  const [data, setData] = useState([]);
  const [alert, setAlert] = useState(false);
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
  useEffect(() => {
    console.log(data);
  }, [data]);
  useEffect(() => {
    const searchList = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_DataBase_link_to_Access_data}/gameMainGet`
      );
      setData(res.data);
    };
    searchList();
  }, []);

  const userName = sessionStorage.getItem("username")
  console.log(userName);
  const { user, isAuthenticated } = useAuth0();

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleSearch = () => {
    const searchForm = document.querySelector(".search-form");
    searchForm.classList.toggle("active");
  };

  const reverseSearch = () => {
    const searchForm = document.querySelector(".search-form");
    searchForm.classList.toggle("active");
    setValue("");
  };

  const handleClick = (e) => {
    e.target.setAttribute("class", "skewBackGround");
  };

  const handleLeave = (e) => {
    e.target.removeAttribute("class", "skewBackGround");
  };

  const handleScroll = (ref) => {
    
    window.scrollTo({
      top: ref.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };

  const logout = ()=>{
    sessionStorage.clear()
    
    setAlert(false)
    window.location.href = '/'
  }

  const takeToAdminPage=()=>{
    setAlert(false)
  }
  return (
    <>
      <header className="header">
        <div className="header-1">
          <div className="outer-logoPrice">
            <img className="logoPrice" src={logoPrice} />
          </div>
          <img id="logo-img" src={logo} />
          <Link to={'/'} className="logo" id="websiteName">
            {" "}
            Price Warrior{" "}
          </Link>

          <form>
            <div>
              <div className="search-form">
                <input
                  type="search"
                  value={value}
                  name=""
                  placeholder="Search here..."
                  id="search-box"
                  onChange={(e) => setValue(e.target.value)}
                />
                <label>
                  <FaSearch />
                </label>
              </div>
              <div className="dropDown" onClick={reverseSearch}>
                {data
                  .filter((e) => {
                    const searchedTerm = value.toLocaleLowerCase().trim();
                    let fullGameName = e.name + " " + e.lastName;
                    const fullName = fullGameName.toLocaleLowerCase().trim();

                    return (
                      (searchedTerm && fullName.startsWith(searchedTerm)) ||
                      (fullName === searchedTerm && fullName !== searchedTerm)
                    );
                  })
                  .slice(0, 4)
                  .map((i, index) => {
                    return (
                      <>
                        <Link to={`/games/${i._id}`} key={index}>
                          <div
                            className="search-game-div"
                            onClick={() => setValue(i.name + " " + i.lastName)}
                          >
                            <img src={i.detailImage} />
                            <div>
                              <h2>
                                {i.name}{" "}
                                <span className="span">{i.lastName}</span>
                              </h2>
                              From Rs{" "}
                              <span style={{ color: "var(--marigold)" }}>
                                {i.currentMin}
                              </span>
                            </div>
                          </div>
                        </Link>
                      </>
                    );
                  })}
              </div>
            </div>
          </form>

          <div className="icons">
            {/* <img src={flag} width='50'/> */}
            <div id="search-btn" onClick={handleSearch}>
              <FaSearch />
            </div>
           
              {userName?(
<div onClick={() => setAlert(!alert)} style={{background:'var(--marigold)', borderRadius:'2rem', padding:'0.5rem'}}>
  <PersonIcon style={{fontSize:"3rem", color:"#fff"}} />
</div>
              ):(
                <Link to={"/login"}>
<Button
          variant="contained"
          startIcon={<PersonIcon />}
          color="success"
          size="small"
          style={{
            fontSize: "1.5rem",
            background: "#FFB800",
            color: "black",
            display: "flex",
            alignItems: "center",
          }}
          
        >
          Login
        </Button>
        </Link>
              )}


{alert && (
        <div className="logoutAlert" >
          <div className="alert-text">
           {userName}  <PersonIcon style={{marginLeft:'2px'}}/>
          </div>
          {userDetail && userDetail.isAdmin && (
            <div className="alert-text"  style={{cursor:'pointer', borderBottom:'1px solid black', borderTop:'1px solid black'}}>
              <Link to={'/adminonly'} onClick={takeToAdminPage}>
           Admin <RiAdminFill/>
          </Link>
          </div>
          )}
          
          <div className="alert-btn-container" onClick={logout}>
           Logout <MdLogout style={{marginLeft:'2px'}}/>
          </div>
        </div>
      )}
            
        
          </div>
        </div>
        <div className="header-2">
          <nav className="navbar" onClick={() => setValue("")}>
            <div>
              <Link
                to={"/"}
                className="navbar-links"
                onMouseEnter={handleClick}
                onMouseLeave={handleLeave}
              >
                Home
              </Link>
            </div>
            <div>
              <Link
                to={"/games"}
                className="navbar-links"
                onMouseEnter={handleClick}
                onMouseLeave={handleLeave}
              >
                Games
              </Link>
            </div>
            <div style={{ cursor: "pointer" }}>
              <a
                onClick={() => handleScroll(mainRef.current)}
                className="navbar-links"
                onMouseEnter={handleClick}
                onMouseLeave={handleLeave}
              >
                Featured
              </a>
            </div>
            <div>
              <Link to={'/about'}
                
                className="navbar-links"
                onMouseEnter={handleClick}
                onMouseLeave={handleLeave}
              >
                About Us
              </Link>
            </div>
            {userDetail && userDetail.isAdmin && (
                <Link to={"/adminOp"} style={{ position: "absolute" }}>
                  <Button
                    style={{
                      opacity: "0.5",
                      fontSize: "2rem",
                      display: "flex",
                      opacity: isHovered ? "1" : "0.5",
                      background: isHovered ? "lightBlue" : "blue",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "blue",
                      borderRadius: "10rem",
                      height: "6rem",
                      width: "6rem",
                      bottom: "6rem",
                      zIndex: "9999",
                      right: "4rem",
                      position: "fixed",
                    }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <FaPlus />
                  </Button>
                </Link>
              )}
          </nav>
        </div>
      </header>

      <nav className="bottom-navbar" onClick={() => setValue("")}>
        <Link to={"/"}>
          <FaHome />
        </Link>
        <Link to={"/games"}>
          <FaGamepad />
        </Link>
        <Link to={'/'}>
        <a onClick={() => handleScroll(mainRef.current)}>
          <FaTags />
        </a>
        </Link>
        <Link to={'/about'}>
          <FcAbout />
          </Link>
        
      </nav>
    </>
  );
}

export default Navbar;
