interface SrealityOffer {
  title: string;
  address: string;
  price: string;
  img: string;
  url: string;
}

async function getData(
  page: number = 1,
  pageSize: number = 20,
  database: any
): Promise<SrealityOffer[]> {
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
    } else {
      console.error("No data received from the database query.");
      throw new Error("No data received from the database query.");
    }
  } catch (err: any) {
    console.error("Something went wrong during getData:", err.message);
    throw new Error("Error getting data from the database.");
  }
}

export default getData;
