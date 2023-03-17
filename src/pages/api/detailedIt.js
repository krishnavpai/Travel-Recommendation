const puppeteer = require("puppeteer");



export default async (req, res) => {
  //   let source = req.body.source;
  //   let destination = req.body.destination;

  //   let url = `https://www.makemytrip.com/holidays/india/search?depCity=${source}&dest=${destination}`;
  let url = `https://packages.yatra.com/holidays/dom/details.htm?packageId=2516126094&parentPageId=a945b29c-cb60-452e-86a3-d4fff78c79dc`;

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



  
  
  await page.waitForSelector("#detailedItinerary");
  await page.click("#detailedItinerary > div.MoreLessDiv > a.readMore.disBlk"); 

  const getItinerary = await page.evaluate(() => {
    let itinerary = document.querySelector("#detailedItinerary").textContent;
    // remove \t and \n
    itinerary = itinerary.replace(/\t/g, "");
    itinerary = itinerary.replace(/\n/g, "");
    return itinerary;
    });
    

    await page.waitForSelector("#packageThemes");

    const getThemes = await page.evaluate(() => {
      let themes = "";
      let themeOuter = document.querySelector("#packageThemes").querySelectorAll("li")
      for(const theme of themeOuter){
        let t = theme.textContent;
        themes +=" "+t;
      }
      return themes;
    });


  
  
  res.status(200).json({ getItinerary, getThemes});
};
