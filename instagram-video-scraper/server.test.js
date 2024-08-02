const request = require('supertest');
const express = require('express');
const scrapeInstagramVideo = require('./scraper');

const app = express();
app.use(express.json());
app.post('/api/download', async (req, res) => {
  const { url } = req.body;

  try {
    const videoUrl = await scrapeInstagramVideo(url);
    if (videoUrl) {
      res.json({ videoUrl });
    } else {
      res.status(404).json({ error: 'Video not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to scrape video' });
  }
});

describe('POST /api/download', () => {
  it('should return video URL for a valid Instagram video URL', async () => {
    const response = await request(app)
      .post('/api/download')
      .send({ url: 'VALID_INSTAGRAM_VIDEO_URL' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('videoUrl');
  });

  it('should return 404 if video not found', async () => {
    const response = await request(app)
      .post('/api/download')
      .send({ url: 'INVALID_INSTAGRAM_VIDEO_URL' });

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error', 'Video not found');
  });

  it('should return 500 if scraping fails', async () => {
    // Mock the scrapeInstagramVideo function to throw an error
    jest.spyOn(global, 'scrapeInstagramVideo').mockImplementation(() => {
      throw new Error('Scraping failed');
    });

    const response = await request(app)
      .post('/api/download')
      .send({ url: 'VALID_INSTAGRAM_VIDEO_URL' });

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('error', 'Failed to scrape video');
  });
});
