"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function getData(page = 1, pageSize = 20, database) {
    console.log("Getting data. Received page:", page, "pageSize:", pageSize);
    const offset = (page - 1) * pageSize;
    try {
        const getDataQuery = `SELECT * FROM sreality_offers ORDER BY id OFFSET $1 LIMIT $2`; //different aproach than in the insertData. Somehow the other one didnt work
        const res = await database.query(getDataQuery, [
            offset,
            pageSize,
        ]);
        console.log("Received output from the database");
        // Ensure that the query was successful before returning the data
        if (res) {
            return res;
        }
        else {
            console.error("No data received from the database query.");
            throw new Error("No data received from the database query.");
        }
    }
    catch (err) {
        console.error("Something went wrong during getData:", err.message);
        throw new Error("Error getting data from the database.");
    }
}
exports.default = getData;
