import express, { json } from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";

const devPortID = import.meta.env.VITE_DEV_PORT;

const app = express();
connectDB();

app.use(cors());
app.use(json());
app.use("/api/auth", authRoutes);

const PORT = devPortID;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
