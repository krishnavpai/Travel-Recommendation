const puppeteer = require("puppeteer");

const scrollDownAndScrape = async (page, count) => {
  let results = [];

  while (results.length < count) {
    const allTours = await page.$$(
      ".hd-container.sme-container-fluid > .packages-container"
    );

    for (const tour of allTours) {


      const titleText = await tour.evaluate(
        (el) =>
          el.querySelector(
            "div.package-details > div.package-naming-container > p > a"
          ).textContent,
        tour
      );
      const titleLink = await tour.evaluate(
        (el) =>
          el.querySelector(
            "div.package-details > div.package-naming-container > p > a"
          ).href,
        tour
      );

      let imageLink = await tour.evaluate(
        (el) =>
          el.querySelector(
            "#image-slider > div > img"
          ).src,
        tour
      );



      let  price = await tour.evaluate(
        (el) =>
          el.querySelector(
            "div.package-details > div.package-price-container > div > div.pricing-box > p > span.amount"
          ).textContent,
        tour
      );
      price = parseInt(price.replace(/,/g, ""));

      let destinations = await tour.evaluate(
        (el) =>
          el.querySelector(
            "div.package-details > div.package-naming-container > div.package-destination-itenary > div"
          ).textContent,
        tour
      );
      destinations = destinations.replace(/\s+/g, " ").trim();
      destinations = destinations.replace(/→/g, "-").trim();

      const nights = await tour.evaluate(
        (el) =>
          el.querySelector(
            "div.package-details > div.package-naming-container > div.package-seller-duration > div.package-duration > p.days>span"
          ).textContent,
        tour
      );
      const days = await tour.evaluate(
        (el) =>
          el.querySelector(
            "div.package-details > div.package-naming-container > div.package-seller-duration > div.package-duration > p.nights>span"
          ).textContent,
        tour
      );

      // await page.goto(titleLink, { waitUntil: "networkidle2" });
      // let itinerary = await page.evaluate(() => {
      //   let itinerary = document.querySelector(
      //     "#detailedItinerary").innerHTML;
      //   return itinerary;
      // });

      // await page.goBack();

      
      results.push({
        titleText,
        price,
        destinations,
        nights,
        days,
        titleLink,
        imageLink,
      });

    }

    let prevHeight = await page.evaluate("document.body.scrollHeight");
    await page.evaluate("window.scrollTo(0, document.body.scrollHeight)");
    await page.waitForFunction(`document.body.scrollHeight > ${prevHeight}`);
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }
  return results;
};

export default async (req, res) => {
  //   let source = req.body.source;
  //   let destination = req.body.destination;

  //   let url = `https://www.makemytrip.com/holidays/india/search?depCity=${source}&dest=${destination}`;
  let dest = req.body.destination;
  let url = `https://packages.yatra.com/holidays/dom/search.htm?&destination`;

  console.log(url);
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  // Nest Hub View Port Dimensions
  // await page.setViewport({ width: 1024, height: 600 });

  //Next Hub-Max View Port Dimensions
  await page.setViewport({ width: 1280, height: 800 });

  // await page.setRequestInterception(true);
  // page.on('request', (request) => {
  //     // console.log(request.url());
  //     request.continue()
  // })
  await page.goto(url, { waitUntil: "networkidle2" });
  // await page.goto(url,  {waitUntil: 'load '});

  // close the popup of sign tutorial
  /* Makemytrip
  const skipButtton = ".skipBtn";
  await page.waitForSelector(skipButtton);
  await page.click(skipButtton);

  // const dissmissButton = ".secondary-cta";
  // await page.waitForSelector(dissmissButton);
  // await page.click(dissmissButton);

  const closeIcon = ".closeMyraIframe";
  await page.waitForSelector(closeIcon);
  await page.click(closeIcon);
  */

  // const price = await tour.evaluate(
  //   (el) =>
  //     el.querySelector("price-current .blackText .latoBlack").textContent,
  //   tour
  // );

  // results.push({
  //   title,
  //   price,
  // });

  // await browser.close();
  await page.waitForSelector(
    "#menu-sort-component > div > div > ul > li.allpackages > a"
  );

  const getCount = await page.evaluate(() => {
    return document.querySelector(".allpackages>a").textContent;
  });
  let count = getCount.split(" ")[0];
  let body = await scrollDownAndScrape(page, count);
  res.status(200).json({ count, body });
};
