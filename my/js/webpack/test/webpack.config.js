const path = require('path')

module.exports = {
  entry: './main.js', // 入口
  output: {
    filename: './bundle.js', // 把所有依赖的模块合并输出到一个 bundle.js 文件
    path: path.resolve(__dirname, './dist')
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: ['style-loader',
        {
          loader: 'css-loader',
          // options: {
          //   minimize: false || {}, // 开启压缩
          // }
        }
      ]
    }]
  }
}