require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/auth');
const txRoutes = require('./routes/transactions');
const summaryRoutes = require('./routes/summary');
const budgetRoutes = require('./routes/budget');

app.use('/auth', authRoutes);
app.use('/transaction', txRoutes);
app.use('/summary', summaryRoutes);
app.use('/budget', budgetRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=> console.log('Server running on', PORT));

app.get("/test", (req, res) => {
    res.json({ message: "MySQL backend working!" });
  });
  