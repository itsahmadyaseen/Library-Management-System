import mongoose from "mongoose";

const adminApprovalSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "member"],
    required: true,
  },
  approved: {
    type: Boolean,
    default: false,
  },
});

const AdminApproval = mongoose.model('AdminApproval', adminApprovalSchema)

export default AdminApproval
