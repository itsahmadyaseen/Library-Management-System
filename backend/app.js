import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/user.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import bookRoutes from "./routes/book.routes.js";
import transactionRoutes from "./routes/transaction.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connection } from "./database/connection.js";

dotenv.config();
const app = express();
connection();
app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:5173",
  "https://readers-space-eight.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use("/api/v1/users", userRouter);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/books", bookRoutes);
app.use("/api/v1/transactions", transactionRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server is running on port ", process.env.PORT);
});
