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

//pulls data for top rated animes
async function topFiveAnime() {
    const topResponse = await axios.get('https://api.jikan.moe/v4/anime?order_by=popularity&sfw=true&limit=10')
    return topResponse.data.data
}

//pulls data for animes under a certain genre
async function getGenres(genreId) {
    const genreResponse = await axios.get(`https://api.jikan.moe/v4/anime?genres=${genreId}&sfw=true&limit=20&order_by=popularity`)
    return genreResponse.data.data
}

//pulls specific genre name from name list that matches the Id
async function getGenreName(genreId) {
    return genreNameList[genreId]
}

module.exports = {
    topFiveAnime,
    getGenres,
    getGenreName
}