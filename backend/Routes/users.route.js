const express = require('express');
const { AddUser, FindAllUsers, FindSingleUser, UpdateUser, DeleteUser,updateProfilePicture, Login, Test, Admin, Resetpassword, Newpassword, SearchUsers, Changepassword } = require('../controllers/users.controlers');
const router = express.Router();
const passport=require('passport');
const { ROLES, inRole } = require('../security/Rolemidlleware');
const { auth } = require('../security/auth');


router.post('/users', AddUser);
router.get('/users', auth, FindAllUsers);
router.get('/users/:id', auth, FindSingleUser);
router.put('/users/:id', auth, UpdateUser)
router.put('/users/update/updatePicture', auth, updateProfilePicture)
router.delete('/users/:id', auth,  DeleteUser)

/* users Login */
router.post('/login', Login);
router.post('/forgotpassword', Resetpassword);
router.post('/resetpassword', Newpassword)
router.get('/searchUsers',auth, SearchUsers)
router.post('/changepassword',auth, Changepassword)




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