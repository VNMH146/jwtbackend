import express from 'express';
import configViewEngine from './config/viewEngine';
import initWebRoutes from './routes/web';
import initApiRoutes from './routes/api';
require("dotenv").config();
import bodyParser from 'body-parser';
import connection from './config/connectDB'
import configCors from './config/cors';
const app = express();
const PORT = process.env.PORT || 8080;

//config cors
configCors(app);
//config view engine
configViewEngine(app);


//use body-parser to post data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//test connectionDB
connection();

//init all web routes
initApiRoutes(app);
initWebRoutes(app);



app.listen(PORT, () => {
  console.log('Backend Nodejs is running on port: ' + PORT);
})