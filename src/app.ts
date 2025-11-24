import express, { Express } from "express";
import morgan from "morgan";
import wizardRoutes from "../src/api/v1/routes/wizardRoutes"

// Initialize Express application
const app: Express = express();

// Define a route
app.get("/", (req, res) => {
    res.send("Hello, World!");
});

export default app;

app.use(morgan("combined"));

// https://expressjs.com/en/starter/static-files.html
app.use(express.static('public'))

app.use("/api/v1/wizards", wizardRoutes)

app.get("/api/v1/health", (req, res) => {
    res.json({
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0",
    });
});
