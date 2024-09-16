import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    book: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Book",
    },
    borrowDate: {
      type: Date,
      default: Date.now(),
    },
    returnDate: {
      type: Date,
      default: null,
    },
    status: {
      type: String,
      enum: ["borrowed", "returned"],
      default: "borrowed",
    },
  },
  { timestamps: true }
);

transactionSchema.methods.calculateFine = function () {
  console.log("inside here");

  const currentDate = new Date();
  const returnDate = this.returnDate || currentDate;
  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + 10); // Add 10 days;
  console.log("due date", dueDate);
  console.log("return date", returnDate);

  if (returnDate > dueDate) {
    const delayInDays = Math.ceil(
      (returnDate - dueDate) / (1000 * 60 * 60 * 24)
    );
    console.log("delayInDays", delayInDays);

    return delayInDays * 2;
  } else return 0;
};

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
