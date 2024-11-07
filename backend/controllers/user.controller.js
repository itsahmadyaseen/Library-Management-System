import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";

export const registerUser = async (req, res) => {
  const { username, email, password, fullname } = req.body;

  if (!username || !email || !password || !fullname) {
    console.log("Provide all details", username, email, password, fullname);
    return res.status(400).json({ message: "Provide all details" });
  }
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      console.log("User already exist");
      return res.status(400).json({ message: "User already exist" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      fullname,
      password: hashedPassword,
      role: "member",
    });

    await newUser.save();
    console.log("User registered");
    return res.status(201).json({ message: "User registered" });
  } catch (error) {
    console.log("Error registering user", error);
    return res
      .status(500)
      .json({ message: "Error registering user", data: error });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    console.log("Invalid email");
    return res.status(400).json({ message: "Invalid email" });
  }

  bcrypt.compare(password, user.password, (err, data) => {
    if (data) {
      const authClaims = {
        id: user.id,
        username: user.username,
        role: user.role,
      };
      const token = jwt.sign(authClaims, process.env.SECRET_KEY, {
        expiresIn: "1d",
      });
      res.cookie("token", token, {
        httpOnly: true,
      });
      console.log("User logged in");
      // console.log("token: ", token);
      return res.status(200).json({
        id: user.id,
        token: token,
        role: user.role,
        username: user.fullname,
      });
    } else {
      console.log("Invalid password", err);
      return res.status(400).json({ message: "Invalid password", data: err });
    }
  });
};

export const getUserDetails = async (req, res) => {
  try {
    console.log(req.user.id);

    const user = await User.findById(req.user.id)
      .populate({
        path: "borrowedBooks",
        select: "title author genre",
      })
      .select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log("Profile fetched", user);
    res.status(200).json({ message: "Profile fetched", data: user });
  } catch (error) {
    console.log("Error fetching user details", error);
    res.status(500).json({ message: "Error fetching user details", error });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });

    console.log("Users fetched");
    res.status(200).json({ message: "Users fetched", data: users });
  } catch (error) {
    console.log("Error fetching users", error);
    res.status(500).json({ message: "Error fetching users", error });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("token", "", {
      maxAge: 0,
      httpOnly: true,
      secure: true,
    });
    console.log("User logged out");
    res.status(200).json({ message: "User logged out" });
  } catch (error) {
    console.log("Error logging out", error);
    res.status(500).json({ message: "Error logging out", error });
  }
};
