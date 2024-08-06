import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    fullname: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role:{
        type:String,
        enum:['admin','member'],
        default:'member',
    },
    borrowedBooks:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Book'
    }]
  },
  { timestamps: true }
);

const User =  mongoose.model("User", userSchema);

export default User;
