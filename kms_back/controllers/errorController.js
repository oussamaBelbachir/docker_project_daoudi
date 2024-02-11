const AppError = require("../utils/AppError");

const handleCastErrorDB = err => {
    const message = `Invalid ${err.path}: ${err.value}`;
    return new AppError(message,400);
}

const devError = (err, res) => {
    return res.status(err.statusCode).json({
        status : err.status,
        message : err.message,
        error : err,
        stack : err.stack
    });
}

const prodError = (err, res) => {

    if(err.isOperational){
        return res.status(err.statusCode).json({
            status : err.status,
            message : err.message
        });
    }else{

        console.error("Error 💥 ",err);
        return res.status(500).json({
            status : "error",
            message : "Something went very wrong !"
        });
    }
}


module.exports = (err,req,res,next)=>{

    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";

    if(process.env.NODE_ENV === "development"){
        devError(err,res);

    }else if (process.env.NODE_ENV === "production"){
        let error = {...err};
        if(error.name === "CastError") error = handleCastErrorDB(error);
        prodError(error, res);
    }
    
}