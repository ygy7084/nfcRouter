import fs from 'fs';
import path from 'path';

// 환경설정 파일을 읽는다
const file_location = path.join('./', 'config.json');
const config = JSON.parse(fs.readFileSync(file_location, 'utf8'));

// 환경설정 구조
const config_key = [
  'MONGO_URL',
  'PORT',
  'REDIRECT_TO',
];

// 환경설정 입력할 객체
const configuration = {
  MONGO_URL: '',
  PORT: '',
  REDIRECT_TO: '',
};

// 위의 객체에 환경설정 입력
(function () {
  for (let i = 0; i < config_key.length; i++) {
    if (config[config_key[i]]) { configuration[config_key[i]] = config[config_key[i]]; }
  }
  configuration.PORT = process.env.PORT || 3000;
}());
export default configuration;
