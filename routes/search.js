const express = require('express');
const router = express.Router();
const Question = require('../models/question');
const Qual = require('../models/qual');
const Review = require('../models/review');

router.get("/", checkQual, checkReview, checkQuestion, async (req, res, next) => {
    var question = res.locals.question;
    var qual = res.locals.qual;
    var review = res.locals.review;

    var result = {question, qual, review};
    // console.log(result);
   
    try {
        if (result != null) {
            res.status(200).json(result);
        } else {
            res.status(300).json("검색 결과가 없습니다.")
        }
    } catch (err) {
        res.status(500).json(err);
    }
})


module.exports = router;

function checkQual(req, res, next) {
    var  term  =  req.query.keyword;
    console.log(term);
    Qual.find({ title : {$regex : new RegExp(term)}}, function(err, result) {
        if (result) {res.locals.qual = result} ;
        // console.log("qual", res.locals);
        next();
    });
}

function checkReview (req, res, next) {
    var  term  =  req.query.keyword;
    // try {
    //     const datas =  Review.find({ title : {$regex : new RegExp(term)}});
    //     console.log("review", datas === null);
    //     res.locals.review = datas;
    //     next();
    // } catch (err) {
    //   console.log(err);
    // }
    Review.find({ title : {$regex : new RegExp(term)}}, function(err, result) {
        if (result) {res.locals.review = result};
        // console.log("false?", res.locals.review == null);
        // console.log("result false?", result == null);
        // console.log("result", result);
        // console.log("review", res.locals);
        next();
    });
    
}

function checkQuestion(req, res, next) {
    var  term  =  req.query.keyword;
    Question.find({ title : {$regex : new RegExp(term)}}, function(err, result) {
        if (result) {res.locals.question = result} ;
        // console.log("question", res.locals);
        next();
    });
}