require('dotenv').config()

const express = require("express")
const cors = require("cors")
const session = require('express-session')
// 라우터 설정
const openaiRouter = require('./api/openai/route.openai')
const loginRouter = require('./api/user/login/route.login')
const registerRouter = require('./api/user/register/route.register')

const port = 8080;

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000', // 클라이언트 도메인
  credentials: true // 세션 쿠키 전달 허용
}));

const { sequelize } = require('./model/index');

sequelize.sync({ force: false })
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch((err) => {
    console.error(err);
  });

app.use(session({
    resave : false,
    saveUninitialized : false,
    secret : "secret",
    cookie : {
      httpOnly : true,
      secure : false
    }
  })
)

// 라우팅
app.use("/openai", openaiRouter)
app.use("/user", loginRouter)
app.use("/register", registerRouter)

// 미들웨어
app.use(cors())
/* 세션 보류 */


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

