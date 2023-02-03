const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const { Schema } = require("mongoose");
var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);

const questionSchema = new Schema({
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
    },

    // writer: {
    //     type: ObjectId, // 몽고디비에서 ObjectId타입으로 데이터를 다룸
    //     required: true,
    //     ref: 'User', // user.js스키마에 reference로 연결되어 있음. join같은 기능. 나중에 populate에 사용
    //   },

}, {collection : '', versionKey : false});

questionSchema.plugin(autoIncrement.plugin, {
    model: 'question',
    field: 'num',
    startAt: 1,     // 시작
    increment: 1    // 증가
});

module.exports = mongoose.model('Question', questionSchema);