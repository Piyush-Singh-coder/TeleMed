import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) =>{
    try {
        const token = req.cookies.jwt;

        if (!token){
            return res.status(400).json({message: "Unauthorised - No Token"})
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded){
             return res.status(400).json({message: "Unauthorised - Invalid Token"})
        }

        const user = await User.findById(decoded.userId).select("-password");

        if(!user){
            return res.status(400).json({message: "User not found"})
        }

        req.user = user;
        next();
    } catch (error) {
        console.log("Error in auth middleware", error.message);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export const authorize = (...roles) =>{
    return (req, res, next) =>{
        if (!req.user || !roles.includes(req.user.role)){
            return res.status(403).json({message: "Forbidden: Access denied"});
        }
        next();
    }
}

