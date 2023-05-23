const express = require("express");
const userController = require("../controller/userController");

const router = express.Router();
const uploadPhoto = require("../middleware/uploadPhoto");

// const avatarStorage = multer.diskStorage({
//     destination:function(req,file,cb){
//         cb(null, path.resolve(__dirname, '../../public/uploads/profiles'))
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//         cb(null, file.fieldname + '_' + uniqueSuffix + path.extname(file.originalname))
//     }
// })
// const avatarUpload = multer({
//     storage: avatarStorage,
//     limit: { fileSize: 1000000 * 2 }
// });

router.route("/signup").post(uploadPhoto, userController.signupUser);
router.route('/login').post(userController.loginUser)
router.route('/logout').get(userController.logoutUser)

module.exports = router;
