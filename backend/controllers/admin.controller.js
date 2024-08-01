import User from "../models/user.model.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    console.log("All users fetched : ", users);
    res.status(200).json({ message: "All users fetched", users });
  } catch (error) {
    console.log("Error fetching users", error);
    res.status(500).json({ message: "Error fetching users", error });
  }
};

export const updateRole = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    console.log("Invalid email", email);
    return res.status(400).json({ message: "Invalid email" });
  }

  try {
    if (user.role == "member") {
      // user.role = 'admin';
      await User.updateOne({ email }, { role: "admin" });
      console.log("User role updated to admin");
      return res.status(200).json({ message: "User role updated to admin" });
    } else {
      console.log("User is already an admin");
      return res.status(400).json({ message: "User is already an admin" });
    }
  } catch (error) {
    console.log("Error updating role : ", error);
    return res
      .status(500)
      .json({ message: "Error updating role", data: error });
  }
};
