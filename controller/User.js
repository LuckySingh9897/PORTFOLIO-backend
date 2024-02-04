import { User } from "../model/User.js";
import jwt from "jsonwebtoken";

export const login=async(req,res)=>{
    try{

        const {email,password}= req.body;
        const user= await User.findOne({email,password});
        if(!user){
            return res.status(400).json({
                success:false,
                message:"Invaild email or password"
            });
        }
        const token = jwt.sign({_id:user._id},process.env.JWT_SECRET);

        res
        .status(200)
        .cookie("token",token,{
            expires:new Date(Date.now()+60*10*1000),
            httpOnly:true
        })
        .json({
            success:true,
            message:"Logged In Successfully"
        });

    }catch(error){
        return res.status(400).json({
            success:false,
            message:error.message
        })

    }
}

export const logout=async(req,res)=>{
    try{


        res
        .status(200)
        .cookie("token",token,{
            expires:new Date(Date.now()),
            httpOnly:true
        })
        .json({
            success:true,
            message:"Logged Out Successfully"
        });

    }catch(error){
        return res.status(400).json({
            success:false,
            message:error.message
        })

    }
}


export const getUser= async(req,res)=>{
    try{
        const user= await User.findOne().select("-email -password");
        res.status(200).json({
            success:true,
            user
        })


    }catch(error){
        return res.status(400).json({
            success:false,
            message:error.message
        })

    }
}
export const myProfile= async(req,res)=>{
    try{
        const user= await User.findById(req.user._id);
        res.status(200).json({
            success:true,
            user
        })


    }catch(error){
        return res.status(400).json({
            success:false,
            message:error.message
        })

    }
}