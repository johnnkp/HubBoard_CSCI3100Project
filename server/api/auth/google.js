const router = require("express").Router();
const passport = require("passport");
require("dotenv").config();

const CLIENT_ADDRESS = process.env.SERVER_HOST + ":" + process.env.CLIENT_PORT;
/**
 * @api {post} /api/auth/google Google Authentication
 * @apiDescription redirects to google authentication page
 * @apiName GoogleAuth
 * @apiGroup Auth
 */
router.get("/", (req, res) => {
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })(req, res);
});

/**
 * @api {post} /api/auth/google/callback Google Authentication Callback
 * @apiDescription Handle callback from Google authentication
 * @apiName GoogleAuthCallback
 * @apiGroup Auth
 *
 * @apiQuery {String} code
 * @apiQuery {String} scope
 * @apiQuery {String} authuser
 * @apiQuery {String} promote
 *
 * @apiSuccess {Boolean} success True
 * @apiSuccess {String} redirectPage Page to redirect
 * @apiSuccess {String} message Success message
 * @apiSuccess {String} email User email from Google profile for registration, undefined if login successful.
 *
 * @apiError {Boolean} success False
 * @apiError {String} message Error message
 */
router.post("/callback", (req, res) => {
  passport.authenticate(
    "google",
    {
      failureRedirect: CLIENT_ADDRESS + "/login",
    },
    (err, user, info) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: err.message,
        });
      }
      // if user with Google id not exist
      if (!user) {
        return res.status(200).json({
          success: true,
          redirectPage: "signup",
          message: "New user using google to login",
          email: info.email,
        });
      }
      // Login with Google id
      req.login(user, (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({
            success: false,
            message: "Internal Server Error",
          });
        }
        return res.status(200).json({
          success: true,
          redirectPage: "hubboard",
          message: "User login using google",
        });
      });
    }
  )(req, res);
});

module.exports = router;
