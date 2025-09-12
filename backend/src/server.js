import express from 'express'
import dotenv, { config } from "dotenv";
import authRoutes from './routes/auth.routes.js';
import messagesRoutes from './routes/messages.routes.js';
import path from "path";
import { connectDB } from './lib/db.js';

dotenv.config();

const app = express();
const __dirname = path.resolve();

const PORT = process.env.PORT || 4000;

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messagesRoutes);

if (process.env.NODE_ENV == "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")))
    app.get("*", (_, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
    })
}

app.listen(PORT, () => {
    console.log("Server running on port: " + PORT);
    connectDB();
});