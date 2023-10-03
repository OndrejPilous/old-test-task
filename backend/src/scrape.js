"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer = require("puppeteer");
const fs = require("fs");
async function scrape() {
    console.log("Scraping started");
    const offerArr = [];
    process.env.DBUS_SESSION_BUS_ADDRESS = "";
    return (async () => {
        const browser = await puppeteer.launch({
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
            await page.waitForSelector(offersListSel[0], { timeout: 10000 });
        }
        catch {
            await page.waitForSelector(offersListSel[1], { timeout: 10000 });
        }
        console.log("dir-property-list found");
        while (true) {
            const offers = await page.$$(`${offersListSel} > .property.ng-scope`);
            for (const singleOffer of offers) {
                if (count > 499) {
                    await browser.close();
                    return null;
                }
                try {
                    const title = await page.evaluate((el) => el.querySelector("div > div > span > h2 > a > span").textContent, singleOffer);
                    const address = await page.evaluate((el) => el.querySelector("div > div > span > span.locality.ng-binding")
                        .textContent, singleOffer);
                    const price = await page.evaluate((el) => el.querySelector("div > div > span > span.price.ng-scope > span")
                        .textContent, singleOffer);
                    const imgUrl = await page.evaluate((el) => el
                        .querySelector("preact > div > div > a:nth-child(1) > img")
                        .getAttribute("src"), singleOffer);
                    count++;
                    const property = {
                        title: title,
                        address: address,
                        price: price,
                        img: imgUrl,
                    };
                    offerArr.push(property);
                }
                catch (error) {
                    console.error(error);
                }
            }
            await page.waitForSelector(nextBtnSel);
            let nbtnHandle = await page.$(nextBtnSel);
            // console.log("trying to go to the next page");
            const nextPage = await page.evaluate((el) => el.getAttribute("href"), nbtnHandle);
            await page.goto(`https://sreality.cz/${nextPage}`);
        }
    })().then(() => {
        const jsonString = JSON.stringify(offerArr, null, 2);
        fs.writeFileSync("sreality_dump.json", jsonString, "utf-8");
        console.log("scraping done");
        return offerArr;
    });
}
exports.default = scrape;
