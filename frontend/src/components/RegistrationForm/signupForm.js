import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./loginForm.css";
import jwt_decode from 'jwt-decode'
import { useNavigate} from "react-router-dom"

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("")
  

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // e.preventDefault();
    if(name!=="" && email!=="" && password!=="" ){
    fetch(`${process.env.REACT_APP_DataBase_link_to_Access_data}/signup`, {
     
    // Adding method type
    method: "POST",
     
    // Adding body or contents to send
    body: JSON.stringify({
      "name":name,
      "email":email,
      "password":password,
      "isAdmin": false
  }),
     
    // Adding headers to the request
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
})
 
// Converting to JSON
.then(response => response.json())
 
// Displaying results to console
.then(json => {
    alert('Signed In Successfully')
    const decode = jwt_decode(json.user)
    sessionStorage.setItem("username",decode.name);
    sessionStorage.setItem("token",json.user)
    navigate("/")
    window.location.reload(true)
    
}
   
);
    
    }
   
  };

  return (
    <div className="login-form-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Sign In</h2>
        <input
          type="name"
          placeholder="UserName"
          value={name}
          onChange={handleNameChange}
        />
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
        <button type="submit" onClick={handleSubmit}>Sign in</button>
        <p>
          Already have an account? <Link to={'/login'}>Log In</Link> 
        </p>
      </form>
    </div>
  );
};

export default SignUp;
