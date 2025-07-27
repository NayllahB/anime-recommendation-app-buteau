const { Schema, model, SchemaTypes } = require("mongoose");

const watchlistSchema = new Schema(
    {
        mal_id: {
            type: Number,
            unique: true,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        userId: {
            type: SchemaTypes.ObjectId,
            ref: "User",
            required: true
        }
    } 
)

module.exports = model("watchlist", watchlistSchema);