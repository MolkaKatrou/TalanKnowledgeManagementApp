const express = require('express');
const { AddUser, FindAllUsers, FindSingleUser, UpdateUser, DeleteUser, Login, Test, Admin, Resetpassword, Newpassword } = require('../controllers/users.controlers');
const router = express.Router();
const passport=require('passport');
const { ROLES, inRole } = require('../security/Rolemidlleware');

/* Add user */
router.post('/users',
passport.authenticate('jwt', { session: false }), 
AddUser);

/* Find all users */
router.get('/users', 
passport.authenticate('jwt', { session: false }), 
FindAllUsers
);

/* Find single user */
router.get('/users/:id', 
passport.authenticate('jwt', { session: false }), 
FindSingleUser);

/* Update user  */
router.put('/users/:id', 
passport.authenticate('jwt', { session: false }), 
UpdateUser)

/* Delete user */
router.delete('/users/:id', 
passport.authenticate('jwt', { session: false }), 
DeleteUser)

/* users Login */
router.post('/login', Login);

router.post('/forgotpassword',Resetpassword);

router.post('/resetpassword', Newpassword)


//Testing

router.get(
        '/test',
        passport.authenticate('jwt', { session: false }), 
        inRole(ROLES.USER),
         Test
        );

router.get(    
         '/admin' ,
        Admin);




module.exports = router;