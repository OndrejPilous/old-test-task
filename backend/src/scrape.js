"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_1 = __importDefault(require("puppeteer"));
const fs_1 = __importDefault(require("fs"));
async function scrape() {
    console.log("Scraping started");
    // Prevent issues with DBUS_SESSION_BUS_ADDRESS
    process.env.DBUS_SESSION_BUS_ADDRESS = "";
    return await scrapeProcess();
}
async function scrapeProcess() {
    let offerArr = [];
    const browser = await puppeteer_1.default.launch({
        headless: true,
        args: [
            "--no-sandbox",
            "--disable-dev-shm-usage",
            "--disable-gpu",
            "--unlimited-storage",
            "--disable-setuid-sandbox",
        ],
        defaultViewport: null,
        executablePath: "/usr/bin/google-chrome",
    });
    const page = await browser.newPage();
    await page.goto("https://www.sreality.cz/hledani/prodej/byty", {
        waitUntil: "domcontentloaded",
    });
    const userAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36";
    await page.setUserAgent(userAgent);
    console.log("Scraping initialized");
    let count = 0;
    const nextBtnSel = ".btn-paging-pn.icof.icon-arr-right.paging-next";
    const offersListSel = [
        ".dir-property-list",
        "#page-layout > div.content-cover > div.content-inner > div.transcluded-content.ng-scope > div > div > div > div > div:nth-child(4) > div",
    ];
    try {
        while (true) {
            let located = false;
            while (!located) {
                var offers = {};
                try {
                    await page.waitForSelector(offersListSel[0], { timeout: 10000 });
                    try {
                        offers = await page.$$(`${offersListSel} > .property.ng-scope`);
                        located = true;
                    }
                    catch (err) {
                        console.log("Could not find the right elements: " + err);
                    }
                }
                catch (err) {
                    console.error("ERROR: " + err.message);
                }
            }
            for (const singleOffer of offers) {
                if (offerArr.length > 499) {
                    console.log("Scraping done, ending cycle");
                    return offerArr;
                }
                try {
                    const relativePath = await page.evaluate((el) => el
                        .querySelector("div > div > span > h2 > a")
                        .getAttribute("href"), singleOffer);
                    const title = await page.evaluate((el) => el.querySelector("div > div > span > h2 > a > span").textContent, singleOffer);
                    const address = await page.evaluate((el) => el.querySelector("div > div > span > span.locality.ng-binding")
                        .textContent, singleOffer);
                    const price = await page.evaluate((el) => el.querySelector("div > div > span > span.price.ng-scope > span")
                        .textContent, singleOffer);
                    const imgUrl = await page.evaluate((el) => el
                        .querySelector("preact > div > div > a:nth-child(1) > img")
                        .getAttribute("src"), singleOffer);
                    count++;
                    let url = new URL(relativePath, "https://www.sreality.cz/").href;
                    const property = {
                        title: title,
                        address: address,
                        price: price,
                        img: imgUrl,
                        url: url,
                    };
                    offerArr.push(property);
                    offerArr = offerArr.filter(isUnique);
                }
                catch (error) {
                    console.error("Error during data scraping" + error);
                }
            }
            await page.waitForSelector(nextBtnSel);
            let nbtnHandle = await page.$(nextBtnSel);
            const nextPage = await page.evaluate((el) => el.getAttribute("href"), nbtnHandle);
            await page.goto(`https://sreality.cz/${nextPage}`);
        }
    }
    catch (err) {
        console.error("Error while scraping: " + err);
    }
    finally {
        const jsonString = JSON.stringify(offerArr, null, 2);
        fs_1.default.writeFileSync("sreality_dump.json", jsonString, "utf-8");
        console.log("scraping done");
        return offerArr;
    }
}
function isUnique(item, index, array) {
    return array.findIndex((obj) => obj.img === item.img) === index;
}
exports.default = scrape;
