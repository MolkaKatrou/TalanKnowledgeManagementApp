const express = require('express');
const {Getnotes, Addnote, getPostsBySearch, likePost, BookmarkPost, Updatenote, Deletenote, Uploadfiles, Commentnote, GetSinglenote }= require('../controllers/notes.controllers');
const { auth } = require('../security/auth');
const router = express.Router();


router.get('/notes',auth, Getnotes)
router.get('/notes/:id',auth, GetSinglenote)
router.get('/search',auth, getPostsBySearch)
router.post('/notes',auth, Addnote)
router.post('/notes/uploadfiles',auth, Uploadfiles)
router.delete('/notes/:id',auth, Deletenote)
router.put('/notes/:id',auth, Updatenote)
router.post('/notes/:id/comment',auth, Commentnote) 
router.patch('/notes/:id/like', auth, likePost);
router.patch('/notes/:id/bookmark', auth, BookmarkPost);
router.patch('/notes/:id', Updatenote);




module.exports = router;