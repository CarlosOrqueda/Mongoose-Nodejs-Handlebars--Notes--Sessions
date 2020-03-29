import passport from 'passport';
import {Strategy} from 'passport-local';
import User from '../models/User';

const localStrategy = Strategy;

passport.use(new localStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {

    // Match email's user

    const user = await User.findOne({email});
    if(!user)
        return done(null, false, {message: 'Not user found'});
    else {

        // Match password's user

        const match = await user.matchPassword(password);
        if(match) 
            return done(null, user);
        else 
            return done(null, false, {message: 'Incorrect password'});
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser( async (id, done) => {
    await User.findById(id, (error, user) => {
        done(error, user);
    });
});