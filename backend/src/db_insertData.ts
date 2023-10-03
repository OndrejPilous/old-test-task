const { connect } = require("./db_connect");

interface SrealityOffer {
  title: string;
  address: string;
  price: string;
  img: string;
}

async function insertData(data: SrealityOffer, connect: any) {
  try {
    connect.none(
      "INSERT INTO sreality_offers(title, address, price, img) VALUES($1, $2, $3, $4)",
      [data.title, data.address, data.price, data.img]
    );
  } catch (error: any) {
    console.error("Error inserting data");
    throw new Error("Error inserting data:", error.message);
  }
  }

// Call the insertData function with the data to insert
export default insertData;
