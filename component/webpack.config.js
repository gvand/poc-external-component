module.exports = {
  cache: true,
  target: 'web',
  entry: {
      main: ['./src/Component.tsx']
  },
  output: {
    filename: 'component.[hash].js',
    chunkFilename: '[name].[hash].bundle.js',
    libraryTarget: 'commonjs',
    library: 'components'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader",
        options: {
          transpileOnly: true
        }
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      },
    ]
  },
  resolve: {
    modules: ['node_modules', 'src'],
    extensions: ['*', ".ts", ".tsx", '.js', '.json'],
  },
  externals: {
    'react': 'react',
    'react-dom': 'react-dom',
    // 'react-redux': 'react-redux',
    // 'redux': 'redux',
  },
  plugins: [

  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 30,
      maxSize: 250,
      minChunks: 3,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      automaticNameMaxLength: 30,
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  }
};
