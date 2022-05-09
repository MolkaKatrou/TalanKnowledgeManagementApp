const express = require('express');
const {Getcategories, Addcategory, FollowCategory, Delete, Update, Updatecategory, Deletecategory} = require('../controllers/categories.controllers');
const router = express.Router();
const multer = require("multer");
const shortid= require("shortid");
const path = require("path");
const { auth } = require('../security/auth');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname), "uploads"));
    },
    filename: function (req, file, cb) {
      cb(null, shortid.generate() + "-" + file.originalname);
    },
  });

const upload = multer({ storage });

router.get('/categories',auth, Getcategories)
router.post('/categories',auth, Addcategory)
router.post('/categories/delete',auth, Deletecategory)
router.delete('/categories/:id',auth, Delete)
router.put('/categories/:id',auth, Update)
router.post('/categories/update',auth,upload.array('categoryImage'), Updatecategory)
router.patch('/categories/:id/follow', auth, FollowCategory);



module.exports = router;