require('dotenv').config()

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const port = 8080;

const app = express();
app.use(bodyParser.json());
app.use(cors());

const { sequelize } = require('./model/index');

sequelize.sync({ force: false })
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch((err) => {
    console.error(err);
  });


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 라우터 설정
const openaiRouter = require('./api/openai/route.openai')

// 라우팅
app.use("/openai/create",openaiRouter)


app.use((req, res, next) => {
  const error =  new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

