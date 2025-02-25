import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { pool } from './db';
const rentalsRouter = require('./routes/rentals');  // Use require for CommonJS module
const bikesRouter = require('./routes/bikes');  // Use require for CommonJS module

const app = express();
const port = 5004;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use('/rentals', rentalsRouter);
app.use('/bikes', bikesRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;