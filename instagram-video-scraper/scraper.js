const puppeteer = require('puppeteer');

async function scrapeInstagramVideo(url) {
  let browser;
  try {
    browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    console.log(`Navigating to ${url}`);
    await page.goto(url, { waitUntil: 'networkidle2' });

    // Wait for the page to fully load
    await page.waitForTimeout(5000);

    // Handle potential consent dialog
    try {
      const consentButtonSelector = 'button[aria-label="Accept All"]';
      await page.waitForSelector(consentButtonSelector, { timeout: 5000 });
      await page.click(consentButtonSelector);
      console.log('Accepted consent dialog');
    } catch (error) {
      console.log('No consent dialog found');
    }

    // Increase timeout and wait for the video element to load
    console.log('Waiting for video element to load...');
    await page.waitForSelector('video', { timeout: 30000 });

    // Extract the video URL
    const videoUrl = await page.evaluate(() => {
      const video = document.querySelector('video');
      return video ? video.src : null;
    });

    console.log('Video URL:', videoUrl);
    return videoUrl;
  } catch (error) {
    console.error('Error scraping video:', error);
    throw error;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

module.exports = scrapeInstagramVideo;
