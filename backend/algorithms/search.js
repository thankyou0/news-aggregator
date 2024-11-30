
// const { Cluster } = require("puppeteer-cluster");
// const randomUseragent = require("random-useragent"); // Added random-useragent
// const addSearchLocation = require("../controllers/csearchLocation.js");
// const newsProvidermodel = require("../models/mnewsProvider.js");
// const fs = require('fs');
// const path = require('path');
// const os = require('os');

import { Cluster } from "puppeteer-cluster";
// import randomUseragent from "random-useragent"; // Added random-useragent
import addSearchLocation from "../controllers/csearchLocation.js";
import newsProvidermodel from "../models/mnewsProvider.js";
import fs from 'fs';
import path from 'path';
import os from 'os';

import mute_model from '../models/mmute.js';


const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));


const findChromeUserDataDir = () => {
  let possiblePaths = [];

  if (process.platform === 'win32') {
    const localAppData = process.env.LOCALAPPDATA;
    const appData = process.env.APPDATA;
    const username = process.env.USERNAME || os.userInfo().username;

    if (localAppData) {
      possiblePaths.push(path.join(localAppData, 'Google', 'Chrome', 'User Data'));
    }
    if (appData) {
      possiblePaths.push(path.join(appData, 'Google', 'Chrome', 'User Data'));
    }
    possiblePaths.push(path.join('C:', 'Users', username, 'AppData', 'Local', 'Google', 'Chrome', 'User Data'));
  } else if (process.platform === 'darwin') {
    possiblePaths.push(path.join(os.homedir(), 'Library', 'Application Support', 'Google', 'Chrome'));
  } else {
    possiblePaths.push(path.join(os.homedir(), '.config', 'google-chrome'));
  }

  for (const dir of possiblePaths) {
    if (fs.existsSync(dir)) {
      return dir;
    }
  }

  console.log('Could not find Chrome user data directory');
  return null;
};



const scanForLinks = async (page) => {

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

  return articles.filter(article => article !== null);
};

const Scrap = async ({ searchText, site, tbs, gl, location, page, mutedSite }) => {

  if (site) {
    site = `+site:${site}`;
  }
  if (tbs) {
    tbs = `tbs=${tbs}&`;
  }
  if (gl) {
    gl = `gl=${gl}&`;
  }
  if (location) {
    location = `+location:${location}`;
  }



  const userDataDir = findChromeUserDataDir();
  if (!userDataDir) {
    console.error('Unable to find Chrome user data directory. Please specify it manually.');
    return;
  }

  try {
    const puppeteerOptions = {
      headless: false,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        // `--user-data-dir=${userDataDir}`,
        // "--enable-automation"  // This flag might be necessary for some extensions
      ],
      // ignoreDefaultArgs: ["--enable-automation"],  // This prevents Puppeteer from using a temporary profile
      // executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
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

      console.log('url -->  ', url);

      // await page.setUserAgent(
      //   "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36"
      // );

      // await page.setUserAgent(
      //   "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:91.0) Gecko/20100101 Firefox/91.0"
      // );

      // await page.setUserAgent(
      //   "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
      // );
      await page.setUserAgent(
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.864.48 Safari/537.36 Edg/91.0.864.48"
      );


      // const userAgent = randomUseragent.getRandom(); // Get a random user agent
      // await page.setUserAgent(userAgent); // Set the random user agent
      await page.goto(url, { waitUntil: "networkidle2" });

      // await delay(20000);

      const articles = await scanForLinks(page);
      allArticles = [...allArticles, ...articles];  // Collect articles from each page
    });



    console.log(`Starting search for ${searchText}`);
    // const searchURL = `https://www.google.com/search?q=${searchText}+site%3A${site}&tbm=nws&tbs=${tbs}&start=`;
    const searchURL = `https://www.google.com/search?q=${searchText}${site}${mutedSite}${location}&tbm=nws&${gl}${tbs}start=`;
    console.log(searchURL);


    for (let i = 0; i < 1; i++) {
      await cluster.queue(`${searchURL}${page * 10}`);
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


const scrapSearch = async (req, res) => {


  let searchText = req?.query.q || "news";
  let site = req.query?.site || "";
  let tbs = req.query?.tbs || "";
  let gl = req.query?.gl || "";
  let location = req.query?.location || "";
  let page = req.params?.page;
  // console.log(page);

  let mutedSitesObject = await mute_model.findOne({ user: req.user.id }).select('mutedURL -_id');

  let mutedSitesArray = mutedSitesObject?.mutedURL;
  console.log(mutedSitesArray);
  let mutedSiteString = "";
  if (mutedSitesArray) {
    mutedSiteString = mutedSitesArray.map(url => `%20-site:${url}`).join("")
  }

  const articles = await Scrap({ searchText: searchText, site: site, tbs: tbs, gl: gl, location: location, page: page, mutedSite: mutedSiteString });

  if (articles.length) {

    let Text = location !== "" ? location : searchText;
    await addSearchLocation(req, res, Text);
  }

  articles.forEach(async (article) => {
    const urlObj = new URL(article.link);

    const ProviderBaseURL = `${urlObj.protocol}//${urlObj.hostname}`;

    try {
      const provider = await newsProvidermodel.findOne({ baseURL: ProviderBaseURL });
      if (!provider) {
        // If provider doesn't exist, create it
        await newsProvidermodel.create({
          name: article.providerName,
          baseURL: ProviderBaseURL,
          logo: article.providerImg
        });
        console.log(`Provider ${article.providerName} created successfully.`);
      } else {
        console.log(`Provider ${article.providerName} already exists.`);
      }
    }
    catch (err) {
      console.error("Error processing article:", err);
    }
  });


  res.status(202).json({ success: true, articles: articles });

};


// module.exports = { scrapSearch, Scrap };
const temp = { scrapSearch, Scrap };

export default temp;

