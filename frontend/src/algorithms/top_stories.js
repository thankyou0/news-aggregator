const puppeteer = require("puppeteer");
const randomUseragent = require("random-useragent"); // Added random-useragent
// const fs = require("fs");

const scanForLinks = async (page) => {
  // Use a single evaluate call to get both links and titles
  const result = await page.evaluate(() => {
    let Alink = [];
    let Atitle = [];

    const anchors = document.querySelectorAll(".gPFEn");
    anchors.forEach((anchor) => {
      if (anchor.hasAttribute("href")) {
        Alink.push(`https://news.google.com/${anchor.getAttribute("href")}`);
      }
    });

    anchors.forEach((title) => {
      Atitle.push(title.innerText.trim());
    });

    return { Alink, Atitle };
  });

  const { Alink, Atitle } = result;

  console.log();
  const limit = Math.min(10, Atitle.length, Alink.length); // Limit to 10 or the length of Atitle if less than 10
  for (let i = 0; i < limit; i++) {
    console.log(Atitle[i]);
    // await func(Alink[i]);
    console.log(Alink[i]);
    console.log();
  }
  console.log(limit);

  return result;
};

const find_news = async (searchby) => {
  let country = searchby.country;
  const puppeteerOptions = {
    headless: false, // Set headless to false to see the browser
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  };
  const browser = await puppeteer.launch(puppeteerOptions);
  const page = await browser.newPage();

  const userAgent = randomUseragent.getRandom(); // Get a random user agent
  await page.setUserAgent(userAgent); // Set the random user agent

  console.log(`Starting to search for Top stories in ${country}`);

  const url = `https://news.google.com/topics/CAAqKggKIiRDQkFTRlFvSUwyMHZNRFZxYUdjU0JXVnVMVWRDR2dKSlRpZ0FQAQ?hl=en-${country}&gl=${country}&ceid=${country}%3Aen`;

  await page.goto(url, { waitUntil: "networkidle2" });

  const result = await scanForLinks(page);

  setTimeout(async () => {
    await browser.close();
  }, 0);

  return result;
};

// const searchFor = [
//   {
//     country: "IN",
//   },
// ];

// // Run for each search item
// for (const searchby of searchFor) {
//   find_news(searchby);
// }
find_news({ country: "IN" });


module.exports = { find_news };