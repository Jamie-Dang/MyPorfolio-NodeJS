const express = require('express');
const router = express.Router();
const Post = require('../models/post');

/**
 * GET
 * HOME
 */
router.get('', async (req, res) => {
    try {
        const locals = {
            title: 'NodeJs Blog',
            description: 'Simple Blog created with NodeJs, Express & MongoDb.',
        };
        // Để giới hạn trang trong 1 phần trang
        let perPage = 10;
        let page = req.query.page || 1;

        const data = await Post.aggregate([{ $sort: { createdAt: -1 } }])
            .skip(perPage * page - perPage)
            .limit(perPage)
            .exec();

        // Count is deprecated - please use countDocuments
        // const count = await Post.count();
        const count = await Post.countDocuments({});
        const nextPage = parseInt(page) + 1;
        const hasNextPage = nextPage <= Math.ceil(count / perPage);

        // Để render ra giao diện + Các biến sử dụng
        res.render('index', {
            locals,
            data,
            current: page,
            nextPage: hasNextPage ? nextPage : null,
            currentRoute: '/',
        });
    } catch (error) {
        console.log(error);
    }
});

/**
 * GET --View 1 blog
 * Post :id
 */

router.get('/post/:id', async (req, res) => {
    try {
        let slug = req.params.id;
        const data = await Post.findById({ _id: slug });
        const locals = {
            title: data.title,
            description: 'Simple Blog created with NodeJs, Express & MongoDb.',
        };
        // Để render ra giao diện + Các biến sử dụng
        res.render('post', {
            locals,
            data,
        });
    } catch (error) {
        console.log(error);
    }
});

/**
 * GET --View 1 blog
 * Post :id
 */

router.post('/search', async (req, res) => {
    try {
        const locals = {
            title: 'search',
            description: 'Simple Blog created with NodeJs, Express & MongoDb.',
        };

        let searchTerm = req.body.searchTerm;
        const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9]/g, '');
        const data = await Post.find({
            $or: [
                {
                    title: { $regex: new RegExp(searchNoSpecialChar, 'i') },
                },
                {
                    body: { $regex: new RegExp(searchNoSpecialChar, 'i') },
                },
            ],
        });
        // Để render ra giao diện + Các biến sử dụng
        res.render('search', {
            locals,
            data,
        });
    } catch (error) {
        console.log(error);
    }
});

router.get('/about', (req, res) => {
    res.render('about');
});

module.exports = router;
