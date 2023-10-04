interface SrealityOffer {
  title: string;
  address: string;
  price: string;
  img: string;
}

const insertQuery =
  "INSERT INTO sreality_offers(title, address, price, img) VALUES($1, $2, $3, $4)";

async function insertData(data: SrealityOffer, database:any) {
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
  } catch (err: any) {
    console.error(
      "Error occured during data insertion to the database. ERROR: " +
        err.message
    );
  }
}

export default insertData;
