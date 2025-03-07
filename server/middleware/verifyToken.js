import jwt from 'jsonwebtoken';

export const verifyToken = async (req, res, next) => {
    const token = req.header('Authorization')?.split(" ")[1];

    console.log("token: ", token)

    if(!token)
        return res.status(403).json({ messag: "Access denied, No token provided" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}