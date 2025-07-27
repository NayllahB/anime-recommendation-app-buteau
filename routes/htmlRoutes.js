const router = require("express").Router();
const controllers = require("../controllers");
const checkAuth = require("../middleware/auth");
const { watchlist } = require("../models");
const {
  getPopularAnime,
  getAnimeDetails, 
  getGenreName, 
  getGenres,
  getSearchData
} = require("../controllers/anime");

//GET homepage
// Shows home page (content depend on if user is logged in)
router.get("/", async (req, res) => {
  try {
    const popularAnime = await getPopularAnime();
    const isLoggedIn = req.session.isLoggedIn;
    res.render("index", { popularAnime, isLoggedIn });
  } catch(err){
    res.status(404).send(err.message)
  }
});

//renders anime details page
router.get("/details", async (req, res) => {
  try{
    const animeId = req.query.animeId;
    const animeDetails = await getAnimeDetails(animeId);
    const isLoggedIn = req.session.isLoggedIn;
    res.render("details" , {animeDetails, isLoggedIn});
  }catch(err){
    res.status(404).send(err.message);
  }
})

// renders list of shows by genre
router.get("/genres", async (req, res)=>{
  try{
    const genreId = req.query.genre;
    const genreName = await getGenreName(genreId);
    const genreAnimeList = await getGenres(genreId);
    const isLoggedIn = req.session.isLoggedIn;
    res.render("genres", {genreName, genreAnimeList,isLoggedIn});
  }catch(err){
    res.status(404).send(err.message);
  }
});

//renders query search results
router.get("/search-results", async (req, res) =>{
  try{
    const searchQuery = req.query.q;
    const searchResults = await getSearchData(searchQuery);
    const isLoggedIn = req.session.isLoggedIn;
    res.render("searchResults", {searchResults, isLoggedIn});
  }catch(err){
    res.status(404).send(err.message);
  }
})

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
router.get("/private", checkAuth, async (req, res) => {
  try {
    const userId = req.session.userId;

    if (!userId) {
      return res.redirect("/login");
    }
    const watchlistData = await watchlist.find({ userId }).lean();

    res.render("protected", {
      isLoggedIn: req.session.isLoggedIn,
      watchlistData
    });
  } catch (err) {
    res.status(500).send("Error loading watchlist");
  }
});



module.exports = router;
