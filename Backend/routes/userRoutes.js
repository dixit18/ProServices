const express = require("express");
const userController = require("../controller/userController");
const isAuthenticated  = require("../middleware/validate")

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
router.route("/me")
    .get(isAuthenticated, userController.getAccountDetails)
    .delete(isAuthenticated, userController.deleteProfile);

router.route('/forgotpassword').get(userController.forgotPassword)
router.route('/resetpassword/:token').patch(userController.resetPassword)


// router.delete("/:id", verifyToken, deleteUser);
// router.get("/:id", getUser);


module.exports = router;
