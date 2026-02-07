import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import documentRoutes from './routes/documentRoutes.js';
import privacyRoutes from './routes/privacyRoutes.js';
import emergencyContactRoutes from './routes/emergencyContactRoutes.js';
import safetyRoutes from './routes/safetyRoutes.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:3000' }));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/documents', documentRoutes);
app.use('/api/privacy', privacyRoutes);
app.use('/api/emergency-contacts', emergencyContactRoutes);
app.use('/api/safety', safetyRoutes);

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
