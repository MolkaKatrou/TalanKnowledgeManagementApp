const express = require('express');
const {Getnotes, Addnote, Updatenote, Deletenote, Uploadfiles }= require('../controllers/notes.controllers');

const router = express.Router();


router.get('/notes', Getnotes)
router.post('/notes', Addnote)
router.post('/notes/uploadfiles', Uploadfiles)
router.delete('/notes/:id', Deletenote)
router.put('/notes/:id', Updatenote)


module.exports = router;