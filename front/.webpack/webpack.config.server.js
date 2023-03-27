const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const IS_DEV = process.env.NODE_ENV === 'development';

module.exports = {
  name: 'webpack-server',
  target: ['node'],
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
    server: path.resolve('src', 'server')
  },
  // 하나로 합쳐실 출력 파일의 설정입니다
  output: {
    publicPath: '/',
    path: path.resolve('build'),
    filename: '[name].js',
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
        presets: ['@babel/preset-env', '@babel/preset-react']
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
    new CopyWebpackPlugin({
      patterns: [{ from: path.resolve('src', 'resources'), to: 'resources' }],
    })
  ],
  externals: [nodeExternals()]
};