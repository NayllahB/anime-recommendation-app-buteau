const router = require("express").Router();
const controllers = require("../controllers");
const checkAuth = require("../middleware/auth");
const {topFiveAnime} = require("../controllers/anime");

//GET homepage
// Shows home page (content depend on if user is logged in)
router.get("/", async ( req, res) => {
  try {
    const topFiveData = await topFiveAnime();
    const isLoggedIn = req.session.isLoggedIn;
    res.render("index", { topFiveData, isLoggedIn });
  } catch(err){
    res.status(502).send('API Not Available')
    console.log(err)
  }
});


//GET Login page
router.get("/login", async (req, res) => {
  //If user is logged in, redirect to homepage
  if (req.session.isLoggedIn) return res.redirect("/");

  //Show login page (user not logged in)
  res.render("login", { error: req.query.error });
});

//GET Sign up page
router.get("/signup", async (req, res) => {
  //If user is logged in, redirect to hompage
  if (req.session.isLoggedIn) return res.redirect("/");

  //Show sign up page (user not logged in)
  res.render("signup", { error: req.query.error });
});

//GET protected page
//Only renders protected page if user is logged in
router.get("/private", checkAuth, ({ session: { isLoggedIn } }, res) => {
  res.render("protected", { isLoggedIn });
});


module.exports = router;
