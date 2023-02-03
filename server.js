const express = require('express');
const app = express();
const http = require('http');
const bodyParser = require('body-parser');
const dotenv = require("dotenv");

app.use(express.urlencoded({extended: true}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json())

dotenv.config();
const port = 5050;

const cors = require('cors');
app.use(cors());

// DB연결 모듈
const connect = require('./models');
connect(); 


// 라우터 모듈
const indexRouter = require('./routes');
const usersRouter = require('./routes/users');
const commentsRouter = require('./routes/comments');

const qualRouter = require('./routes/quals');
const reviewRouter = require('./routes/reviews');
const questionRouter = require('./routes/questions');

app.use('/quals', qualRouter);
app.use('/reviews', reviewRouter);
app.use('/questions', reviewRouter);


// 서버 연결
app.listen(port, () => {
  console.log(port, '번 포트에서 대기 중');
});