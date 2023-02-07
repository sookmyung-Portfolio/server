const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const { Schema } = require("mongoose");
var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);
var User = require('../models/user');

const result = new Schema({
    postId : {
        type : mongoose.Schema.Types.ObjectId
        // require : true
    },

    // 게시글 제목
    postTitle : {
        type : String
    },

    // 게시글 작성자 이름
    authorName : {
        type : String,
        ref : 'User'
    },

    // 게시글 작성자 id
    authorId : {
        type : String,
        // required : true,
        ref : 'User'
    },

    // 게시글 업로드일자
    createdAt: {
        type : Date
    },

    // 게시글 종류
    category : {
        type : String
    }

    

}, {collection : '', versionKey : false},  { toObject: { virtuals: true }, toJSON: { virtuals: true } },);

result.plugin(autoIncrement.plugin, {
    model: 'SearchResult',
    field: 'num',
    startAt: 1,     // 시작
    increment: 1    // 증가
});



module.exports = mongoose.model('SearchResult', result);