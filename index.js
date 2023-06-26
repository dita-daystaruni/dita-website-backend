const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');



//Local Imports
const connectDB = require('./config/db');
const eventRouter = require('./routes/eventRoutes');
const galleryRouter = require('./routes/galleryRoutes');
const testimonialRouter = require('./routes/testimonialRoutes');
const statementRouter = require('./routes/statementRoutes');
const leadershipRouter = require('./routes/leadershipRoutes');
const serviceRouter = require('./routes/serviceRoutes');
const contactRouter = require('./routes/contactRoutes');
const userRouter = require('./routes/userRoutes');


const app = express();


//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
const PORT = process.env.PORT || 5000;

connectDB();

//routes
app.get('/', (req, res) => res.send('API Working'));

//app routes
app.use("/api/v1/events", eventRouter);
app.use("/api/v1/gallery", galleryRouter);
app.use("/api/v1/testimonials", testimonialRouter);
app.use("/api/v1/statements", statementRouter);
app.use("/api/v1/leadership", leadershipRouter);
app.use("/api/v1/services", serviceRouter);
app.use("/api/v1/contact", contactRouter);
app.use("/api/v1/admin", userRouter);



//listener
app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`)});
