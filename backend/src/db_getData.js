"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function getData(page = 1, pageSize = 20, database) {
    console.log("Getting data. Received page:", page, "pageSize:", pageSize);
    const offset = (page - 1) * pageSize;
    try {
        const getDataQuery = `SELECT * FROM sreality_offers ORDER BY id OFFSET ${offset} LIMIT ${pageSize}`; //different aproach than in the insertData. Somehow the other one didnt work
        let res = database.query(getDataQuery);
        console.log("Received output from the database");
        return res;
    }
    catch (err) {
        console.error("Something went wrong during getData" + err.message);
    }
    return [];
}
exports.default = getData;
