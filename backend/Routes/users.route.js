const express = require('express');
const { AddUser, FindAllUsers, FindSingleUser, UpdateUser, DeleteUser, Login, Test, Admin, Resetpassword, Newpassword } = require('../controllers/users.controlers');
const router = express.Router();
const passport=require('passport');
const { ROLES, inRole } = require('../security/Rolemidlleware');

/* Add user */
router.post('/users',
AddUser);

/* Find all users */
router.get('/users', 
FindAllUsers
);

/* Find single user */
router.get('/users/:id', 

FindSingleUser);

/* Update user  */
router.put('/users/:id', 

UpdateUser)

/* Delete user */
router.delete('/users/:id', 

DeleteUser)

/* users Login */
router.post('/login', Login);

router.post('/forgotpassword', Resetpassword);

router.post('/resetpassword', Newpassword)



router.get(
        '/test',
        passport.authenticate('jwt', { session: false }), 
        inRole(ROLES.USER),
         Test
        );

router.get(
        
         '/admin' ,
        Admin);


router.post('/profile' , 
Admin);


module.exports = router;