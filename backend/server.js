const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const connectDB = require('./config/db');

connectDB();

const app = express();

app.use(cors({
  origin: ['http://localhost:5500', 'http://127.0.0.1:5500', 'http://localhost:3000'],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth',     require('./routes/auth'));
app.use('/api/plants',   require('./routes/plants'));
app.use('/api/diagnose', require('./routes/diagnose'));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: '🌿 LeafCare API is running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n🌿 LeafCare Server running on port ${PORT}`);
  console.log(`   API: http://localhost:${PORT}/api/health\n`);
});
