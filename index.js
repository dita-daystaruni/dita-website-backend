const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const colors = require('colors');

const connectDB = require('./config/db');
const eventRouter = require('./routes/eventRoutes');
const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('API Working'));
app.use("/api/v1/events", eventRouter);

app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`.red)});
