module.exports = (app, fs) => {
  app.get('/', (req,res) => {
    res.render('index', {
      title: `eunjye's playgound`,
      length: 5
    })
  });
  app.get('/about',(req,res) => {
    res.render('about.html');
  });

  app.get('/list', (req, res) => { 
    fs.readFile(`${__dirname}/../data/user.json`, 'utf8', (err, data) => { // __dirname : 현재 모듈의 위치 (router/)
      console.log(data);
      res.end(data);
    })
  })

  app.get('/getUser/:username', (req, res) => { // 뒤에오는 url을 [a]에서 parameter로 전달해준다

    fs.readFile(`${__dirname}/../data/user.json`, 'utf8', (err, data) => {
      const users = JSON.parse(data); // fs.readFile()로 json파일을 읽으면 텍스트 형태로 읽어지므로, JSON.parse()를 해야함.
      res.json(users[req.params.username]); // [a] : 전달받은 username을 파라미터로 json파일 내 변수를 뿌려줌
    });
  })

  app.post('/addUser/:username', (req, res) => {
    const result = { };
    const username = req.params.username;

    // check req validity
    if (!req.body['password'] || !req.body['name']) {
      result['success'] = 0;
      result['error'] = 'invalid request';
      res.json(result);
      return;
    }

    // load data & check duplication
    fs.readFile(`${__dirname}/../data/user.json`, 'utf8', (err, data) => {
      const users = JSON.parse(data);
      if (users[username]) {
        // duplication found
        result['success'] = 0;
        result['error'] = 'duplicate';
        res.json(result);
        return;
      }

      // add to data
      users[username] = req.body;

      // save data
      fs.writeFile(
        `${__dirname}/../data/user.json`,
        JSON.stringify(users, null, '\t', 'utf8', (err, data) => {
          result = {'success': 1};
          res.json(result);
        })
      )
    })
  })
}