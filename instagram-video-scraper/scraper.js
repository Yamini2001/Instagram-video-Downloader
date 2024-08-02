const puppeteer = require('puppeteer');

async function scrapeInstagramVideo(url) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url);

  // Wait for the video element to load
  await page.waitForSelector('video');

  // Extract the video URL
  const videoUrl = await page.evaluate(() => {
    const video = document.querySelector('video');
    return video ? video.src : null;
  });

  await browser.close();
  return videoUrl;
}

module.exports = scrapeInstagramVideo;
