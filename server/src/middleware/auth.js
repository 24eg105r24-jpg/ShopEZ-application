const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");

// Verifies the JWT sent in the Authorization header and attaches req.user
const protect = asyncHandler(async (req, res, next) => {
  let token;
  const header = req.headers.authorization;

  if (header && header.startsWith("Bearer ")) {
    token = header.split(" ")[1];
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized — no token provided");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    if (!req.user) {
      res.status(401);
      throw new Error("Not authorized — user no longer exists");
    }
    next();
  } catch (err) {
    res.status(401);
    throw new Error("Not authorized — invalid or expired token");
  }
});

// Restricts a route to specific roles, e.g. authorize("seller")
function authorize(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403);
      throw new Error(`Not authorized — requires role: ${roles.join(" or ")}`);
    }
    next();
  };
}

module.exports = { protect, authorize };
