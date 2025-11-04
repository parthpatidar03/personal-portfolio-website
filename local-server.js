// local-server.js
import "dotenv/config"; // Loads .env variables
import express from "express";
import bodyParser from "body-parser";
import contactHandler from "./api/contact.js"; // adjust path if needed
import process from "process";

const app = express();
app.use(bodyParser.json());

// Route that matches your frontend fetch('/api/contact')
app.post("/api/contact", (req, res) => contactHandler(req, res));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`✅ Local API running at http://localhost:${port}`));
