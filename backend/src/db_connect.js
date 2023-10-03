"use strict";
const pgp = require("pg-promise")();
const db = pgp({
    host: "host.docker.internal",
    port: 5432,
    database: "postgres",
    user: "postgres",
    password: "not_a_password_1234",
});
async function connect() {
    let isConnected = false;
    let connection = null;
    while (!isConnected) {
        try {
            connection = await db.connect();
            isConnected = true;
        }
        catch (error) {
            console.error("Failed to connect to the database. Retrying in 5 seconds...");
            await new Promise((resolve) => setTimeout(resolve, 5000)); // Retry after 5 seconds
        }
    }
    return connection;
}
module.exports = {
    db,
    pgp,
    connect
};
