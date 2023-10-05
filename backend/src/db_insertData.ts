interface SrealityOffer {
  title: string;
  address: string;
  price: string;
  img: string;
  url: string;
}

const insertQuery =
  "INSERT INTO sreality_offers(title, address, price, img, url) VALUES($1, $2, $3, $4, $5)";

async function insertData(data: SrealityOffer, database:any) {
  try {
    database.query(insertQuery, [data.title, data.address, data.price, data.img, data.url]);
    // console.log("data insert succesful");
  } catch (err: any) {
    console.error(
      "Error occured during data insertion to the database. ERROR: " +
        err.message
    ); 
  }
}

export default insertData;
