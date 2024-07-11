

const getPosts = (req, res, next)=>{
    // const id = parseInt(req.params.id);
    // res.status(200).json(posts.filter((post) => post.id === id));
    
    res.send({
        message: 'hello peeps'
    })
}

module.exports = {
    getPosts
}

