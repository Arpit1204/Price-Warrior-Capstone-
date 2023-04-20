import "./App.css";
import GameFinal from "./components/GameComponent/gameFinal";
import Home from "./components/HomeComponents/Home";
import Navbar from "./components/Navbar&FooterComponent/Navbar.js";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Navbar&FooterComponent/Footer";
import AdminForm from "./components/AdminPortalForm/AdminForm";
import MainGameHome from "./components/GameComponent/gameMainPage/mainGameCarousel";
import AdminFormPut from "./components/AdminPortalForm/AdminFormPut";
import About from "./components/About Us/about";
import Login from "./components/RegistrationForm/loginForm";
import SignUp from "./components/RegistrationForm/signupForm";
import UserList from "./components/AdminOnlyZone/userList";
import { useRef } from "react";
import ErrorPage from "./components/errorPage/Error";
function App() {
 
  const mainRef = useRef(null);
  return (
    <div className="App">
      
<Navbar mainRef = {mainRef} />

<Routes>
  <Route path={"/"} element={<Home  mainRef = {mainRef} />} />
  <Route path={'/login'} element={<Login/>}/>
  <Route path={'/signup'} element={<SignUp/>}/>
  <Route path={"/games/:id"} element={<GameFinal />}/>
  <Route path={"/games"} element={<MainGameHome />} />
  <Route path={"/adminop"} element={<AdminForm />} />
  <Route path={"/adminopput/:id"} element={<AdminFormPut />} />
  <Route path={"/about"} element={<About/>}/>
  <Route path={'*'} element={<ErrorPage/>}/>
</Routes>
<Footer />

      
      
      
    </div>
  );
}

export default App;
