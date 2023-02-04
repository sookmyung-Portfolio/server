const express = require('express');
const router = express.Router();
var Bookmark = require('../models/bookmark');
const Question = require('../models/question');
const Qual = require('../models/qual');
const Review = require('../models/review');
const {auth} = require('../middleware/auth');


// 북마크 등록
// localhost:{port}/bookmarks?postId={postId}
router.post("/", auth, checkQualPost, checkQuestionPost, checkReviewPost, async (req, res, next) => {
    var post = res.locals.post;
    const bookmark = new Bookmark();
    
    try {
        if (post != null) {
            bookmark.userId = req.user.id;
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
// localhost:{port}/bookmarks/{bookmarkId}
router.delete("/:id", auth, async (req, res) => {
    try {
        const bookmark = await Bookmark.findOne({_id : req.params.id});
        if(bookmark.userId === req.user.id) {
            try {
                // await Post.findByIdAndDelete(req.params.id);
                await bookmark.delete();
                res.status(200).json("북마크가 정상적으로 해제되었습니다.");
            } catch (err) {
                res.status(500).json(err);
            }
        } else {
            res.status(401).json("유저 정보가 틀립니다.");
        }
    } catch (err) {
        res.status(500).json(err);
    }
})

// 특정 유저 모든 북마크 항목 가져오기
// localhost:{port}/bookmarks/{userId}
router.get("/:userId", auth, async(req, res) => {
    try {
        if(req.params.userId === req.user.id) {
            try {
                let bookmarks;
                bookmarks = await Bookmark.find({userId : req.user.id});
                res.status(200).json(bookmarks);
            } catch (err) {
                res.status(500).json(err);
            }
        } else {
            res.status(401).json("접근불가");
        }
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;

function checkQualPost(req, res, next) {
    Qual.findOne({_id : req.query.postId}, function(err, result) {
        if (result) {res.locals.post = result} ;
        console.log("qualdd", result);
        next();
    });
}

function checkReviewPost(req, res, next) {
    Review.findOne({_id : req.query.postId}, function(err, result) {
        if (result) {res.locals.post = result} ;
        console.log("reviewdd", result);
        next();
    });
    
}

function checkQuestionPost(req, res, next) {
    Question.findOne({_id : req.query.postId}, function(err, result) {
        if (result) {res.locals.post = result} ;
        console.log("questiondd", result);
        next();
    })
}