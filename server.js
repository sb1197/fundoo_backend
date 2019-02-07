const express = require('express')
const app = express()
const dbConfig = require('./config/db_config');
const mongoose = require('mongoose');
const router = require('./routes/routes');
var cors = require('cors')
// const jwt = require('jsonwebtoken');
var bodyParser = require('body-parser');
const port = 3001;
// extended: true -> then you can parse nested objects
app.use(cors())     //used to connect two ports without any interrupt
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
//it will match any path that begins with '/'
app.use('/', router);
// Configuring the database(legacy code)
mongoose.Promise = global.Promise;
// Connecting to the database
mongoose.connect(dbConfig.url,{useNewUrlParser: true})
.then(() => {
console.log("Successfully connected to the database");
}).catch(err => {
console.log('Could not connect to the database. Exiting now...', err);
process.exit();
});
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
 
module.exports = app;