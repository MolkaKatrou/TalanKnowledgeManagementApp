const express = require('express');
const { AddUser, FindAllUsers, FindSingleUser, UpdateUser, DeleteUser, Login, Test, Admin } = require('../controllers/users.controlers');
const router = express.Router();
const passport=require('passport');
const { ROLES, inRole } = require('../security/Rolemidlleware');

/* Add user */
router.post('/users',
passport.authenticate('jwt', { session: false }), 
inRole(ROLES.ADMIN), 
AddUser);

/* Find all users */
router.get('/users', 
passport.authenticate('jwt', { session: false }), 
inRole(ROLES.ADMIN), 
FindAllUsers
);

/* Find single user */
router.get('/users/:id', 
passport.authenticate('jwt', { session: false }), 
inRole(ROLES.ADMIN), 
FindSingleUser);

/* Update user  */
router.put('/users/:id', 
passport.authenticate('jwt', { session: false }), 
inRole(ROLES.ADMIN), 
UpdateUser)

/* Delete user */
router.delete('/users/:id', 
passport.authenticate('jwt', { session: false }), 
inRole(ROLES.ADMIN), 
DeleteUser)

/* users Login */
router.post('/login', Login);



router.get(
        '/test',
        passport.authenticate('jwt', { session: false }), 
        inRole(ROLES.USER),
         Test
        );

router.get(
         '/admin' ,
        passport.authenticate('jwt', { session: false }), 
        inRole(ROLES.ADMIN),   
        Admin);


router.post('/profile' , 
Admin);


module.exports = router;