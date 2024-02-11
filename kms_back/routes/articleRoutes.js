const router = require("express").Router();
const articleController = require("../controllers/articleController");
const authController = require("../controllers/authController");
const upload = require("../middlewares/upload");
const {validateArticleData} = require("../middlewares/validation");


router
    .route("/slug/:slug")
    .get( articleController.getArticleBySlug);

router.route("/fake").post(articleController.fakeData);
router.route("/:id").get(authController.protect,articleController.getArticleById);

router
    .route("/:direction?/:department?")
    .get(authController.protect, articleController.getAllArticles)
    .post(authController.protect,authController.restrictTo("admin","editor"), upload.fields([{name:'image',maxCount:1},{name: 'files', maxCount:10} ]),validateArticleData,articleController.createArticle);
    

module.exports = router;