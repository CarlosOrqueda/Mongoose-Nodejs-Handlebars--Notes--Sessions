import User from '../models/User';
import passport from 'passport';

const userController = {};

userController.renderSignUpForm = (req, res) => {
    res.render('users/signUp');
};

userController.signUp = async (req, res) => {
    const errors = [];
    const { name, email, password, confirmPassword } = req.body;
    if (name == '' && email == '' && password == '' && confirmPassword == '') {
        errors.push({ text: 'Empty fields' });
        res.render('users/signUp', { errors });
    } else {

        if (password != confirmPassword)
            errors.push({ text: 'Passwords do not match' });
        if (password.length < 4)
            errors.push({ text: 'Passwords must be at least 4 characters' });
        if (errors.length > 0)
            res.render('users/signUp', { errors, name, email });
        else {
            const emailUser = await User.findOne({ email }).lean();
            if (emailUser) {
                req.flash('errorMessage', 'The email is already in use');
                res.render('users/signUp', {name});
            } else {
                const newUser = new User({ name, email, password });
                newUser.password = await newUser.encrypPassword(password);
                await newUser.save();
                req.flash('successMessage', 'You are registered');
                res.redirect('/users/signIn');
            }
        }
    }
};

userController.renderSignInForm = (req, res) => {
    res.render('users/signIn');
};

userController.signIn = passport.authenticate('local', {
    failureRedirect: '/users/signIn',
    successRedirect: '/notes',
    failureFlash: true
})

userController.logout = (req, res) => {
    req.logout();
    req.flash('successMessage', 'You are logged out now');
    res.redirect('/users/signIn');
}

module.exports = userController;