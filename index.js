const express = require('express')
const app = express()
const fs = require('fs');
const  port= process.env.PORT || 3000
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;

const bodyParser = require('body-parser')
const uri = "mongodb+srv://guy123:juaua123@cluster0-gzot4.mongodb.net/test"

function connectToDB() { 
 return new Promise((reslove,reject)=>{
  MongoClient.connect(uri, function (err, database) {
    db=database
    if(db){
      reslove()

    }else{
      reject()
    }
 
 })}
 )} 




app.use(bodyParser())
var db; 




app.use(require('./routes/api')); 
const data = require('./groups.json')
app.use(cors())
let data1=[]
app.get('/groups', (req, res)=>{

    res.send(data)
  
  


})

app.post('/api/addUser', (req, res)=>{


  let result;
  const email=req.body.email
  const name=req.body.name
  var query = { email}

  db.db('wwc2018').collection('users').findOne(query, function (err, result) {
    if (err) throw err;
    if (result.length !== 0) {

      let obj={
        newUser:false,
        id:result._id,
        userBet:[]
          }
      res.send(JSON.stringify(obj))


    }
    else {

      var newUser = { name, email };
      db.db('wwc2018').collection('users').insertOne(newUser, function (err, resultDb) {
        if (err) throw err;
        const NewUserid = resultDb.ops[0]._id

        let obj={
          newUser:true,
          id:result._id
            }



        res.send(JSON.stringify(obj))

      })

    }
  });



})




app.get('/api/usersList',(req,res)=>{



 
    db.db('wwc2018').collection('users').find({}).toArray(function(err, result) {
      if (err) throw err;
 
        res.send(result)
    
      }); 



})


app.post('/api/setRes',(req,res)=>{
const id =req.body.id
const resArry = req.body.res
var query = {id}

if(id==undefined||resArry==undefined){
  res.send('Somting went worng')
    return false
}
db.db('wwc2018').collection('results').find(query).toArray(function(err, result) {
  if(result.length!==0){
    
    
    res.send("id res is already listed")
  
  return false
  }else{
    const newUserRes={id,resArry}
    db.db('wwc2018').collection('results').insertOne(newUserRes,function name(err,resultDb) {
      if (err) throw err;
      res.send('Saved new Res')
      
    })
    
  }


})








})



connectToDB().then(()=>{

  app.listen(port, () => console.log('Example app listening on port 3000!'))

})