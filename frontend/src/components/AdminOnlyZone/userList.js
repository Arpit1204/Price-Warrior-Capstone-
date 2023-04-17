import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import './userList.css'
import loadin from '../asseets/loadinghd7.gif'


function UserList() {
    const [user, setUser]=useState([])
    const[load, setLoad] = useState(true)
    const Token = sessionStorage.getItem('token')
    useEffect(()=>{
        console.log(user);
    },[user])
    useEffect(()=>{
       fetch(`${process.env.REACT_APP_DataBase_link_to_Access_data}/allUser`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + Token,
          "Content-type": "application/json; charset=UTF-8"
        }
      }) .then(res=>res.json())
      .then((data)=>{
        
        setUser(data);
        setTimeout(()=>{
            setLoad(false)
        },2000)
        
        
    })
    .catch((err)=>{
      console.log(err);
    })

    
},[])

const handlePut = (e, admin)=>{
    console.log(e.target.id);
    fetch(`${process.env.REACT_APP_DataBase_link_to_Access_data}/updateAdmin/${e.target.id}`, {
      method: "PUT",
      headers: {
        'Authorization': 'Bearer ' + Token,
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        name:admin.name,
        email:admin.email,
        isAdmin:admin.isAdmin,
        password:admin.password
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        
      })
      .catch((error) => {
        console.log("Failed to make user Admin");
      });
}

  return (
  <>
  {load?(
    <div className="loading-ani">
    <img src={loadin}/>
    <h2>Loading...</h2>
</div>
  ):(
    <div className='outer-userList-div'>

    <h1 className='heading'>User List</h1>
    {user.map((elt,i)=>{

        return(

        <div className='single-user'>
            <label style={{display:'flex', alignItems:'center',width: '33.3%'}}>
                <h2 className='name-userList'>Name:-</h2>
                
                <h3>{elt.name}</h3>
            </label>
            
            <label style={{display:'flex', alignItems:'center',width: '33.3%'}}>
                {/* <h2>E-mail:-</h2> */}
                
                <h3 style={{wordBreak:'break-all'}}>{elt.email}</h3>
            </label>

            <div className="each-labe-input">
            <label style={{justifyContent:'center'}}>
              <h2>Admin</h2>
            </label>
            <div style={{width:'4vw', display:'flex',width: '33.3%'}}>
                <input
                style={{textAlign:'center', cursor:'pointer', width: '60px'}}
                 value={elt.isAdmin}  readOnly={true}/>
                ➡️
                <input
                onClick={(e) => {if(window.confirm(`Do you want to do Admin Access to ${!elt.isAdmin} ?`)){
                    setUser((prev) => {
                      let newData = [...prev];
                      console.log("newData",newData);
                      newData[i].isAdmin = !newData[i].isAdmin;
                      console.log("newData2",newData[i]);
                      
                      handlePut(e, newData[i]);
                      return newData;
                    });
                  }}}
                id={elt._id}
                style={{textAlign:'center', cursor:'pointer', width: '60px'}}
                 value={!elt.isAdmin}  readOnly={true}/>
            </div>
            
          </div>

        </div>
        )
    })}
</div>
  )}
  
   
    </>
  )
}

export default UserList