const {watchlist} = require("../models");

//Adds (create) anime to watchlist
 async function addAnimeWatchlist (req, res){
    try{
        const {mal_id, title, image} = req.body;
        const userId = req.session.userId;
        
        //check if anime exists
        const animeExists =  await watchlist.findOne({mal_id, userId});
        if (animeExists) return res.redirect("/private?added=true");
        
        // create new watchlist item
        await watchlist.create({mal_id, title, image, userId});

        return res.redirect("/private?added=true");

    }catch(err){
        res.status(500).send(`Unable to add anime: ${err.message}`);
    }
}

//Deletes anime from watchlist
async function deleteAnime (req,res) {
    try{
        const animeId = req.params.id;
        const userId = req.session.userId;

        //delete watchlist item
        await watchlist.deleteOne({_id: animeId, userId});
        res.redirect("/private?deleted=true");
    }catch(err){
        res.status(500).send(`Unable to delete anime: ${err.message}`);
    }

}

module.exports = {addAnimeWatchlist, deleteAnime}