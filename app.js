const fs = require('fs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const express = require('express');
const app = express()
const passport = require('passport');
const router = express.Router()
const stringSimilarity = require('string-similarity');
const {check , validationResult}  = require('express-validator');
const e = require('express');
const cors = require('cors')
mongoose.set('useFindAndModify', false);

//reading JSON file
var data=fs.readFileSync('Lab3-timetable-data.json', 'utf8');
var newdata=JSON.parse(data);

//serving static files 
app.use('/', express.static('static'))
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(cors())
const dotenv = require('dotenv');
dotenv.config();

//making connection to the database
const port = process.env.PORT || 3000;
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
.then((results) => app.listen(port), console.log("Connected"))
.catch((err) => console.log(err));

require('./models/model');
require('./config/passport');
app.use(require('./routes'));

