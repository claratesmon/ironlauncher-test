const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const characterSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    episodes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Episodes'}]
})

const Character = mongoose.model('Character', characterSchema);

module.exports = Character;