import { Router } from 'express';
const router = Router();

import {
    renderSignUpForm,
    signUp,
    renderSignInForm,
    signIn,
    logout
} from '../controllers/users.controller';

router.get('/users/signUp', renderSignUpForm);

router.post('/users/signUp', signUp);

router.get('/users/signIn', renderSignInForm);

router.post('/users/signIn', signIn);

router.get('/users/logout', logout);

module.exports = router;