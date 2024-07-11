const express = require('express');
const router = express();
const {getPosts} = require('../Controllers/getPosts');


// why is this working the opposite eg instead of get to display, post is displaying
// router.get('/', (req, res)=>{
//     // const id = parseInt(req.params.id);
//     // res.status(200).json(posts.filter((post) => post.id === id));

//     res.send('hello peeps')
// });

router.get('/', getPosts)


module.exports = router;