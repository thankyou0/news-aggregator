const { Cluster } = require("puppeteer-cluster");


const scanForLinks = async (page) => {

  const element = await page.$('div.SoaBEf');
  if (!element) {
    return [];
  }

  await page.waitForSelector('div.SoaBEf');

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

  return articles.filter(article => article !== null);
};

const Scrap = async ({ searchText, site, tbs }) => {

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



    await cluster.task(async ({ page, data: url }) => {

      console.log(url);

      await page.setUserAgent(
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36"
      );
      await page.goto(url, { waitUntil: "networkidle2" });
      const articles = await scanForLinks(page);
      allArticles = [...allArticles, ...articles];  // Collect articles from each page
    });



    console.log(`Starting search for ${searchText}`);
    const searchURL = `https://www.google.com/search?q=${searchText}+site%3A${site}&tbm=nws&${tbs}&start=`;



    for (let i = 0; i < 3; i++) {
      await cluster.queue(`${searchURL}${i * 10}`);
    }

    await cluster.idle();
    await cluster.close();

    return allArticles;  // Return the collected articles
  } catch (error) {
    console.error("An error occurred while Scraping search data:", error);
    return [];
  }
};


const scrapSearch = async (req, res) => {

  const searchText = req.query.q;
  const site = req.query.site || "";
  const last_update = req.query.last_update;

  let tbs = "";

  if (last_update && last_update !== "Anytime") {

    let max_year = new Date().getFullYear();
    let max_month = new Date().getMonth() + 1;
    let max_date = new Date().getDate();

    let min_year = new Date().getFullYear();
    let min_month = new Date().getMonth() + 1;
    let min_date = new Date().getDate();


    console.log(min_date, min_month, min_year, max_date, max_month, max_year);

    switch (last_update) {
      case "24 hours":
        console.log('afd');
        min_date = min_date - 1;
        break;
      case "Upto a Week ago":
        min_date = min_date - 7;
        break;
      case "Upto a Month ago":
        min_month = min_month - 1;
        break;
      case "Upto a Year ago":
        min_year = min_year - 1;
        break;
      default:
        break;
    }
    console.log(min_date, min_month, min_year, max_date, max_month, max_year);

    tbs = `tbs=cdr%3A1%2Ccd_min%3A${min_month}%2F${min_date}%2F${min_year}%2Ccd_max%3A${max_month}%2F${max_date}%2F${max_year}`;// for latest news, startdate = enddate

    // https://www.google.com/search?q=cricket+site%3Andtv.com&_min%3A10%2F10%2F2024%2Ccd_max%3A11%2F11%2F2024&tbm=nws
  }
  const articles = await Scrap({ searchText: searchText, site: site, tbs: tbs });

  console.log(articles.length);

  res.status(202).json({ success: true, articles: articles });

};


module.exports = { scrapSearch };

