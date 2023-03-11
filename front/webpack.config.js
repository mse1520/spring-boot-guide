const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const IS_DEV = process.env.NODE_ENV === 'development';

module.exports = {
  name: 'webpack',
  target: ['web', 'es5'],
  // mode, // 실서비스는 production
  // devtool, // 실서비스는 hidden-source-map
  mode: IS_DEV ? 'development' : 'production',
  devtool: IS_DEV ? 'eval-cheap-module-source-map' : 'hidden-source-map',
  resolve: {
    // import 구문에서 합쳐질 파일의 확장자를 붙여준다
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.png', '.svg'],
    // 경로 alias
    alias: {
      // '@basic': resolve('src', 'basic'),
    },
  },
  // 합쳐질 파일의 시작점
  // 파일이 서로 연결된경우 알아서 찾아준다
  entry: {
    app: path.resolve('src')
  },
  // 하나로 합쳐실 출력 파일의 설정입니다
  output: {
    publicPath: '/',
    path: path.resolve('dist'),
    filename: '[name].js',
    clean: true
  },
  // loader 설정
  module: {
    rules: [{
      // test는 어떤 파일이 함쳐지는지에 대한 내용입니다
      test: /\.(js|ts)x?$/, //정규 표현식
      exclude: /node_modules/,
      // 다수의 loader를 사용할 시 use 배열로 객체를 정의할 수 있다
      // style loader를 참고 자료로 검색해볼 것
      // use: [{}, {}],
      loader: 'babel-loader',
      options: {
        presets: [
          ['@babel/preset-env', {
            useBuiltIns: 'usage',
            corejs: 3,
            debug: true
          }],
          '@babel/preset-react'
        ],
      }
    }, {
      test: /\.(png|svg)/,
      type: 'asset/resource',
      generator: {
        filename: path.join('resources', 'img', '[name][ext][query]')
      }
    }]
  },
  // plugin은 번들링 된 파일에 작업이 필요할 때
  plugins: [
    new HtmlWebpackPlugin({
      cache: false, // 변경된 경우에만 파일을 내보냅니다
      template: path.resolve('src', 'index.html') // 번들링 파일과 연결할 파일의 경로
    })
  ],
  // devServer 관련 설정
  devServer: {
    // BrowserRouter url 인식 설정
    historyApiFallback: true,
    // 코드 변화 감지 변경 옵션
    hot: true,
    port: 4005,
    // 브라우저 열기
    open: true,
    proxy: {
      '/api': { target: 'http://localhost:4001' }
    },
    static: { directory: path.join('src', 'resources') }
  }
};