const userContrl = require('../controllers/users.controller')
const Response = require('../utils/response')
const bcrypt = require('bcrypt')
module.exports=async(req,res,next)=>{
    try{
    console.log("check user data!!")
    let getData = await userContrl.getUserDetails(req.body)
    console.log("getdata",getData)
    if(!getData)
    {
        return Response.Error(res,"Invalid User!!");
    }
    let pswd = getData.password;
    let isEqual = bcrypt.compareSync(req.body.password,pswd);
    if(!isEqual){
        return Response.Error(res,"Incorrect Password!!");
    }
    
    req.body.password =getData['password']="";
    req.body.user=getData;
    next();
}catch(err){
    return Response.Error(res, "User Not Found!!");
}
}