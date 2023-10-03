"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { connect } = require("./db_connect");
async function getData(page = 1, pageSize = 20) {
    console.log("Getting data! Received page:", page, "pageSize:", pageSize);
    let connection = null;
    try {
        connection = await connect();
        console.log("Connected to database");
        const offset = (page - 1) * pageSize;
        const data = await connection.any("SELECT * FROM sreality_offers ORDER BY id OFFSET $1 LIMIT $2", [offset, pageSize]);
        console.log("Received output from the database");
        return data;
    }
    catch (error) {
        console.error("Error in getData:", error);
        throw error;
    }
}
exports.default = getData;
