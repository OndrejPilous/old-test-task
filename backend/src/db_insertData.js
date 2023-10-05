"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const insertQuery = "INSERT INTO sreality_offers(title, address, price, img, url) VALUES($1, $2, $3, $4, $5)";
async function insertData(data, database) {
    try {
        database.query(insertQuery, [data.title, data.address, data.price, data.img, data.url]);
        // console.log("data insert succesful");
    }
    catch (err) {
        console.error("Error occured during data insertion to the database. ERROR: " +
            err.message);
    }
}
exports.default = insertData;
