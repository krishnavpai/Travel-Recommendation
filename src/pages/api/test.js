const puppeteer = require("puppeteer");

export default async (req, res) => {
  //   let source = req.body.source;
  //   let destination = req.body.destination;
  let source = "Mumbai";
  let destination = "Goa";

  let url = `https://www.makemytrip.com/holidays/india/search?depCity=${source}&dest=${destination}`;

  console.log(url);
  //   let url =  `https://holidayz.makemytrip.com/holidays/india/search?depCity=${source}&dest=${destination}`;
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  // Nest Hub View Port Dimensions
  // await page.setViewport({ width: 1024, height: 600 });

  //Nesr Hub-Max View Port Dimensions
  await page.setViewport({ width: 1280, height: 800});

  // await page.setRequestInterception(true);
  // page.on('request', (request) => {
  //     // console.log(request.url());
  //     request.continue()
  // })
  await page.goto(url,  {waitUntil: 'networkidle2'});
  // await page.goto(url,  {waitUntil: 'load '});


  // close the popup of sign tutorial
  const skipButtton = ".skipBtn";
  await page.waitForSelector(skipButtton);
  await page.click(skipButtton);

  // const dissmissButton = ".secondary-cta";
  // await page.waitForSelector(dissmissButton);
  // await page.click(dissmissButton);

  const closeIcon = ".closeMyraIframe";
  await page.waitForSelector(closeIcon);
  await page.click(closeIcon);



  const allTours = await page.$$(".slick-list");
  let results = [];

  for (const tour of allTours) {
    const title = await tour.evaluate(
      (el) =>
        el.querySelector(
          "div >div.itemCard.packageCard > div.packageNameRow > h4"
        ).textContent,
      tour
    );
    console.log("hi");
    console.log(title);
    // const price = await tour.evaluate(
    //   (el) =>
    //     el.querySelector("price-current .blackText .latoBlack").textContent,
    //   tour
    // );

    // results.push({
    //   title,
    //   price,
    // });
    results.push({
      title,
    });
  }

  // await browser.close();
  res.status(200).json({ results });
};
