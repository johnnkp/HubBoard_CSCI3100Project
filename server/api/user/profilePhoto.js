const router = require('express').Router();
const multer = require('multer');
const {memoryStorage} = require("multer");
const fs = require('fs');
const path = require('path');
const User = require('../../database/model/User');

const upload = multer({
    storage: memoryStorage(),
    fileFilter(req, file, cb) {
        // Check file type
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an image with a file extension of .jpg, .jpeg, or .png'));
        }
        cb(undefined, true);
    },
    limits: {
        fileSize: 1000000 // 1 MB
    }
});

/**
 * @api {put} /api/user/profilePhoto Upload profile photo
 * @apiName UploadProfilePhoto
 * @apiGroup User
 *
 * @apiBody {File} profilePhoto Profile photo.
 * A file with a file extension of .jpg, .jpeg, or .png and a size of less than 1 MB.
 *
 *
 * @apiSuccess {Boolean} success True
 * @apiSuccess {String} message Success message
 *
 * @apiError {Boolean} success False
 * @apiError {String} message Error message
 */
router.put('/',(req, res) => {
    upload.single('profilePhoto')(req, res, (err) => {
        // Check for errors
        if (err) {
            res.status(400).json({
                success: false,
                message: err.message
            });
        }
        // req.file will be the uploaded file
        // save the file to the database
        else {
            req.user.profilePhoto.buffer = req.file.buffer;
            req.user.profilePhoto.contentType = req.file.mimetype;
            req.user.save()
                .then(() => {
                    res.status(200).json({
                        success: true,
                        message: 'Profile photo updated successfully'
                    });
                })
                .catch(err => {
                    console.error(err);
                    res.status(500).json({
                        success: false,
                        message: 'Error updating profile photo'
                    });
                });
        }
    });
});


/**
 * @api {get} /api/user/profilePhoto/:username Get profile photo
 * @apiName GetProfilePhoto
 * @apiGroup User
 *
 * @apiParam {String} [username] Username of user that you want to get profile photo.
 * If not provided, will return profile photo of current user.
 *
 * @apiSuccess {File} file Profile photo.
 * If no profile photo exists, will return a default profile photo.
 *
 * @apiError {Boolean} success False
 * @apiError {String} message Error message
 */
router.get('/(:username)?', (req, res) => {
    const userHandler = () => new Promise((resolve, reject) => {
        // If username is provided, find user by username
        if (req.params.username) {
            User.findOne({username: req.params.username})
                .then(user => {
                    if (!user) {
                        reject(new Error('User not found'));
                    }
                    resolve(user);
                })
                .catch(err => {
                    console.error(err);
                    reject(new Error('Internal server error'));
                });
        }
        // If username is not provided, return current user
        else {
            resolve(req.user);
        }
    });

    userHandler()
        .then(user =>{
            // If user has a profile photo, send it
            if (user.profilePhoto.buffer){
                res.set('Content-Type', user.profilePhoto.contentType);
                res.send(user.profilePhoto.buffer);
            }
            // If user does not have a profile photo, send default
            else {
                const filepath = path.join(__dirname, '../../static/image/defaultProfilePhoto.jpg');
                res.set('Content-Type', "image/jpeg");
                res.send(fs.readFileSync(filepath));
            }
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                message: err.message
            });
        });
});

module.exports = router;