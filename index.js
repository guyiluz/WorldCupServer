const express = require('express')
const app = express()
const fs = require('fs');
const  port= process.env.PORT || 3000



const data = require('./groups.json')
app.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
   });
app.get('/groups', (req, res)=>{
res.send(data)

})

app.listen(port, () => console.log('Example app listening on port 3000!'))