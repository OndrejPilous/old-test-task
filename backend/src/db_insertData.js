"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const insertQuery = "INSERT INTO sreality_offers(title, address, price, img, url) VALUES($1, $2, $3, $4, $5)";
async function insertData(data, database) {
    try {
        // Execute the insert query with parameterized values
        const result = await database.query(insertQuery, [
            data.title,
            data.address,
            data.price,
            data.img,
            data.url,
        ]);
        if (result) {
            console.log("Data inserted successfully.");
        }
        else {
            console.error("Data insertion failed.");
            throw new Error("Data insertion failed.");
        }
    }
    catch (err) {
        console.error("Error occured during data insertion to the database. ERROR: " +
            err.message);
        throw new Error("Error occurred during data insertion.");
    }
}
exports.default = insertData;
