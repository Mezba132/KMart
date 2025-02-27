const expressJWT = require('express-jwt') // for authorization check
const admin = require("../Firebase/index");

exports.authCheck = async (req, res, next) => {
  // console.log(req.headers); // token
  try {
    const firebaseUser = await admin
            .auth()
            .verifyIdToken(req.headers.authtoken);
    // console.log("FIREBASE USER IN AUTHCHECK", firebaseUser);
    req.user = firebaseUser;
    next();
  } catch (err) {
    res.status(401).json({
      err: "Invalid or expired token",
    });
  }
};

exports.requireSignIn = expressJWT({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  userProperty: "auth",
})

exports.isAuth = (req, res, next) => {
  let user = req.body.user && req.auth && req.body.user._id === req.auth._id;
  if(!user) {
    return res.status(403).json({
      error : "Access denied"
    })
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if(req.body.user.role !== "admin"){
    return res.status(403).json({
      error : "Admin resource! Access Denied"
    })
  }
  next();
};