const Joi = require("joi");
// const upload = require("../middlewares/upload");
const User = require("../models/userModel");

const customMessages = {
    'string.base': 'Le champ {#label} doit être de type texte',
    'string.empty': 'Le champ {#label} ne peut pas être vide',
    'string.email': 'Le format de {#label} est invalide',
    'string.min': 'Le champ {#label} doit contenir au moins {#limit} caractères',
    'string.max': 'Le champ {#label} doit contenir au maximum {#limit} caractères',
    'string.length': 'Le champ {#label} doit contenir exactement {#limit} caractères',
    'string.alphanum': 'Le champ {#label} doit contenir uniquement des caractères alphanumériques',
    'string.pattern.base': 'Le champ {#label} ne correspond pas au modèle attendu',
    'number.base': 'Le champ {#label} doit être de type numérique',
    'number.integer': 'Le champ {#label} doit être un nombre entier',
    'number.min': 'Le champ {#label} doit être supérieur ou égal à {#limit}',
    'number.max': 'Le champ {#label} doit être inférieur ou égal à {#limit}',
    'date.base': 'Le champ {#label} doit être de type date',
    'date.format': 'Le format de {#label} est invalide',
    'boolean.base': 'Le champ {#label} doit être de type booléen',
    'array.base': 'Le champ {#label} doit être de type tableau',
    'array.min': 'Le champ {#label} doit contenir au moins {#limit} éléments',
    'array.max': 'Le champ {#label} doit contenir au maximum {#limit} éléments',
    'object.base': 'Le champ {#label} doit être de type objet',
    'object.unknown': 'Le champ {#label} contient des clés non autorisées',
  };

exports.validateArticleData = (req, res, next) => {
 
    // console.log("££££££££££££££££££££££££££££££££££££££££££££");
    // console.log("req.body ",req.body);
    // const {content} = req.body;
    // console.log("content ",content);
    // console.log("££££££££££££££££££££££££££££££££££££££££££££");

  const schema = Joi.object({
    author : Joi.required(),
    direction: Joi.string().required().messages(customMessages),
    department: Joi.string().required().messages(customMessages),
    title: Joi.string().trim().min(10).required().messages(customMessages),
    description: Joi.string().trim().min(15).required().messages(customMessages),
    content: Joi.string().optional().messages(customMessages),
  });

  const { error } = schema.validate(req.body, { abortEarly: false });

  const data_errors = {};
  if (error) {
    error.details.map((err) => {
      data_errors[err.context.label] = err.message.replace(/["']/g, "");
    
    });

    // return res.status(400).json({ errors: errorDetails });

    return res.status(400).json({
        status : "error",
        message : "Données invalides",
        // errors: errorDetails,
        errors:data_errors
    });
  }


    next();
  };


exports.validateUserData = async (req,res,next) => {

  const check = !!(await User.findOne({email : req.body.email}));
  console.log(check);

  const schema = Joi.object({
    first_name : Joi.string().min(3).trim().required().messages(customMessages),
    last_name: Joi.string().min(3).trim().required().messages(customMessages),
    email: Joi.string().email().required().messages(customMessages),
    role: Joi.string().valid("admin","editor","reader").required().messages(customMessages),
    direction_departments: Joi.object().required().messages(customMessages),
  });

  const { error } = schema.validate(req.body, { abortEarly: false });

  const data_errors = {};
  
  if (error || check) {

    if(error){
      error.details.forEach((err) => {
        data_errors[err.context.label] = err.message.replace(/["']/g, "");
      });
    }

    console.log(data_errors);
    if(check && !("email" in data_errors)){
      data_errors["email"] = "Cette adresse email est déjà utilisée"
    }

    return res.status(400).json({
        status : "error",
        message : "Données invalides",
        // errors: errorDetails,
        errors:data_errors
    });
  }


  next();
}


 