const express =require("express")
var router = express.Router();

router.get('/api/getUsers',(req,res)=>{
res.send({type:"get"})

})


router.get('/api/groups',(req,res)=>{
    res.send({type:"get"})
    
    })



module.exports = router