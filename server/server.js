import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import configure from './configure';

// api 라우트 로드
import api from './routes';

const app = express();
const port = configure.PORT;

// 몽고디비 연결 설정
const db = mongoose.connection;
mongoose.connect(configure.MONGO_URL, {
  useMongoClient: true,
});

// Mongoose 모듈의 Promise 변경 - 모듈 권고사항 (deprecated)
mongoose.Promise = global.Promise;

// 몽고디비 연결
db.on('error', console.error);
db.once('open', () => {
  console.log(`[MONGO DB URL] : ${configure.MONGO_URL}`);
});

// API 라우트
app.use('/api', api);
// 404 에러
app.use((req, res) => {
  res.status(404).send('NOT FOUND');
});

const server = http.Server(app);
server.listen(port, () => {
  console.log(`Server is listening on this port : ${port}`);
});
