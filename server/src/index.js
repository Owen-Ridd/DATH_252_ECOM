const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const apiRoutes = require('./routes/index'); // Import file gộp routes

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

// Sử dụng tất cả routes với tiền tố /api
app.use('/api', apiRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server chạy tại http://localhost:${PORT}`));