import { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Box, Typography } from '@mui/material';

export default function App() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  const handleShorten = async () => {
    if (!url) return;
    try {
      const res = await axios.post('/shorten', { url });
      const code = res.data.short as string;
      setShortUrl(`${window.location.origin}/${code}`);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Box display="flex" gap={2}>
        <TextField
          fullWidth
          label="URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <Button variant="contained" onClick={handleShorten}>
          Shorten
        </Button>
      </Box>
      {shortUrl && (
        <Typography variant="h6" sx={{ mt: 4 }}>
          Short URL: <a href={shortUrl}>{shortUrl}</a>
        </Typography>
      )}
    </Container>
  );
}
