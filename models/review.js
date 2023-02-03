const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const { Schema } = require("mongoose");
var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);

const reviewSchema = new Schema({
    // 글 제목
    title : {
        type : String,
        required : true
    },

    // 글 본문
    content : {
        type : String,
        required : true
    },

    // 글 최초 생성일자
    createdAt: {
        type : Date,
        default : Date.now,
    },

    // 글 수정일자
    updatedAt : {
        type : Date,
        default : Date.now,
    },

    // "created" "updated" "deleted" 로 구분
    status : {
        type : String
    },

    // 글 작성자 아이디 (고유 objectId)
    // userId : {
    //     type : ObjectId,
    //     required : true,
    //     ref : 'User'
    // },

    // // 글 작성자 이름
    username : {
        type : String,
        required : true,
        ref : 'User'
    }

}, {collection : '', versionKey : false});

reviewSchema.plugin(autoIncrement.plugin, {
    model: 'review',
    field: 'num',
    startAt: 1,     // 시작
    increment: 1    // 증가
});

module.exports = mongoose.model('Review', reviewSchema);