const express = require('express');
const {Getcategories, Addcategory, Updatecategory, Deletecategory} = require('../controllers/categories.controllers');

const router = express.Router();
const multer = require("multer");
const shortid= require("shortid");
const path = require("path");



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname), "uploads"));
    },
    filename: function (req, file, cb) {
      cb(null, shortid.generate() + "-" + file.originalname);
    },
  });

const upload = multer({ storage });

router.get('/categories', Getcategories)
router.post('/categories', Addcategory)
router.post('/categories/delete', Deletecategory)
router.post('/categories/update',upload.array('categoryImage'), Updatecategory)



module.exports = router;