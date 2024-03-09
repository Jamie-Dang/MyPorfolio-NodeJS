const mongoose = require('mongoose');

// Sau khi kết nối configs (db) + .env + App.js => Thì để thêm các data trong mongooseDB thì phải require('mongose') + Schema để thành lập dữ liệu.
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    createAt: {
        type: Date,
        default: Date.now,
    },
    updateAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Post', postSchema);
