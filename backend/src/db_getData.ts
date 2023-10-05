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
    const getDataQuery =
      `SELECT * FROM sreality_offers ORDER BY id OFFSET ${offset} LIMIT ${pageSize}`; //different aproach than in the insertData. Somehow the other one didnt work
    let res = database.query(getDataQuery);
    console.log("Received output from the database");
    return res;
  } catch (err: any) {
    console.error("Something went wrong during getData" + err.message);
  }
  return [];
}

export default getData;
