require('dotenv').config();
const express = require('express');
const expressLayout = require('express-ejs-layouts');
// Update -> override
const methodOverride = require('method-override');
// store data when login from user = middleware
const cookieParser = require('cookie-parser');
// move data from cookie to database
const mongoStore = require('connect-mongo');
const session = require('express-session');
// Current route - to return homepage
const { isActiveRoute } = require('./server/helpers/routerHelpers');

const connectDB = require('./server/configs/db');

const app = express();
const PORT = 5000 || process.env.PORT;

// Connect to DB
connectDB();

// pass data through form
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// cookie
app.use(cookieParser());
// Update/Edit
app.use(methodOverride('_method'));

app.use(
    session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
        store: mongoStore.create({
            mongoUrl: process.env.DATABASE_URL,
        }),
    }),
);

app.use(express.static('public'));
// Template Engine
app.use(expressLayout);
app.set('layout', './layouts/main'); // Cấu hình layout mặc định, cho nên nó chỉ render được layouts/main!
app.set('view engine', 'ejs');
//  Current route - return homepage
app.locals.isActiveRoute = isActiveRoute;

// 1 route cho người dùng
app.use('/', require('./server/routes/main'));
// 1 route cho admin
app.use('/', require('./server/routes/admin'));

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
