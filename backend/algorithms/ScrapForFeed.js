const { Cluster } = require("puppeteer-cluster");
const randomUseragent = require("random-useragent"); // Added random-useragent
const { scrapSearch } = require("./search.js");

const scanForLinks = async (page, count) => {

  const element = await page.$('div.SoaBEf');
  if (!element) {
    return [];
  }

  await page.waitForSelector('div.SoaBEf div.SoAPf div.MgUUmf.NUnG9d');

  const articles = await page.$$eval('div.SoaBEf', articles => {
    return articles.map(article => {
      const titleElement = article.querySelector('div.SoAPf div.n0jPhd.ynAwRc.MBeuO.nDgy9d');
      const linkElement = article.querySelector('a.WlydOe');
      const imgURLElement = article.querySelector('div.gpjNTe div.YEMaTe.JFSfwc div.uhHOwf.BYbUcd img'); // Update with the correct selector
      const timeElement = article.querySelector('div.SoAPf div.OSrXXb.rbYSKb.LfVVr');
      const providerImgElement = article.querySelector('div.SoAPf div.MgUUmf.NUnG9d g-img.QyR1Ze.ZGomKf img'); // Update with the correct selector
      // const providerImgElement2 = article.querySelector('div.MCAGUe div.oovtQ img.qEdqNd.y3G2Ed'); // Update with the correct selector
      const providerNameElement = article.querySelector('div.SoAPf div.MgUUmf.NUnG9d span'); // Update with the correct selector
      const someTextElement = article.querySelector('div.SoAPf div.GI74Re.nDgy9d');

      const articleData = {
        title: titleElement ? titleElement.textContent.trim() : null,
        someText: someTextElement ? someTextElement.textContent : null,
        link: linkElement ? linkElement.getAttribute('href') : null,
        imgURL: imgURLElement ? imgURLElement.getAttribute('src') : null,
        time: timeElement ? timeElement.textContent : null,
        providerImg: providerImgElement ? providerImgElement.getAttribute('src') : null,
        providerName: providerNameElement ? providerNameElement.textContent : null
      };

      return (articleData && articleData.title && articleData.someText && articleData.link && articleData.time && articleData.providerImg && articleData.providerName) ? articleData : null;


    });
  });

  return articles.filter(article => article !== null).slice(0, count);
};

const ScrapForFeed = async (SearchTexts) => {


  try {
    const puppeteerOptions = {
      headless: false,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
      defaultViewport: false,
    };
    const cluster = await Cluster.launch({
      concurrency: Cluster.CONCURRENCY_PAGE,
      maxConcurrency: 3,
      puppeteerOptions: puppeteerOptions,
    });

    cluster.on("taskerror", (err, data) => {
      console.log(`Error crawling ${data}: ${err.message}`);
    });

    let allArticles = [];  // Array to hold all articles


    let articleCount = 11; // Start with 7 articles

    await cluster.task(async ({ page, data: url }) => {

      // console.log(url);

      await page.setUserAgent(
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36"
      );
      // const userAgent = randomUseragent.getRandom(); // Get a random user agent
      // await page.setUserAgent(userAgent); // Set the random user agent
      await page.goto(url, { waitUntil: "networkidle2" });
      const articles = await scanForLinks(page, articleCount);
      console.log(url, articles.length);

      allArticles = [...allArticles, ...articles];  // Collect articles from each page
      articleCount = Math.max(articleCount - 1, 1); // Decrease the count but ensure it doesn't go below 1

    });



    console.log(`Starting search for ${SearchTexts}`);
    // const searchURL = `https://www.google.com/search?q=${searchText}+site%3A${site}&tbm=nws&tbs=${tbs}&start=`;
    const searchURL = `https://www.google.com/search?q=`;


    console.log(SearchTexts);

    for (let i = 0; i < SearchTexts.length; i++) {
      await cluster.queue(`${searchURL}${SearchTexts[i]}&tbm=nws`);
    }

    await cluster.idle();
    await cluster.close();

    console.log(allArticles.length);

    return allArticles;  // Return the collected articles
  } catch (error) {
    console.error("An error occurred while Scraping search data:", error);
    return [];
  }
};



module.exports = { ScrapForFeed };



// const { Cluster } = require("puppeteer-cluster");
// const randomUseragent = require("random-useragent");
// const { scrapSearch } = require("./search.js");

// const scanForLinks = async (page, count) => {
//   const element = await page.$('div.SoaBEf');
//   if (!element) {
//     return [];
//   }

//   await page.waitForSelector('div.SoaBEf div.SoAPf div.MgUUmf.NUnG9d');

//   const articles = await page.$$eval('div.SoaBEf', articles => {
//     return articles.map(article => {
//       const titleElement = article.querySelector('div.SoAPf div.n0jPhd.ynAwRc.MBeuO.nDgy9d');
//       const linkElement = article.querySelector('a.WlydOe');
//       const imgURLElement = article.querySelector('div.gpjNTe div.YEMaTe.JFSfwc div.uhHOwf.BYbUcd img');
//       const timeElement = article.querySelector('div.SoAPf div.OSrXXb.rbYSKb.LfVVr');
//       const providerImgElement = article.querySelector('div.SoAPf div.MgUUmf.NUnG9d g-img.QyR1Ze.ZGomKf img');
//       const providerNameElement = article.querySelector('div.SoAPf div.MgUUmf.NUnG9d span');
//       const someTextElement = article.querySelector('div.SoAPf div.GI74Re.nDgy9d');

//       const articleData = {
//         title: titleElement ? titleElement.textContent.trim() : null,
//         someText: someTextElement ? someTextElement.textContent : null,
//         link: linkElement ? linkElement.getAttribute('href') : null,
//         imgURL: imgURLElement ? imgURLElement.getAttribute('src') : null,
//         time: timeElement ? timeElement.textContent : null,
//         providerImg: providerImgElement ? providerImgElement.getAttribute('src') : null,
//         providerName: providerNameElement ? providerNameElement.textContent : null
//       };

//       return (articleData && articleData.title && articleData.someText && articleData.link && articleData.time && articleData.providerImg && articleData.providerName) ? articleData : null;

//     });
//   });

//   // Return only the first 'count' articles and filter out nulls
//   return articles.filter(article => article !== null).slice(0, count);
// };

// const ScrapForFeed = async (SearchTexts) => {
//   try {
//     const puppeteerOptions = {
//       headless: false,
//       args: ["--no-sandbox", "--disable-setuid-sandbox"],
//       defaultViewport: false,
//     };
//     const cluster = await Cluster.launch({
//       concurrency: Cluster.CONCURRENCY_PAGE,
//       maxConcurrency: 3,
//       puppeteerOptions: puppeteerOptions,
//     });

//     cluster.on("taskerror", (err, data) => {
//       console.log(`Error crawling ${data}: ${err.message}`);
//     });

//     let allArticles = [];
//     let articleCount = 7; // Start with 7 articles

//     await cluster.task(async ({ page, data: url }) => {
//       console.log(url);
//       await page.setUserAgent(randomUseragent.getRandom());
//       await page.goto(url, { waitUntil: "networkidle2" });
//       const articles = await scanForLinks(page, articleCount); // Pass the current count
//       allArticles = [...allArticles, ...articles];  // Collect articles from each page
//       articleCount = Math.max(articleCount - 1, 1); // Decrease the count but ensure it doesn't go below 1
//     });

//     console.log(`Starting search for ${SearchTexts}`);
//     const searchURL = `https://www.google.com/search?q=`;

//     console.log(SearchTexts);
//     for (let i = 0; i < SearchTexts.length; i++) {
//       await cluster.queue(`${searchURL}${SearchTexts[i]}&tbm=nws`);
//     }

//     await cluster.idle();
//     await cluster.close();

//     console.log(allArticles.length);
//     return allArticles;  // Return the collected articles
//   } catch (error) {
//     console.error("An error occurred while Scraping search data:", error);
//     return [];
//   }
// };

// module.exports = { ScrapForFeed };
