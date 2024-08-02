const express = require('express');
const scrapeInstagramVideo = require('./scraper');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.post('/api/download', async (req, res) => {
  const { url } = req.body;

  try {
    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    const videoUrl = await scrapeInstagramVideo(url);
    if (videoUrl) {
      res.json({ videoUrl });
    } else {
      res.status(404).json({ error: 'Video not found' });
    }
  } catch (error) {
    console.error('Error handling request:', error);
    res.status(500).json({ error: 'Failed to scrape video' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});