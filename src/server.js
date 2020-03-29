import {config} from 'dotenv';
config();

import express from 'express';
import expressHandlebars from 'express-handlebars';
import morgan from 'morgan';
import methodOverride from 'method-override';
import path from 'path';
import connectFlash from 'connect-flash';
import expressSession from 'express-session';
import passport from 'passport';

import './config/passport';

import indexRoutes from './routes/index.routes';
import notesRoutes from './routes/notes.routes';
import usersRoutes from './routes/users.routes';

// Initialization

const app = express();

// Settings

app.set('port', process.env.PORT || 5000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', expressHandlebars({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

// Middlewares

app.use(express.urlencoded({extended: false}));
app.use(morgan('dev'));
app.use(methodOverride('_method'));
app.use(expressSession({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(connectFlash());

// Global variables

app.use((req, res, next) => {
    res.locals.successMessage = req.flash('successMessage');
    res.locals.errorMessage = req.flash('errorMessage');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

// Routes

app.use(indexRoutes);
app.use(notesRoutes);
app.use(usersRoutes);

// Static files

app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;