const express = require('express')
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const dbConnect = require('./src/config/db');
dotenv.config();
dbConnect();
const app = express();
app.use(bodyParser.json());
const port = process.env.PORT || 3000;

const userRoute = require('./src/routes/users.route');
app.use('/user',userRoute)

app.listen(port, () => {
  console.log(`Running at ${port}`);
});