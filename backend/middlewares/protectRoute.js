import User from "../models/User.js";
import jwt from 'jsonwebtoken'
const  protectRoute= async (req,res,next)=>{
    try {
        const token = req.cookies?.jwt;
        if(!token) return res.status(401).json({error:'Not authorized to access this route'});
        if (!process.env.JWT_SECRET) return res.status(500).json({ error: 'JWT secret is not defined' });
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        //console.log(decoded)
        const user= await User.findById(decoded?.userId).select('-password'); //The minus sign tells Mongoose to exclude the password field from the returned document
        if (!user) return res.status(404).json({ message: 'User not found' });
        req.user= user;
        next();
    } catch (err) {
        res.status(500).json({error:err.message});
        console.log('protected routees errorrrrrrrr')
    }
}

export default protectRoute;