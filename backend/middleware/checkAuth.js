const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();


const checkAuth = (req, res, next) => {


  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(210).json({ success: false, message: "Authorization header not found" });
  }

  const token = authHeader.split(' ')[1];

  if (token==null) {
    return res.status(210).json({ success: false, message: "Token not found" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(210).json({ message: 'Invalid or expired token' });
    }
    req.user = user; // Store the user info for use in other routes
    // console.log("User:", user);
    next();
  });

};


module.exports = checkAuth;