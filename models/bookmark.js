const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const { Schema } = require("mongoose");
var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);

const bookmarkSchema = new Schema({
    postId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Question',
        // require : true
    },

    postTitle : {
        type : String
    },

    // 북마크 등록자 id
    userId : {
        type : String,
        // required : true,
        ref : 'User'
    },

    // 북마크 등록일
    createdAt: {
        type : Date,
        default : Date.now,
    },
    category : {
        type : String
    }

    

}, {collection : '', versionKey : false},  { toObject: { virtuals: true }, toJSON: { virtuals: true } },);

bookmarkSchema.plugin(autoIncrement.plugin, {
    model: 'bookmarkSchema',
    field: 'num',
    startAt: 1,     // 시작
    increment: 1    // 증가
});



module.exports = mongoose.model('Bookmark', bookmarkSchema);