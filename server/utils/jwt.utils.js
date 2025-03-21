import jwt from 'jsonwebtoken';

export const signJWT = (payload, expiresIn) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { algorithm: 'RS256', expiresIn });
};

export const generateAccessToken = (user) => {
    return jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
}

export const generateRefreshToken = (user) => {
    return jwt.sign({ userId: user._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
}

