const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const User = require("../models/userModel");
const APIFeatures = require("../utils/APIFeatures");


exports.getAllUsers = catchAsync(async (req,res,next) => {

    const features = new APIFeatures(User.find(),req.query)
                                                .filter()
                                                .sort()
                                                .fields()
                                                .paginate();

    const users = await features.query;
    return res.status(200).json({
        status : "success",
        results : users.length,
        data : {
            users,
        },
    });
});

exports.getUserById = catchAsync(async (req,res,next) => {

    const {id} = req.params;
    const user = await User.findById(id);

    return res.status(200).json({
        message : "success",
        data : {
            user
        }
    })
});

exports.createUser = catchAsync(async (req,res,next) => {
// console.log(req.body);
    // return res.status(200).json({
    //     status : "success",
    //     message : "Utilisateur ajouté avec succès",
    //     data : {
    //         // user
    //     }
    // });

    const {first_name, last_name, email, role, direction_departments} = req.body;


    const user = await User.create({
        first_name, 
        last_name, 
        email, 
        role, 
        direction_departments,
        password : "pass1234",
        passwordConfirm : "pass1234"
    });

    return res.status(200).json({
        status : "success",
        message : "Utilisateur ajouté avec succès",
        data : {
            user
        }
    });
})


exports.updateUser = catchAsync(async (req,res,next) => {

    const {id} = req.params;

    console.log("⌛️ ⌛️ ⌛️ ⌛️ ⌛️ ⌛️ ⌛️ ⌛️ ⌛️ ⌛️ ⌛️ ⌛️ " ,req.body);
    const user = await User.findByIdAndUpdate(id,req.body , {
        new : true
    });

    return res.status(200).json({
        status : "success",
        message : "Utilisateur modifié avec succès",
        data : {
            user
        }
    })
});