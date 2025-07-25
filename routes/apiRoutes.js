const router = require("express").Router();
const controllers = require("../controllers");
const checkAuth = require("../middleware/auth");

// admin login/logout
//When user submits login, the login function in controllers.auth is called
router.post("/login", controllers.auth.login);

//When user clicks logout, logout function in controllers.auth is called
router.get("/logout", controllers.auth.logout);

//When user clicks sign up, create function in controlers.create is called
router.post("/signup", controllers.user.create);

module.exports = router;
