require('dotenv').config();
const express = require('express');
const expressLayout = require('express-ejs-layouts');

const connectDB = require('./server/configs/db');

const app = express();
const PORT = 5000 || process.env.PORT;

// Connect to DB
connectDB();

// pass data through form
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));
// Template Engine
app.use(expressLayout);
app.set('layout', './layouts/main'); // Cấu hình layout mặc định, cho nên nó chỉ render được layouts/main!
app.set('view engine', 'ejs');

// 1 route cho người dùng
app.use('/', require('./server/routes/main'));
// 1 route cho admin
app.use('/', require('./server/routes/admin'));

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
