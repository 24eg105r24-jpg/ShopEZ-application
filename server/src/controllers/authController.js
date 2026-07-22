const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");

function toPublicUser(user) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    studioName: user.studioName,
  };
}

// @route POST /api/auth/register
const register = asyncHandler(async (req, res) => {
  const { name, email, password, role, studioName } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Name, email, and password are required");
  }

  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) {
    res.status(400);
    throw new Error("An account with this email already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    role: role === "seller" ? "seller" : "buyer",
    studioName,
  });

  res.status(201).json({
    ...toPublicUser(user),
    token: generateToken(user._id),
  });
});

// @route POST /api/auth/login
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Email and password are required");
  }

  const user = await User.findOne({ email: email.toLowerCase() }).select("+password");
  if (!user || !(await user.matchPassword(password))) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  res.json({
    ...toPublicUser(user),
    token: generateToken(user._id),
  });
});

// @route GET /api/auth/me
const getMe = asyncHandler(async (req, res) => {
  res.json(toPublicUser(req.user));
});

module.exports = { register, login, getMe };
