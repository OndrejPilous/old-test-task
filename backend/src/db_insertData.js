"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const insertQuery = "INSERT INTO sreality_offers(title, address, price, img) VALUES($1, $2, $3, $4)";
async function insertData(data, database) {
    try {
        database.query(insertQuery, [data.title, data.address, data.price, data.img]);
        // console.log("data insert succesful");
        // console.log(
        //   "data inserted: " +
        //     data.title +
        //     "\n" +
        //     data.address +
        //     "\n" +
        //     data.price +
        //     "\n" +
        //     data.img
        // );
    }
    catch (err) {
        console.error("Error occured during data insertion to the database. ERROR: " +
            err.message);
    }
}
exports.default = insertData;
