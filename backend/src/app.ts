// setting up Express.js app, defining routes, etc.

import getData from "./db_getData";
import insertData from "./db_insertData";
import scrape from "./scrape";
import db_init from "./db_init";
import path from "path";
import cors from "cors";
import express from "express";

const app = express();

// Enable CORS for your API
app.use(cors());

// Serve static files from the 'build' directory
app.use(express.static(path.join(__dirname, "build")));

// Define a type for SrealityOffer
interface SrealityOffer {
  title: string;
  address: string;
  price: string;
  img: string;
  url: string;
};


let database: any = null;

async function main() {
  try {
    database = await db_init();
    await scrapeAndInsertData(database);
  } catch (err: any) {
    console.log("error during application - " + err.message);
  }
}

main();

app.get("/api", (req: any, res: any) => {
  res.send("Hello, Express!");
});

app.get("/api/v1/getData/", async (req: any, res: any) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 20;

    console.log("A request for data received");

    const data = await getData(page, pageSize, database);
    console.log("Sending data to the user");

    res.status(200).json(data);
  } catch (error) {
    console.error("Error occurred while getting data:", error);
    res.status(500).send("Error occurred while getting data");
  }
});

app.get("*", (req: any, res: any) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.on("error", (error: any) => {
  throw new Error("Server error:", error);
});

async function scrapeAndInsertData(database: any) {
  const maxRetries: number = 5; // Set a maximum retry count
  let retryCount: number = 0;

  try {
    const offers: SrealityOffer[] = await scrape();

    while (retryCount < maxRetries) {
      try {
        for (const offer of offers) {
          await insertData(offer, database);
        }
        console.log("Connection to DB was successful, and data inserted");
        return;
      } catch (err: any) {
        console.error(
          "Connection to the DB ERROR. Retrying in 5 seconds. ERROR:",
          err.message
        );
        await new Promise((resolve) => setTimeout(resolve, 5000));
        retryCount++;
      }
      if (retryCount === maxRetries) {
        console.error("Maximum retry count reached. Data insertion failed.");
        break;
      }
    }
  } catch (error) {
    console.error("Error scraping data:", error);
  }
}
