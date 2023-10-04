"use strict";
// setting up Express.js app, defining routes, etc.
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_getData_1 = __importDefault(require("./db_getData"));
const db_insertData_1 = __importDefault(require("./db_insertData"));
const scrape_1 = __importDefault(require("./scrape"));
const { db, db_init } = require("./db_init");
const path = require("path");
let database = null;
const express = require("express");
const app = express();
app.use(express.static(path.join(__dirname, "build"))); // serves static files from the build directory
main();
async function main() {
    try {
        database = await db_init();
        await scrapeAndInsertData(database);
    }
    catch (err) {
        console.log("error during application - " + err.message);
    }
}
app.get("/api", (req, res) => {
    res.send("Hello, Express!");
});
app.get("/api/v1/getData/", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 20;
        console.log("A request for data received");
        const data = await (0, db_getData_1.default)(page, pageSize, database);
        console.log("Sending data to the user");
        res.status(200).send(data);
    }
    catch (error) {
        console.error("Error occurred while getting data:", error);
        res.status(500).send("Error occurred while getting data");
    }
});
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
app.on("error", (error) => {
    throw new Error("Server error:", error);
});
async function scrapeAndInsertData(database) {
    const maxRetries = 5; // Set a maximum retry count
    let retryCount = 0;
    try {
        const offers = await (0, scrape_1.default)();
        while (retryCount < maxRetries) {
            try {
                for (const off of offers) {
                    await (0, db_insertData_1.default)(off, database);
                }
                console.log("Connection to DB was successful, and data inserted");
                return;
            }
            catch (err) {
                console.error("Connection to the DB ERROR. Retrying in 5 seconds. ERROR:", err.message);
                await new Promise((resolve) => setTimeout(resolve, 5000));
                retryCount++;
            }
            if (retryCount === maxRetries) {
                console.error("Maximum retry count reached. Data insertion failed.");
                break;
            }
        }
    }
    catch (error) {
        console.error("Error scraping data:", error);
    }
}
