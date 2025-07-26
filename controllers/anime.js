const axios = require('axios')

const genreNameList = {
        1: "Action",
        2: "Adventure",
        46: "Award Winning",
        4: "Comedy",
        8: "Drama",
        10: "Fantasy",
        47: "Gourmet",
        14: "Horror",
        7: "Myster",
        22: "Romance",
        25: "Shoujo",
        27: "Shounen",
        36: "Slice of Life",
        30: "Sports" 
    }

//pulls data for 10 popular animes
async function getPopularAnime() {
    try{
        const topResponse = await axios.get('https://api.jikan.moe/v4/anime?order_by=popularity&sfw=true&limit=20');
        const popularData = topResponse.data.data;
        popularData.forEach(anime => {
            anime.animeTitle = anime.title_english || anime.title
        });
        return popularData;
    }catch(err){
        console.error(`Failed to fetch popular anime: ${err.message}`)
        throw err;
    }
}

//pulls show details for specific anime
async function getAnimeDetails(animeId) {
    try{
        const detailsResponse = await axios.get(`https://api.jikan.moe/v4/anime/${animeId}/full`);
        const animeDetailsData = detailsResponse.data.data;
        animeDetailsData.animeTitle = animeDetailsData.title_english || animeDetailsData.title;
        return animeDetailsData;

    } catch(err){
        console.error(`Failed to fetch anime details: ${err.message}`)
        throw err;
    }
    
}

//pulls data for animes under a certain genre
async function getGenres(genreId) {
    try{
        const genreResponse = await axios.get(`https://api.jikan.moe/v4/anime?genres=${genreId}&sfw=true&limit=20&order_by=popularity`);
        const genreData = genreResponse.data.data;
        genreData.forEach(anime => {
            anime.animeTitle = anime.title_english || anime.title
        });
        return genreData;
    }catch(err){
        console.error(`Failed to fetch genres: ${err.message}`)
        throw err;
    }
    
}

//pulls specific genre name from name list that matches the Id given
async function getGenreName(genreId) {
    return genreNameList[genreId]
}

//pulls search results based on user query
async function getSearchData(searchQuery) {
    try{
        const searchResponse = await axios.get(`https://api.jikan.moe/v4/anime?q=${searchQuery}&sfw=true&limit=25&order_by=popularity`);
        const searchData = searchResponse.data.data;
        searchData.forEach(anime => {
            anime.animeTitle = anime.title_english || anime.title
        });
        return searchData;
    }catch(err){
        console.error(`Failed to fetch search results: ${err.message}`)
        throw err;
    }
    
}

module.exports = {
    getPopularAnime,
    getAnimeDetails,
    getGenres,
    getGenreName,
    getSearchData
}