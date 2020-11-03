const path = require('path')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry: './main.js', // 入口
  output: {
    filename: 'bundle.js', // 把所有依赖的模块合并输出到一个 bundle.js 文件

    path: path.resolve(__dirname, './dist'), // 输出文件存放的目录，必须是 string 类型的绝对路径。
  },
  module: {
    rules: [{
      test: /\.css$/,
      exclude: [
        path.resolve(__dirname, 'node_modules')
      ],
      use: [MiniCssExtractPlugin.loader, 'css-loader']
    }]
  },
  plugins: [
    new MiniCssExtractPlugin({
      // 从 .js 文件中提取出来的 .css 文件的名称
      // filename: `[name]_[contenthash:8].css`,
      filename: `[name].css`,
    }),
  ],
  devServer: {
    contentBase: './dist',
    hot: true, // 是否开启模块热替换功能
    port: 9000,
    compress: true, // 是否开启 gzip 压缩
    proxy: {}
  },
  profile: true, // 是否捕捉 Webpack 构建的性能信息，用于分析什么原因导致构建性能不佳
  watch: true,
  watchOptions: { // 监听模式选项
    ignored: /node_modules/, // 不监听的文件或文件夹，支持正则匹配。默认为空
    aggregateTimeout: 300, // 监听到变化发生后会等300ms再去执行动作，防止文件更新太快导致重新编译频率太高  默认为300ms  
    poll: 1000, // 判断文件是否发生变化是不停的去询问系统指定文件有没有变化，默认每隔1000毫秒询问一次
  },
  // 输出文件性能检查配置
  performance: {
    hints: 'warning', // 有性能问题时输出警告
    hints: 'error', // 有性能问题时输出错误
    hints: false, // 关闭性能检查
    maxAssetSize: 200000, // 最大文件大小 (单位 bytes)
    maxEntrypointSize: 400000, // 最大入口文件大小 (单位 bytes)
    assetFilter: function (assetFilename) { // 过滤要检查的文件
      return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
    }
  },
}