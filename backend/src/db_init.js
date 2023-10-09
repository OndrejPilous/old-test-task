"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pgp = require("pg-promise")();
const dbConfig = {
    host: "host.docker.internal",
    port: 5432,
    database: "postgres",
    user: "postgres",
    password: "not_a_password_1234",
};
let db = null;
let db_initiliazed = false;
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS sreality_offers (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255),
      address VARCHAR(255),
      price VARCHAR(255),
      img VARCHAR(255),
      url VARCHAR(255)
  );
`;
async function db_init() {
    let retryCount = 0;
    const retryMax = 5;
    while (retryCount < retryMax) {
        await new Promise((resolve) => setTimeout(resolve, 5000));
        try {
            if (db === null || !db_initiliazed) {
                console.log("Configuring connection to the database");
                db = await pgp(dbConfig);
                db_initiliazed = true;
                console.log("connection data => " + db);
            }
            // Create table if it doesn't exist
            try {
                await db.query(createTableQuery);
                console.log("Table created successfully.");
                return db;
            }
            catch (err) {
                console.error("something went wrong during the table generation: " + err.message);
            }
        }
        catch (err) {
            console.error("Error during DB setup " + err.message);
            if (retryCount < retryMax) {
                console.log(`Retrying in 5 seconds (Attempt ${retryCount + 1}/${retryMax})`);
                if (db_initiliazed) {
                    db = null;
                    db_initiliazed = false;
                }
            }
            else {
                console.error("Error duting DB setup, and retries failed. Reason:  " + err.message);
            }
        }
        retryCount++;
    }
    throw new Error("Failed to initialize the database after multiple retries.");
}
exports.default = db_init;
