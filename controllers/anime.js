const axios = require('axios')


async function topFiveAnime() {
    const response = await axios.get('https://api.jikan.moe/v4/top/anime?sfw=true&limit=5')
    return response.data.data
}

module.exports = {topFiveAnime}