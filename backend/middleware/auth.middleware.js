import jwt from 'jsonwebtoken';

// Middleware to protect routes using JWT
const authMiddleware = (req, res, next) => {
  // Looking for user authorisation token
  const token = req.headers.authorization?.split(' ')[1];

  // If no token Found API request blocked
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

  // Verifying Token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    console.log('ERROR :: WHILE Verifying user token')
    res.status(401).json({ message: 'Token is not valid' });
  }
};

export default authMiddleware;
