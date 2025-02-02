import User from "../models/User.js";
import bcrypt from 'bcryptjs'
import generateTokenAndSetCookie from "../utils/generateTokenAndSetCookie.js";


export const signupUser= async (req,res)=>{
    try{
        const {name, email, password}= req.body;
        if( !password || !email || !name) return res.status(400).json({error:"All fields are required...."});

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ error: "User already exists" });
        }
        const salt= await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({name, email, password:hashedPassword});
        await newUser.save();
        if(newUser){
            generateTokenAndSetCookie(newUser._id,res);
            res.status(201).json({_id:newUser._id, name:newUser.name, email:newUser.email})
        }else{
            res.status(400).json({error:"Invalid user data"});
        }
    }catch(err){
        res.status(500).json({error:err.message})
    }
}


export const loginUser= async(req,res)=>{
    try{
        const { email, password}= req.body;
        if(!email || !password ) return res.status(400).json({error:'email and password are required...'});
        const user = await User.findOne({email});
        const isPasswordCorrect= await bcrypt.compare(password, user?.password || "");
        if (!user || !isPasswordCorrect) {
            return res.status(400).json({error:"Invalid email or password"})
        }
        generateTokenAndSetCookie(user._id,res);
        console.log('helooooooooo')
        res.status(200).json({_id:user._id, name:user.name, email:user.email});  
        
    }catch(err){
        res.status(500).json({error:err.message})
    }
}
export const logoutUser= async(req, res)=>{
    try {
        res.cookie('jwt',"",{maxAge:1});
        res.status(200).json({message:"User logged out successfully!!"})
    } catch (err) {
        res.status(500).json({error:err.message})
    }
}