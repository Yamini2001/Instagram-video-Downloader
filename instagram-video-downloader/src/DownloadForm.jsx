import { useState } from 'react';

const DownloadForm = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [downloadUrl, setDownloadUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: videoUrl }),
      });
      const data = await response.json();
      if (response.ok) {
        setDownloadUrl(data.videoUrl);
        setError('');
      } else {
        setError(data.error || 'Failed to download video');
        setDownloadUrl('');
      }
    } catch (error) {
      setError('Network error');
      setDownloadUrl('');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          placeholder="Enter Instagram video URL"
          required
        />
        <button type="submit">Download</button>
      </form>
      {downloadUrl && (
        <div>
          <p>Video ready for download:</p>
          <a href={downloadUrl} target="_blank" rel="noopener noreferrer">Download Video</a>
        </div>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default DownloadForm;
