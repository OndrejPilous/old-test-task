const { connect } = require("./db_connect");

interface SrealityOffer {
  title: string;
  address: string;
  price: string;
  img: string;
}

async function getData(page: number=1, pageSize: number=20): Promise<SrealityOffer[]> {
  console.log("Getting data! Received page:", page, "pageSize:", pageSize);

  let connection = null;
  try {
    connection = await connect();

    console.log("Connected to database");
    const offset = (page - 1) * pageSize;

    const data = await connection.any(
      "SELECT * FROM sreality_offers ORDER BY id OFFSET $1 LIMIT $2",
      [offset, pageSize]
    );

    console.log("Received output from the database");

    return data;
  } catch (error: any) {
    console.error("Error in getData:", error);
    throw error;
  }
}

export default getData;
