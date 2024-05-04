const Response = require('../utils/response');
const userCntrl = require('../controllers/users.controller')
module.exports=async(req,res,next)=>{
    let {email,phone}=req.body;
    try{
        console.log("checking uniqueness!!")
        const emailChk = await userCntrl.getUserDetails({regEmail:email});
        if(emailChk){
            console.log("checking email")
            return Response.Error(res,"Email Already Exists!!");
        }
        const phnChk = await userCntrl.getUserDetails({regPhone:phone});
        if(phnChk){
            return Response.Error(res,"Mobile Number Already Exists!!");
        }
        next();
    }catch(err){
        return Response.Error(res,"User Not Found!!")
    }
};