import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import 'dotenv/config';

// **************** SIGN UP ****************
export const signup = async (req, res) => {
  const { name, password, email } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(409).json({ message: "User already exists" });
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      password: hashedPassword,
      email
    });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error){
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

// **************** LOGIN ****************
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "User not found" });

    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      return res.status(401).json({ message: "Email or password incorrect" });
    }

    const token = jwt.sign(
      { id: user.id, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({ message: "User login successfully", user: user.email, token });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong", error: error.message });
  }
}

// **************** RPOTECTED ROUTE ****************
export const protectedRoute = async (req, res) => {
  return res.status(201).json({ message: "access granted!"});
}

export const logout = async (req, res) => {
  
}