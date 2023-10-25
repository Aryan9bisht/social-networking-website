const Comment = require('../models/comments');
const Post = require('../models/post');
const commentsmailer = requre('../mailers/commentsmailer');
module.exports.create = function(req, res) {
    Post.findById(req.body.post, function(err, post) {

        if (post) {
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            }, function(err, comment) {
                // handle error

                post.comments.push(comment);
                post.save();
                req.flash('success', 'comment created');
                res.redirect('/');
            });
        }

    });
}


module.exports.destroy = function(req, res) {
    Comment.findById(req.params.id, function(err, comments) {
        if (comments.user == req.user.id) {

            let postId = comments.post;

            comments.deleteOne();

            Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } }, function(err, post) {
                req.flash('success', 'comments deleted');
                return res.redirect('back');
            })
        } else {
            req.flash('failed', 'comments failed to delete');
            return res.redirect('back');

        }
    });
}