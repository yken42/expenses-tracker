import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';


export const verifyToken = async (req, res, next) => {
  const token = req.cookies.accessToken || null; 

  // console.log("TOKEN", token)

  if (!token) {
    return res.status(401).json({ message: "Unauthorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decoded.userId || decoded._id).select("-password -refreshToken");
    // console.log("NIGERR USER",user)
    // console.log("DECODED AHH BITHCCH", decoded)
    req.user = user; 
    next();
  } catch (err) {
    return res.status(403).json({ message: "Forbidden, invalid token" });
  }
};