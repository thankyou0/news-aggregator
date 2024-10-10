const puppeteer = require("puppeteer");


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

const Scrap = async ({ searchText }) => {

  try {
    const puppeteerOptions = {
      headless: false, // Set headless to false to see the browser
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    };

    const browser = await puppeteer.launch(puppeteerOptions);

    const page = await browser.newPage();

    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36"
    );

    console.log(`starting search for ${searchText}`);

    const searchURL = `https://www.google.com/search?q=${searchText}&tbm=nws`;
    console.log(searchURL);

    await page.goto(searchURL, { waitUntil: "networkidle2" });

    const articles = await scanForLinks(page);

    console.log(articles);

    await browser.close();
    setTimeout(() => {
    }, 0);
    console.log(articles);
    return articles;
  }
  catch (error) {
    return "An error occurred while Scraping search data.";
  }
};



const scrapSearch = async (req, res) => {

  const searchText = req.query.q;
  const articles = await Scrap({ searchText: searchText });

  res.status(202).json({ success: true, articles: articles });

};

module.exports = { scrapSearch };