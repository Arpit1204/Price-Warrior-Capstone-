import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import './userList.css'
import { FaPlus,FaMinus } from 'react-icons/fa'
import { useParams } from 'react-router-dom'
function UserList() {
   const {id} = useParams()
    const [user, setUser]=useState([])
    const[load, setLoad] = useState(true)
    const [gamaData, setGameData] = useState({}) 
    const Token = sessionStorage.getItem('token')
    console.log(id);
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

useEffect(() => {
  const apiCall = async ()=>{
    const res=  await axios.get(`${process.env.REACT_APP_DataBase_link_to_Access_data}/gameGet/${id}`)
      console.log("asdfghjkl",res.data)
    setGameData(res.data);
    
    
      

  }
  apiCall();
}, [id]);

const handlePut = (admin)=>{
    fetch(`${process.env.REACT_APP_DataBase_link_to_Access_data}/gamePatch/${id}`, {
      method: "PATCH",
      headers: {
        'Authorization': 'Bearer ' + Token,
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
      userEditAccess:admin
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
   
    <h2>Loading...</h2>
</div>
  ):(
    <div className='outer-userList-div'>

    <h1 className='heading'>User List</h1>
    {user.filter(item=>!item.isAdmin).map((elt,i)=>{

        return(

        <div className='single-user'>
            <label id='userList-name' style={{display:'flex', alignItems:'center',width: '33.3%'}}>
                <h2 className='name-userList'>Name:-</h2>
                
                <h3 >{elt.name}</h3>
            </label>
            
            <label id='userList-email' style={{ alignItems:'center',width: '33.3%'}}>
                {/* <h2>E-mail:-</h2> */}
                
                <h3  style={{wordBreak:'break-all'}}>{elt.email}</h3>
            </label>

            <div className="each-labe-input">
            <label style={{justifyContent:'center',marginBottom: '1rem', width:'auto'}}>
              <h2>Access</h2>
            </label>
            <div style={{display:'flex', width:'100%', justifyContent:'space-around'}}>
            {gamaData && !gamaData.userEditAccess.some(obj=>obj.id == elt._id ) &&
            <div style={{textAlign:'center'}}
            id={elt._id}
            onClick={(e) => {if(window.confirm(`Do you want to do Admin Access of ${elt.name} to ${!elt.isAdmin} ?`)){
              setGameData((prev) => {
                let newData = {...prev};
                console.log("newData",newData);
                newData.userEditAccess.push({
                  id:elt._id
                })
                
                console.log("newData2",newData.userEditAccess);
                
                handlePut(newData.userEditAccess);
                return newData;
              });
            }}}>
              <FaPlus style={{ backgroundColor:'#fff' , borderRadius:'50%', padding:'0.5rem',fontSize:'2.5rem', cursor:'pointer'}}/>
            </div>
    }
            
            {gamaData && gamaData.userEditAccess.some(obj=>obj.id === elt._id ) &&
            <div style={{textAlign:'center'}}
            id={elt._id}
            onClick={(e) => {if(window.confirm(`Do you want to do Admin Access of ${elt.name} to ${!elt.isAdmin} ?`)){
              setGameData((prev) => {
                let newData = {...prev};
                console.log("deleted-id-newData",newData);
                const indexToRemove = newData.userEditAccess.findIndex(obj => obj.id === elt._id);
                if (indexToRemove !== -1) {
                  newData.userEditAccess.splice(indexToRemove, 1);
                }
                
                console.log("newData2",newData.userEditAccess);
                
                handlePut(newData.userEditAccess);
                return newData;
              });
            }}}>
              <FaMinus style={{ backgroundColor:'#fff' , borderRadius:'50%', padding:'0.5rem',fontSize:'2.5rem', cursor:'pointer'}}/>
            </div>
    }
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