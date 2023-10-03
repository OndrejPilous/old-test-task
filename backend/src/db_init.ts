import scrape from "./scrape";

const {pgp, connect} = require ("./db_connect");

function db_init() {

  // initial setup for database
  const table = new pgp.helpers.TableName({
    table: "sreality_offers",
    schema: "public",
  });

  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS ${table} (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255),
        address VARCHAR(255),
        price VARCHAR(255),
        img VARCHAR(255)
    );
`;

  // execute querry
    connect().then((connection : any) => {
        return connection
          .none(createTableQuery) // Create table
          .then(() => {
            console.log("Table created successfully.");
            //scrape();
          })
          .catch((error : Error) => {
            console.error("Error creating table:", error);
          })
          .finally(() => {
            if (connection) connection.done(); // Release the connection
          });
      })
      .catch((error : Error) => {
        console.error("Error connecting to the database:", error);
      });
}

export default db_init;
