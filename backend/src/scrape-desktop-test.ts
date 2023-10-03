const puppeteer = require("puppeteer");
const fs = require("fs");

type SrealityOffer = {
  title: string;
  address: string;
  price: string;
  img: string;
};

console.log("running the scraper:\n\n");

(async () => {
  try {
    const data = await scrape();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
})();

async function scrape(): Promise<SrealityOffer[]> {
  const offerArr: SrealityOffer[] = [];

  //process.env.DBUS_SESSION_BUS_ADDRESS = "";

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
      //executablePath: "/usr/bin/google-chrome",
    });

    const page = await browser.newPage();
    await page.goto("https://www.sreality.cz/hledani/byty", {
      waitUntil: "domcontentloaded",
    });

    const userAgent =
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36";

    await page.setUserAgent(userAgent);

    let count: number = 0;

    const btnToList: string =
      "#page-layout > div.content-cover > div.content-inner > div.transcluded-content.ng-scope > div > div > div.filter.ng-scope > form > div.buttons.ng-scope > div > div > button";
    const nextBtnSel: string = ".btn-paging-pn.icof.icon-arr-right.paging-next";

    await page.waitForSelector(btnToList);

    const btn = await page.$(btnToList);
    await btn.click();

    const offersListSel: string = ".dir-property-list";
    while (true) {
      await page.waitForSelector(offersListSel, { timeout: 5000 });

      const offers = await page.$$(`${offersListSel} > .property.ng-scope`);

      for (const singleOffer of offers) {
        if (count > 499) {
          await browser.close();
          return null;
        }

        try {
          const title = await page.evaluate(
            (el: any) =>
              el.querySelector("div > div > span > h2 > a > span").textContent,
            singleOffer
          );

          const address: string = await page.evaluate(
            (el: any) =>
              el.querySelector("div > div > span > span.locality.ng-binding")
                .textContent,
            singleOffer
          );

          const price: string = await page.evaluate(
            (el: any) =>
              el.querySelector("div > div > span > span.price.ng-scope > span")
                .textContent,
            singleOffer
          );

          const imgUrl = await page.evaluate(
            (el: any) =>
              el
                .querySelector("preact > div > div > a:nth-child(1) > img")
                .getAttribute("src"),
            singleOffer
          );

          count++;

          const property: SrealityOffer = {
            title: title,
            address: address,
            price: price,
            img: imgUrl,
          };

          offerArr.push(property);
        } catch (error) {
          console.error(error);
        }
      }

      await page.waitForSelector(nextBtnSel);

      let nbtnHandle = await page.$(nextBtnSel);

      // console.log("trying to go to the next page");

      const nextPage = await page.evaluate(
        (el: any) => el.getAttribute("href"),
        nbtnHandle
      );

      await page.goto(`https://sreality.cz/${nextPage}`);
    }
  })().then(() => {
    const jsonString = JSON.stringify(offerArr, null, 2);
    fs.writeFileSync("sreality_dump.json", jsonString, "utf-8");
    return offerArr;
  });
}

export default scrape;
