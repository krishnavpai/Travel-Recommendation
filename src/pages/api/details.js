const puppeteer = require("puppeteer");
import Tour from "../../models/AllTours";
import dbConnect from "../../middleware/mongoose";
import DetailedTour from "../../models/DetailedTour";

const handler = async (req, res) => {
  if (req.method == "GET") {
    let tours = await Tour.find();
    for (const tour of tours) {
      try{
      let url = tour.titleLink;

      let { itinerary, themes } = await getInfo({ body: { url } });
      let tdays = parseInt(tour.days);
      let tnights = parseInt(tour.nights);
      let detailedTour = new DetailedTour({
        titleText: tour.titleText,
        price: tour.price,
        destinations: tour.destinations,
        nights: tnights,
        days: tdays,
        itinerary: itinerary,
        themes: themes,
        titleLink: tour.titleLink,
        imageLink: tour.imageLink,
      });

      await detailedTour.save();
      }
      catch(err){
        console.log(err);
      }
    }
    res.status(200).json({ message: "success finally" });
  } else {
    res.status(400).json({ message: "error" });
  }
};

const getInfo = async (tourLink) => {
  let url = tourLink.body.url;

  console.log(url);
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  await page.goto(`${url}`, { waitUntil: "networkidle2" });
  // await page.goto(url,  {waitUntil: 'load '});

  // close the popup of sign tutorial
  await page.waitForSelector("#packageThemes");
  const getThemes = await page.evaluate(() => {
    let themes = "";
    let themeOuter = document
      .querySelector("#packageThemes")
      .querySelectorAll("li");
    for (const theme of themeOuter) {
      let t = theme.textContent;
      themes += t+", ";
    }
    return themes;
  });

  
  try {
    await page.waitForSelector("#detailedItinerary");
    await page.click(
      "#detailedItinerary > div.MoreLessDiv > a.readMore.disBlk"
    );
  } catch (err) {
    console.log("no more read more");
  }
  

  const getItinerary = await page.evaluate(() => {
    let itinerary = document.querySelector("#detailedItinerary").textContent;
    // remove \t and \n
    itinerary = itinerary.replace(/\t/g, "");
    itinerary = itinerary.replace(/\n/g, "");
    return itinerary;
  });

  browser.close();


  return { itinerary: getItinerary, themes: getThemes };
};

export default dbConnect(handler);
