import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import authRoutes from './routes/auth';
import { config } from './config';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(express.json());
app.use(express.static('dist'));
app.use('/api', authRoutes);

// Serve index.html for all routes (SPA support)
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, '../dist', 'index.html'));
});

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});