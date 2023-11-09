const mongoose = require('mongoose')
const Schema = mongoose.Schema

const episodeSchema = new Schema ({
    title: {
        type: String,
        required: true
    },
    characters: [{type: mongoose.Schema.Types.ObjectId, ref: "Characters"}]
})

const Episode = mongoose.model('Episode', episodeSchema)
module.exports = Episode