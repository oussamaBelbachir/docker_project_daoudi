const Article = require("../models/articleModel");
const catchAsync = require("../utils/catchAsync");
const APIFeatures = require("../utils/APIFeatures");
const AppError = require("../utils/AppError");
const fs = require('fs');

exports.getAllArticles = catchAsync(async (req,res,next) => {

    const {direction,department} = req.params;

    let query = Article.find();
    if(direction) query = query.find({direction});
    if(department) query = query.find({department});

    const {search} = req.query;
    if(search) query = query.find({ description: {$regex : `${search}`} });

    // .aggregate([{$sort: {created:-1}}], {allowDiskUse: true})



    // =====================================================================
    const filters = [];
    const {direction_departments} = req.user;

    Object.keys(direction_departments).forEach(dir => 
        direction_departments[dir].forEach(dep => 
            filters.push({"direction" : dir,"department" : dep})
        )
    )
    query = query.find({$or : filters});

    // =====================================================================


    const totalCount = await Article.countDocuments(query);
    const limit = req.query.limit || 10;
    const nbrOfPages = Math.ceil(totalCount/limit);
    
    const features = new APIFeatures(query,req.query)
                                                        .filter()
                                                        .sort()
                                                        .fields()
                                                        .paginate();
    
    const articles = await features.query;


    return res.status(200).json({
        status : "success",
        results : articles.length,
        nbrOfPages,
        data : {
            articles,
        },
    });

});

exports.getArticleBySlug = catchAsync(async (req,res,next) => {
        const {slug} = req.params;
        const article = await Article.findOne({slug}).populate("author","first_name last_name");

    return res.status(200).json({
        status : "success",
        data : {
            article
        }
    });
});


exports.createArticle = catchAsync(async (req,res,next) => {

    let image = null;
    let files = null;
    if("image" in req.files) image = req.files.image[0].path;
    if("files" in req.files){
        files = [];
        req.files.files.forEach(file => {
            files.push({
                name : file.originalname,
                path : file.path
            });
        })
    }

    const article = await Article.create({
        ...req.body,
        image,
        files
    });

    return res.status(200).json({
        status : "success",
        message : "Article ajouté avec succès",
        data : {
            article
        }
    });
});

exports.getArticleById = catchAsync(async (req,res,next) => {

    if(!Article.checkId(req.params.id)){
        return next(new AppError("Id non valid !"));
    }


    const article = await Article.findById(req.params.id).populate("author","first_name last_name");;
    const artile_direction = article.direction;
    const artile_department = article.department;
    
    const user_direction_departments = req.user.direction_departments;
    const user_directions = Object.keys(user_direction_departments);
    
    if(user_directions.includes(artile_direction) && user_direction_departments[artile_direction].includes(artile_department)){
        return res.status(200).json({
            status : "success",
            data : {
                article
            }
        });
    }

    return res.status(200).json({
        status : "success",
        data : {
            article : null
        }
    });
});



const { faker } = require('@faker-js/faker');

exports.fakeData = catchAsync(async (req,res,next) => {
    const randomName = faker.person.fullName(); // Rowan Nikolaus
    const randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz
    // creates a date soon after 2023-01-01
    const randomDate = faker.date.soon({ refDate: '2023' });
   
    const dir_deps = {"tmpa" : ["marketing","it","finance","production"],"cires" : ["marketing","it","finance","production","logistique"],"tme" : ["marketing","it","finance","production"],"tmu" : ["marketing","it","finance","production"]}
 
      const generateArticle = () => {
        const direction = faker.helpers.arrayElement(['tmpa', 'cires', 'tme','tmu']);
        const randomInteger = Math.floor(Math.random() * dir_deps[direction].length); // Generates a random integer between 0 and 5
        const imgs = [
            "uploads/de825e17432880d61694db016b62b1fc",
            "uploads/525b4b87e1f80872ab725ff5407fce59",
            "uploads/88a208e5757a75c98ffde6eac795ce57",
            "uploads/2023-08-07T10:28:52.579Zimg.png",
            "uploads/2023-08-07T10:33:54.013ZTC1.png",
            "uploads/2023-08-07T10:38:21.613ZouYxomepXFo-HD.jpg",
            "uploads/2023-08-07T10:43:06.206Zdeficit-commercial.jpg"
        ]
        const imgIdx = Math.floor(Math.random() * imgs.length); 
        
        return {
            active : faker.datatype.boolean(),
            image : imgs[imgIdx],
            author: "64c0213af1851c841a303b35",
            // createdAt : faker.date.anytime(),
            createdAt :faker.date.between({ from: '2024-01-01T00:00:00.000Z', to: '2030-01-01T00:00:00.000Z' }),
            title : faker.lorem.words(10),
            description : faker.lorem.words(255),
            direction,
            department : dir_deps[direction][randomInteger],
            files: [
                {
                name: "le manager de communication.pptx",
                path: "uploads/2023-08-07T10:43:06.214Zle manager de communication.pptx"
                },
                {
                name: "forme de la communication externe.pptx",
                path: "uploads/2023-08-07T10:43:06.229Zforme de la communication externe.pptx"
                },
                {
                name: "Affiche-SAS-Export-WEB.pdf",
                path: "uploads/2023-08-07T10:43:06.239ZAffiche-SAS-Export-WEB.pdf"
                },
                {
                name: "Classeur1.xlsx",
                path: "uploads/2023-08-07T10:43:06.244ZClasseur1.xlsx"
                },
                {
                  name: "Avis-de-convocation-AG-Obligataires-2.pdf",
                  path: "uploads/2023-08-07T13:49:15.678ZAvis-de-convocation-AG-Obligataires-2.pdf"
                },
                {
                  name: "CF-S1-2022-vOT.pdf",
                  path: "uploads/2023-08-07T13:49:15.679ZCF-S1-2022-vOT.pdf"
                },
                {
                  name: "CF-Trimestrielle-4T-20201 (1).pdf",
                  path: "uploads/2023-08-07T13:49:15.702ZCF-Trimestrielle-4T-20201 (1).pdf"
                },
                {
                  name: "COMMUNICATION-FINANCIERE-2T-2021.pdf",
                  path: "uploads/2023-08-07T13:49:15.705ZCOMMUNICATION-FINANCIERE-2T-2021.pdf"
                },
                {
                  name: "Communication-Financiere-3T-2019.pdf",
                  path: "uploads/2023-08-07T13:49:15.707ZCommunication-Financiere-3T-2019.pdf"
                },
                {
                  name: "Communication-financiere-2022.pdf",
                  path: "uploads/2023-08-07T13:49:15.708ZCommunication-financiere-2022.pdf"
                },
                {
                  name: "Communication-Financiere-Marsa-Maroc-Tanger-Med-1.pdf",
                  path: "uploads/2023-08-07T13:49:15.710ZCommunication-Financiere-Marsa-Maroc-Tanger-Med-1.pdf"
                },
                {
                  name: "Communication-Financiere-T1-2020.pdf",
                  path: "uploads/2023-08-07T13:49:15.715ZCommunication-Financiere-T1-2020.pdf"
                },
                {
                  name: "Finance-Com-T4-2022.pdf",
                  path: "uploads/2023-08-07T13:49:15.715ZFinance-Com-T4-2022.pdf"
                }
              ],
          }
      }
      

      const articles_data = faker.helpers.multiple(generateArticle,{
        count : 40000
      });

      const jsonData = JSON.stringify(articles_data); // The second argument is for formatting (2 spaces for indentation)
    //   const normal = JSON.parse(jsonData);
    //   const da = await Article.insertMany(articles_data);


    // const last_articles = await Article.find().sort({ _id: -1 }).limit(3000);
    // await Article.deleteMany({ _id: { $in: last_articles.map(item => item._id) } });


    // await Article.deleteMany();


                // Specify the file path
            const filePath = 'data.json';

            // Write the JSON data to the file
            fs.writeFile(filePath, jsonData, 'utf8', (err) => {
            if (err) {
                console.error('Error writing to JSON file:', err);
            } else {
                console.log('Data has been written to JSON file successfully.');
            }
            });

    return res.status(200).json({
        status : "success",
        message : "Data ajouté avec succès",
        // articles_data,
        // jsonData,
        // da
        // last_articles
    });
});

/*







 const d = {
        avatar: faker.image.avatar(),
        birthday: faker.date.birthdate(),
        email: faker.internet.email(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        sex: faker.person.sexType(),
        subscriptionTier: faker.helpers.arrayElement(['free', 'basic', 'business']),
      };




active: true
author: "64c0213af1851c841a303b35"
createdAt: "2023-08-07T15:19:56.428Z"
department: "finance"
direction: "tmpa"
description: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
files: (10) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
image: "uploads/2023-08-07T15:19:56.349Z800px-MySQL.svg.png"
slug: "finance-finance-finance-finance-finance"
title: "finance finance finance finance finance"
_id: "64d10b9c2a14a99e95b535e0"
*/