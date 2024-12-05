const jwt = require('jsonwebtoken')
require('dotenv').config();

async function authToken(req,res,next){
    try {
        const token= req.cookies?.token 
        if (!token) {
            return res.status(200).json({
                message:"User not login",
                error:true,
                success:false
            })
        }
        jwt.verify(token, process.env.TOKEN_SECRET_KEY, function(err, decoded) {
            if (err) {
                console.log('error auth',err)
            }
            req.userId=decoded?._id
            req.userEmail=decoded?.email
            req.userPhone=decoded?.phone
            req.userName=decoded?.name
            next()
            
          });
    } catch (err) {
        res.status(400).json({
            message: err.message||err,
            data:[],
            error: true,
            success:false
        })
    }
}

module.exports=authToken
