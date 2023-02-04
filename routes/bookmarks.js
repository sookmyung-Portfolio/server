const express = require('express');
const router = express.Router();
var Bookmark = require('../models/qual');
const Question = require('../models/question');
const Qual = require('../models/qual');
const Review = require('../models/review');
const {auth} = require('../middleware/auth');


// 북마크 등록
// localhost:{port}/bookmark?postId={postId}
router.post("/", auth, async (req, res, next) => {
    var found = false;
    var post;
    const bookmark = new Bookmark();
    while (found === true){
        Qual.findOne({_id : req.query.postId}, function(err, result) {
            if (err) {found = false};
            if (!result) {found = false};
            if (result) {found = true, post = result} ;
        });
        Review.findOne({_id : req.query.postId}, function(err, result) {
            if (err) {found = false};
            if (!result) {found = false};
            if (result) {found = true, post = result} ;
        });
        Question.findOne({_id : req.query.postId}, function(err, result) {
            if (err) {found = false};
            if (!result) {found = false};
            if (result) {found = true, post = result} ;
        })
    }
    
    try {
        if (post != null) {
            bookmark.userId = req.user._id;
            bookmark.postId = post._id;
            bookmark.postTitle = post.title;
            await bookmark.save();
            res.status(200).json(bookmark);
        } else {
            res.status(300).json("요청하신 글이 없습니다.");
        }
        
    } catch(err) {
        res.status(500).json(err);
    }
});


// 북마크 해제 - 권한필요
router.delete("/:id", auth, async (req, res) => {
    try {
        const bookmark = await Bookmark.findOne({_id : req.params.id});
        if(bookmark.userId === req.user._id) {
            try {
                // await Post.findByIdAndDelete(req.params.id);
                await bookmark.delete();
                res.status(200).json("북마크가 정상적으로 해제되었습니다.");
            } catch (err) {
                res.status(500).json(err);
            }
        } else {
            res.status(401).json("유저 정보가 틀립닌다.");
        }
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;