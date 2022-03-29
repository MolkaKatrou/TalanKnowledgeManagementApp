const express = require('express');
const { AddUser, FindAllUsers, FindSingleUser, UpdateUser, DeleteUser, Login } = require('../controllers/users.controlers');
const router = express.Router();

/* Add user */
router.post('/users', AddUser)

/* Find all users */
router.get('/users', FindAllUsers)

/* Find single user */
router.get('/users/:id', FindSingleUser)

/* Update user  */
router.put('/users/:id', UpdateUser)

/* Delete user */
router.delete('/users/:id', DeleteUser)

/* users Login */
router.post('/login', Login);


module.exports = router;