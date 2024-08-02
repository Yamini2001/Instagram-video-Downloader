import { useState } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';

const DownloadForm = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleDownload = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/download', { url });
      const videoUrl = response.data.videoUrl;

      if (videoUrl) {
        // Fetch the video blob
        const videoResponse = await axios.get(videoUrl, {
          responseType: 'blob',
        });

        // Save the video blob using file-saver
        const blob = new Blob([videoResponse.data], { type: 'video/mp4' });
        saveAs(blob, 'instagram-video.mp4');
      } else {
        setError('Video not found');
      }
    } catch (error) {
      console.error('Error downloading video:', error);
      setError('Failed to download video');
    }

    setLoading(false);
  };

  return (
    <div>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter Instagram video URL"
      />
      <button onClick={handleDownload} disabled={loading}>
        {loading ? 'Downloading...' : 'Download'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default DownloadForm;
