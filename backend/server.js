require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors')
const jwd=require("jsonwebtoken")
const bcrypt = require("bcryptjs")


app.use(cors(
  {
    origin:["http://localhost:3000" , "https://pricewarrior.netlify.app"]
  }
));
app.use(express.json());
const KEY=process.env.KEY;
const ID=process.env.ID;


const Games = require("./models/gameModel");
const User = require("./models/userModal")

mongoose.set("strictQuery", false);

mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    family:4
})
.then(()=>{
    app.listen(process.env.PORT, ()=>{
        console.log(`connection is successful with PORT ${process.env.PORT}, please proceed forward!`)
    })
})
.catch((err)=>{
    console.log(err);
})


const aggregateGameGet = [
  {$sort:{"name":1}},
  { $project: {
    "isLatest":1,
    "isUpcoming":1,
    "name": 1,
    "lastName": 1,
    "homeImage":1,
    "homeGenre":1,

}},
]

const aggregateGameMainGet = [
  {$sort:{"name":1}},
  { $project: {
    
    "name": 1,
    "lastName": 1,
    "homeImage":1,
    "homeGenre":1,
    "description":1,
    "rating":1,
    "detailImage":1,
    "currentMin":1
    
}},
]


//middleware for checking authorization and for admin check
const middleware=async(req,res,next)=>{
  const {authorization} = req.headers;
  if(!authorization){
      res.send({"error":"Authorization is required"})
      return;
  }
  const token = authorization.split(' ')[1]
  try{
      const {email} = jwd.verify(token,KEY)
      console.log("dfghjk",email);
      const check =  await User.findOne({email:email});
      if(check.isAdmin){
        next();
        
      }
      
  }
  catch(err){
      res.send({"error":"token is required"})
  }
  
}


//Login Endpoint

app.post("/login", async (req,res)=>{
  const {email,password} = req.body;

  const check = await User.findOne({email:email});

  if(!check){
      return  {status:"Please check email and password",user:null}
  }

  if(check.password){
  const ispasswordvalid= await bcrypt.compare(password,check.password);
  if(ispasswordvalid){
      const token=jwd.sign({
          email:check.email,
          password:check.password,
          name:check.name,
          _id:check._id
      },KEY)
      res.json({status:"signed in successfully",user:token})
  }
  else{   
      res.json({status:"Please check email and password",user:null})
  }
}

   if(check.withgoogle){
      const token=jwd.sign({
          email:check.email,
          _id:check._id,
          name:check.name
      },KEY)
      res.json({status:"signed in successfully",user:token})
  }

})


//signUp
app.post("/signup",async (req,res)=>{
  const {name,email,password} = req.body;
  const newpassword= await bcrypt.hash(password,10);

  const detail = new User()
  detail.name = name
  detail.email = email
  detail.password = newpassword
  detail.isAdmin = false


  detail.save(async (err,data)=>{
      if(err){
          console.log(err);
      }else{
          const token = jwd.sign({
              email: data.email,
              name: data.name,
              _id:data._id,
              
            }, KEY);
            res.json({ status: "signed in successfully", user: token });
      }
  })

})
// getting user by its ID,  just to check
app.get("/user/:id", async(req, res)=>{
  const {id} = req.params

if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such game!, Sorry!'})
  }

  const games = await User.findById(id)

  if(!games){
    return res.status(404).json({error:'No such user!, Sorry!'})
  }

  res.status(200).json(games)
})

//getting all users
app.get('/allUser',middleware, async(req, res)=>{
  const userList = await User.find({})
  res.status(200).send(userList);
})

app.put("/updateAdmin/:id",middleware , async (req, res) => {

  const {id} = req.params
   
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'No such workout'})
      }
      const data = await User.findOneAndUpdate({_id: id},{
        $set: req.body
      })
      

      if(!data) {
        return res.status(400).json({error: 'No such User!, Sorry!'})
      }

      res.status(200).json(data)

  
});
/************************************************************************
 ************************************************************************
 ************************************************************************3
*/
//getting all the games
app.get('/gameGet', async(req, res)=>{
    const games = await Games.aggregate(aggregateGameGet)
    res.status(200).send(games);
})

app.get('/gameMainGet', async(req, res)=>{
  const games = await Games.aggregate(aggregateGameMainGet)
  res.status(200).send(games);
})




app.get('/gameGet/:id', async (req, res)=>{
const {id} = req.params

if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such game!, Sorry!'})
  }

  const games = await Games.findById(id)

  if(!games){
    return res.status(404).json({error:'No such game!, Sorry!'})
  }

  res.status(200).json(games)
})

app.post('/gamePost',middleware, async(req, res)=>{
    const {name,description,relatedLinks,
         lastName,publisher,prices,tags,genres,
         releaseDate,developer,recommendedRequirements,
         rating,minimumRequirements,trailer,homeGenre,currentMax,currentAvg, currentMin, 
         editions, homeImage, detailImage, crouselImage, historyMax, historyAvg,historyMin,isLatest, sentence, isUpcoming} = req.body
    const modal = new Games()
    modal.name = name
    modal.sentence = sentence
    modal.lastName = lastName
    modal.editions = editions
    modal.homeGenre = homeGenre
    modal.homeImage= homeImage
    modal.detailImage= detailImage
    modal.crouselImage=crouselImage
    modal.currentMax=currentMax
    modal.currentAvg=currentAvg
    modal.currentMin=currentMin
    modal.historyMax=historyMax
    modal.historyAvg=historyAvg
    modal.historyMin=historyMin
    modal.rating=rating
    modal.trailer=trailer
    modal.description = description
    modal.relatedLinks=relatedLinks
    modal.minimumRequirements=minimumRequirements
    modal.recommendedRequirements=recommendedRequirements
    modal.developer=developer
    modal.publisher=publisher
    modal.releaseDate=releaseDate
    modal.genres=genres
    modal.tags=tags
    modal.prices=prices
    
    modal.isLatest = isLatest
    modal.isUpcoming = isUpcoming

    modal.save(async(err, data)=>{
        if(err){
            console.log(err)
        }
        else{
            res.status(200).send(modal)
        }
    })
    
})






app.delete('/gameDelete/:id', middleware ,async (req, res) => {
    const { id } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({error: 'No such game!, Sorry!'})
    }
  
    const games = await Games.findOneAndDelete({_id: id})
  
    if(!games) {
      return res.status(400).json({error: 'No such game!, Sorry!'})
    }
  
    res.status(200).json(games)
  })

  app.put('/gamePut/:id',middleware, async(req, res)=>{
    const {id} = req.params
   
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'No such workout'})
      }
      const games = await Games.findOneAndUpdate({_id: id},{
        $set: req.body
      })
      

      if(!games) {
        return res.status(400).json({error: 'No such game!, Sorry!'})
      }

      res.status(200).json(games)

      
  })


  




//signup with Google

// const client = new OAuth2Client(ID);

// app.post("/token", async (req, res) => {
//     const { tokenold } = req.body;
  
//     const ticket = await client.verifyIdToken({
//       idToken: tokenold,
//       audience: ID,
//     });
//     const payload = ticket.getPayload();
//     const email = payload.email;
//     const check = await ChannelModel.findOne({ email: email });
//     if (!check) {
//       // create new account in database
//       const name = payload.name;
//       const email = payload.email;
  
//       const detail = new ChannelModel();
//       detail.name = name;
//       detail.email = email;
//       detail.withgoogle = true;
  
//       detail.save(async (err, data) => {
//         if (err) {
//           console.log(err);
//         } else {
//           // send response once database operation is complete
//           const token = jwd.sign({
//             email: data.email,
//             name: data.name,
//             _id:data._id,
//           }, KEY);
//           res.json({ status: "signed in successfully", user: token });
//         }
//       });
//     } else {
//       const token = jwd.sign({
//         email: check.email,
//         name: check.name,
//         _id:check._id,
//       }, KEY);
//       res.json({ status: "signed in successfully", user: token });
//     }
//   });





