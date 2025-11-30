import express, { Express } from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
// Load environment variables BEFORE your internal imports!
dotenv.config();

import {
    accessLogger,
    errorLogger,
    consoleLogger,
} from "./api/v1/middleware/logger";
import errorHandler from "./api/v1/middleware/errorHandler";

import wizardRoutes from "../src/api/v1/routes/wizardRoutes"
import propheciesRoutes from "../src/api/v1/routes/propheciesRoutes" 
import setupSwagger from "../config/swagger";
import { getHelmetConfig } from "../config/helmetConfig";
import userRoutes from "./api/v1/routes/userRoutes";
import adminRoutes from "./api/v1/routes/adminRoutes";

// Initialize Express application
const app: Express = express();

// Logging middleware (should be applied early in the middleware stack)
if (process.env.NODE_ENV === "production") {
    // In production, log to files
    app.use(accessLogger);
    app.use(errorLogger);
} else {
    // In development, log to console for immediate feedback
    app.use(consoleLogger);
}

// Define a route
app.get("/", (req, res) => {
    res.send("Hello, World!");
});

export default app;

app.use(getHelmetConfig());

app.use(morgan("combined"));
app.use(express.json());
app.use(errorHandler);
app.use(cors());

// https://expressjs.com/en/starter/static-files.html
app.use(express.static('public'))

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/wizards", wizardRoutes)
app.use("/api/v1/prophecies", propheciesRoutes)

app.get("/api/v1/health", (req, res) => {
    res.json({
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0",
    });
    setupSwagger(app);
});
