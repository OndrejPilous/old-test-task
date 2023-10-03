"use strict";
// setting up Express.js app, defining routes, etc.
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_getData_1 = __importDefault(require("./db_getData"));
const db_init_1 = __importDefault(require("./db_init"));
const db_insertData_1 = __importDefault(require("./db_insertData"));
const scrape_1 = __importDefault(require("./scrape"));
const { connect } = require("./db_connect");
const express = require("express");
const app = express();
(0, db_init_1.default)();
scrapeAndInsertData();
async function scrapeAndInsertData() {
    try {
        const offers = await (0, scrape_1.default)();
        let connection = null;
        try {
            connection = await connect();
            offers.forEach((offer) => {
                (0, db_insertData_1.default)(offer, connection);
            });
        }
        catch (err) {
            console.error("Connection to the DB ERROR");
        }
    }
    catch (error) {
        console.error("Error scraping data:", error);
    }
}
app.get("/", (req, res) => {
    res.send("Hello, Express!");
});
app.get("/api/v1/getData", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Get the page number from query params (default to 1)
        const pageSize = parseInt(req.query.pageSize) || 20; // Get the page size from query params (default to 20)
        console.log("Getting data for page", page, "with page size", pageSize);
        const data = await (0, db_getData_1.default)(page, pageSize);
        res.send(data);
    }
    catch (error) {
        console.error("Error occurred while getting data:", error);
        res.status(500).send("Error occurred while getting data");
    }
});
const PORT = 23450;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
app.on("error", (error) => {
    throw new Error("Server error:", error);
});
