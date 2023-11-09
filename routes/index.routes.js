const express = require('express');
const Character = require('../models/Character.model');
const Episode = require('../models/Episodes.model')

const router = express.Router();
const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({ extended: true }));


/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index")
});

router.get("/form", (req, res) => {

  const characters = new Promise((resolve, reject) => {
    setTimeout(() => {
      Character.find()
        .then((charactersFound) => {
          resolve(charactersFound)
        })
        .catch(reject)
    }, 1000)
  })

  const episodes = new Promise((resolve, reject) => {
    setTimeout(() => {
      Episode.find()
        .then((episodesFound) => {
          resolve(episodesFound)
        })
        .catch(reject)
    }, 2000)
  });

  Promise.all([characters, episodes]) //// THE METHODS CAN BE THE PARAMETERS OF PROMISE ALL
    .then(([charactersFound, episodesFound]) => {
      res.render("form", { charactersFound, episodesFound })
      //console.log(episodesFound, charactersFound)
    })

    .catch((error) => console.log(error))
})

router.post("/character/add-to-episode", (req, res) => {
  const {characterId, episodeId}  = req.body ///making the body be just characterId and episodeId by destructuring
  console.log(req.body)

  const addCharacters = new Promise ((resolve, reject) => {
    setTimeout(() => { 
      Character.findByIdAndUpdate(characterId, { $push: { episodes: episodeId} })
        .then((charactersAdded) =>{
          resolve(charactersAdded)
        })
        .catch(reject)
    }, 1000)
  })

  const addEpisodes = new Promise ((resolve, reject) => {
    setTimeout(() => { 
      Episode.findByIdAndUpdate(characterId, { $push: { episodes: episodeId} })
        .then((episodesAdded) =>{
          resolve(episodesAdded)
        })
        .catch(reject)
    }, 2000)
  })

  Promise.all([addCharacters, addEpisodes])
    .then(([charactersAdded, episodesAdded]) => {
      res.render("form", { charactersAdded, episodesAdded})

    })

    .catch((error) => console.log(error))

})

module.exports = router;


