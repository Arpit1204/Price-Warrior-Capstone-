import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./loginForm.css";
import jwt_decode from 'jwt-decode'



const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault();
    if( email!=="" && password!=="" ){
        fetch(`${process.env.REACT_APP_DataBase_link_to_Access_data}/login`, {
         
        // Adding method type
        method: "POST",
         
        // Adding body or contents to send
        body: JSON.stringify({
          "email":email,
          "password":password,
      }),
         
        // Adding headers to the request
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
     
    // Converting to JSON
    .then(response => response.json())
     
    // Displaying results to console
    .then(json =>{
      console.log(json.user)
        if(json.user){
            alert("login successfully")
            const decode = jwt_decode(json.user)
            sessionStorage.setItem("username",decode.name);
            sessionStorage.setItem("token",json.user);
            navigate('/')
            window.location.reload(true)

            
            
        }
        else{
            alert("Please check your email and password")
        }
    });
        
        }
  };

  return (
    <div className="login-form-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login In</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
        <button type="submit">Log in</button>
        <p>
          Don't have an account? <Link to={'/signup'}>Sign up</Link> 
        </p>
      </form>
    </div>
  );
};

export default Login;
