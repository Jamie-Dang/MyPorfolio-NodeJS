const mongoose = require('mongoose');

// Sau khi kết nối configs (db) + .env + App.js => Thì để thêm các data trong mongooseDB thì phải require('mongose') + Schema để thành lập dữ liệu.
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('User', userSchema);
