const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const connectDB = require('./config/db');

connectDB();

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Serve Frontend static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, '../frontend')));

app.use('/api/auth',     require('./routes/auth'));
app.use('/api/plants',   require('./routes/plants'));
app.use('/api/diagnose', require('./routes/diagnose'));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: '🌿 LeafCare API is running' });
});

// Root URL serves the frontend index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n🌿 LeafCare Server running on port ${PORT}`);
  console.log(`   Frontend: http://localhost:${PORT}`);
  console.log(`   API: http://localhost:${PORT}/api/health\n`);
});
