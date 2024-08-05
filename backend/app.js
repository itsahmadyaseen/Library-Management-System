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
app.use(
  cors({
    origin: "http://localhost:5173", 
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
