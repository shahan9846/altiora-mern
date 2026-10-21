import 'dotenv/config';
import { connectDB } from './config/db.js';
import { createApp } from './app.js';

if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET is not set (see server/.env.example)');

await connectDB();
const port = process.env.PORT || 5000;
createApp().listen(port, () => console.log(`API running on http://localhost:${port}`));
