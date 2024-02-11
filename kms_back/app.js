const express = require("express");
const morgan = require("morgan");
const AppError = require("./utils/AppError");
const GlobalHandlerErrors = require("./controllers/errorController");
const cors = require("cors");
const bodyParser = require('body-parser');
const app = express();

if(process.env.NODE_ENV === "development"){
    app.use(morgan("dev"));
}

var corsOptions = {
    origin: ['http://localhost:5173','localhost:5173','http://localhost:3500','localhost:3500'],
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    credentials: true
  }


app.use(cors(corsOptions));
 
// Increase the request size limit (e.g., 10 MB)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// const root = require("path").join(__dirname,"build");
// app.use(express.static(root));
app.use("/uploads",express.static('uploads'));


app.use(express.json()); //Return middleware that only parses json and only looks at requests where the Content-Type header matches the type option.

const artcileRouter = require("./routes/articleRoutes");
const userRouter = require("./routes/userRoutes");

app.use("/api/v1/articles",artcileRouter);
app.use("/api/v1/users",userRouter);


app.all("*",(req,res,next)=>{
// console.log(hh);
    next(new AppError(`Can't find ${req.originalUrl} on the server !`,404));
});
app.use(GlobalHandlerErrors);

module.exports = app;