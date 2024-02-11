const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
    
    destination : function(req,file,cb){
       
        cb(null,"uploads/");
    },
    filename : function(req,file,cb){
        cb(null,new Date().toISOString() + file.originalname);
    },
});


const fileFilter = (req,file,cb) => {
    const ext = path.extname(file.originalname).toLowerCase();

    if(
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png" ||
        ext === ".jpg"||
        file.mimetype === "application/pdf" ||
        file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || 
        file.mimetype === "application/vnd.openxmlformats-officedocument.presentationml.presentation" ||
        file.mimetype === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        // file.mimetype === "application/*.document"
        
    ){
        cb(null,true);
    }else{
        cb(new Error('Invalid file type. Only docx, pptx, and xlsx files are allowed.'),false);
    }
}

const upload = multer({
    storage,
    limits : {
        fieldSize : 1024 * 1024 * 5
    },
    fileFilter
});

module.exports = upload;
