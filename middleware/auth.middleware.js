const Foodpartnermodel=require("../models/partner.model");
const Usermodel = require("../models/user.model");

const jwt=require("jsonwebtoken");

async function foodpartnermiddleware(req,res,next){
    const token=req.cookies.token;
    if(!token){
        return res.status(401).json({message:"Unauthorized: No token provided"});
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        const partner=await Foodpartnermodel.findById(decoded.id);
        if(!partner){
            return res.status(401).json({message:"Unauthorized: Invalid token"});
        }
        req.partner=partner;
        next();
    }
    catch(error){
        console.error("Auth middleware error:",error.message);
        return res.status(401).json({message:"Unauthorized: Invalid token"});
    }
}

async function usermiddleware(req,res,next){
    
    const token=req.cookies.token;
    if(!token){
        return res.status(401).json({message:"Unauthorized: No token provided"});
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        const user=await Usermodel.findById(decoded.id);    
        if(!user){
            return res.status(401).json({message:"Unauthorized: Invalid token"});
        }
        req.user=user;
        next();
    }   
    catch(error){
        console.error("Auth middleware error:",error.message);
        return res.status(401).json({message:"Unauthorized: Invalid token"});
    }
}

module.exports={foodpartnermiddleware,usermiddleware};