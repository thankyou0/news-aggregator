const puppeteer = require('puppeteer');
const fs = require('fs');
const https = require('https');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate to the page with the image
  await page.goto('https://news.google.com/topics/CAAqKggKIiRDQkFTRlFvSUwyMHZNRFZxYUdjU0JXVnVMVWRDR2dKSlRpZ0FQAQ?hl=en-IN&gl=IN&ceid=IN%3Aen', { waitUntil: 'networkidle2' });

  // Scrape the image URL (replace the selector with the one for your image)
  const imageUrl = await page.evaluate(() => {
    return document.querySelector('div.MCAGUe img.msvBD.zC7z7b').getAttribute('src'); // Adjust the selector to target your specific image
  });

  console.log('Image URL:', imageUrl);

  // Download the image
  const downloadImage = (url, filepath) => {
    return new Promise((resolve, reject) => {
      https.get(url, (response) => {
        const fileStream = fs.createWriteStream(filepath);
        response.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close(resolve);
        });
      }).on('error', (err) => {
        fs.unlink(filepath);
        reject(err.message);
      });
    });
  };

  const imagePath = path.join(__dirname, 'downloaded-image.jpg');
  await downloadImage(imageUrl, imagePath);

  console.log('Image downloaded to:', imagePath);

  await browser.close();
})();
