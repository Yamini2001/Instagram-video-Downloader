const scrapeInstagramVideo = require('./scraper');

(async () => {
  const url = 'https://www.instagram.com/reels/C-HrxDdSt1G/';
  try {
    const videoUrl = await scrapeInstagramVideo(url);
    console.log('Video URL:', videoUrl);
  } catch (error) {
    console.error('Error:', error);
  }
})();
