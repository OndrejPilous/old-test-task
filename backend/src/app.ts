// setting up Express.js app, defining routes, etc.

import getData from "./db_getData";
import db_init from "./db_init";
import insertData from "./db_insertData";
import scrape from "./scrape";
const { connect } = require("./db_connect");

type SrealityOffer = {
  title: string;
  address: string;
  price: string;
  img: string;
};

const express = require("express");

const app = express();

db_init();

scrapeAndInsertData();

async function scrapeAndInsertData() {
  try {
    const offers: SrealityOffer[] = await scrape();
    let connection : any = null;
    try {
      connection = await connect();
      offers.forEach((offer) => {
        insertData(offer, connection);
      });
    } catch (err) {
      console.error("Connection to the DB ERROR");
    }
  } catch (error: any) {
    console.error("Error scraping data:", error);
  }
}

app.get("/", (req: any, res: any) => {
  res.send("Hello, Express!");
});

app.get("/api/v1/getData", async (req: any, res: any) => {
  try {
    const page = parseInt(req.query.page) || 1; // Get the page number from query params (default to 1)
    const pageSize = parseInt(req.query.pageSize) || 20; // Get the page size from query params (default to 20)

    console.log("Getting data for page", page, "with page size", pageSize);

    const data = await getData(page, pageSize);
    res.send(data);
  } catch (error) {
    console.error("Error occurred while getting data:", error);
    res.status(500).send("Error occurred while getting data");
  }
});

const PORT = 23450;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.on("error", (error: any) => {
  throw new Error("Server error:", error);
});
