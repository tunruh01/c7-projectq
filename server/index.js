const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const app = express();
// const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');
// const keys = require('./config/keys');
const mainRoutes = require('./routes/main')

// DB Setup
mongoose.connect('mogodb://localhost/projectq');

app.use(cors());
app.use(mainRoutes);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// router(app);

app.listen(5000, () => {
    console.log('Node js is listening on port ' + 5000)
})

