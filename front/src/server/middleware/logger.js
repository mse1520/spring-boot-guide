import path from 'path';
import morgan from 'morgan';
import { createStream } from 'rotating-file-stream';
import { lPad } from '../../utils';

const FILE_NAME = 'app';
const DEV = `:method :url :status :response-time ms - :res[content-length]`;
const COMBINED = `:remote-addr - :remote-user [:datetime] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"`;

/** date를 객체로 표현합니다 */
const now = (date = new Date()) => ({
  year: date.getFullYear(),
  month: lPad(date.getMonth() + 1, 2),
  day: lPad(date.getDate(), 2),
  hour: lPad(date.getHours(), 2),
  minute: lPad(date.getMinutes(), 2),
  second: `${lPad(date.getSeconds(), 2)}.${lPad(date.getMilliseconds(), 3)}`,
});

/** 파일명을 생성합니다 */
const generateFileName = (time, index) => {
  if (!time) return `${FILE_NAME}.log`;
  const date = now(time);
  return `${FILE_NAME}.${date.year}-${date.month}-${date.day}.${index}.log`;
};

// file rotate 설정
const stream = createStream(generateFileName, {
  interval: '1d',
  path: path.resolve('log'),
  maxFiles: 7
});

// 날짜 포멧 정의
morgan.token('datetime', () => {
  const date = now();
  return `${date.year}-${date.month}-${date.day} ${date.hour}:${date.minute}:${date.second}`;
});

/**
 * 로깅을 위한 미들웨어 입니다
 * @param {boolean} isDev 개발 모드
 * @returns 로거 미들웨어
 */
export const logger = isDev => isDev
  ? morgan(DEV)
  : morgan(COMBINED, {
    stream: {
      write(message) {
        console.log(message.replace('\n', ''));
        stream.write(message);
      }
    }
  });


  // const test= morgan('combined')
  // test()