"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { connect } = require("./db_connect");
async function insertData(data, connect) {
    try {
        connect.none("INSERT INTO sreality_offers(title, address, price, img) VALUES($1, $2, $3, $4)", [data.title, data.address, data.price, data.img]);
    }
    catch (error) {
        console.error("Error inserting data");
        throw new Error("Error inserting data:", error.message);
    }
}
// Call the insertData function with the data to insert
exports.default = insertData;
