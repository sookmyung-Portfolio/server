const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');
const Post = require('../models/question');
const {auth} = require('../middleware/auth');
// var User = require('../models/user');

// create
router.post('/', auth, checkPostId, function(req, res){ 
  var post = res.locals.post; // 1

  req.body.author = req.user._id; // 2
  req.body.post = post._id;       // 2

  Comment.create(req.body, function(err, comment){
    if(err){
      return console.error(err);  // req,body에 댓글의 내용이 들어있다.
    }
    return res.json({comment});
  });
});

module.exports = router;

// private functions
function checkPostId(req, res, next){ // 1
  Post.findOne({_id:req.query.postId},function(err, post){
    // console.log("gigig", req.query.postId);
    // console.log("gigig1111", post);
    if(err) return res.json(err);

    res.locals.post = post; // 1
    next();
  });
}