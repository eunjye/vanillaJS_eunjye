const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session'); // 직접 쿠키에도 접근 가능
const fs = require('fs'); // Node.js에 내장되어있는 default 모듈 (나중에 파일을 열기 위함)

app.set('views', __dirname + '/views'); // set views
app.set('view engine', 'ejs'); // set view engine
app.engine('html', require('ejs').renderFile);

const server = app.listen(3000, () =>{ // port num, callback
  console.log("Express server has started on port 3000")
});

app.use(express.static('dist')); // set static files (dist(images, js, css))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(session({
  secret: '@#@$MYSIGN#@$#$', // 쿠키를 임의로 변조하는 것을 방지하기 위한 sign 값(임의 설정)
  resave: false, // 세션이 변경되지 않아도 세션을 언제나 저장할지 정함. (false를 권장)
  saveUninitialized: true //새로 생겼지만 변경되지 않은 세션을 저장할 것인지 (true를 권장)
}));

const router = require('./router/main')(app, fs); // bodyParser 설정 아래부분에 있다면 제대로 작동하지 않음. fs도 인자로 넘겨줌