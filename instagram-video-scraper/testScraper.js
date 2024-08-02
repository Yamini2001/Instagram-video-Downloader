const scrapeInstagramVideo = require('./scraper');

(async () => {
  const url = 'https://www.instagram.com/reel/C9VWSYwyXlc/?utm_source=ig_web_copy_link';
  try {
    const videoUrl = await scrapeInstagramVideo(url);
    console.log('Video URL:', videoUrl);
  } catch (error) {
    console.error('Error:', error);
  }
})();
