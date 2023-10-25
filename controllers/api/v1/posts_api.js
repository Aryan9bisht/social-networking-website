const Post = require('../../../models/post');
module.exports.index = async function(req, res) {

    let posts = await Post.find({})
        .sort('-createdAt').populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        });


    return res.json(200, {
        message: "Lists of posts",
        posts: posts
    })
}
module.exports.destroy = async function(req, res) {
    if (post.user == req.user.id) {
        let post = await Post.findById(req.params.id);

        post.remove();
        await Comment.deleteMany({ post: req.params.id });



        return res.json(200, {
            message: 'post and associated comments deleted'
        });
    } else {
        return res.json(401, {
            message: 'you cannot delete this post'
        })
    }

}