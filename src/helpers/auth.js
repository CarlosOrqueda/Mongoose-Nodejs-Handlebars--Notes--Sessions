const helpers = {};

helpers.isAuthenticated = (req, res, next) => {
    if(req.isAuthenticated())
        return next()
    else {
        req.flash('errorMessage', 'Not authorized');
        res.redirect('/users/signIn');
    }
};

module.exports = helpers;