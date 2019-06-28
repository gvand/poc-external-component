const PolyfillInjectorPlugin = require('webpack-polyfill-injector');

module.exports = {
  cache: true,
  target: 'web',
  entry: {
    client: `webpack-polyfill-injector?${JSON.stringify({
      modules: ['./src/index.tsx']
    })}!`
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
    ]
  },
  resolve: {
    modules: ['node_modules', 'src'],
    extensions: ['*', ".ts", ".tsx", '.js', '.json'],
  },
  plugins: [
    new PolyfillInjectorPlugin({
      singleFile: true, // `false` will reduce used up bandwidth (<70KiB), but `true` would create thousands of files for all polyfill combinations
      polyfills: [
        'Promise',
        'fetch',
        'Array.prototype.find',
        'Array.prototype.findIndex',
        'Array.prototype.includes',
        'Array.prototype.fill',
        'Array.from',
        'String.prototype.includes',
        'String.prototype.startsWith',
        'String.prototype.endsWith',
        'Element.prototype.classList',
        'Object.assign',
        'Object.keys',
        'Number.parseInt',
        'Number.parseFloat',
        'Symbol',
        'IntersectionObserver',
      ]
    })
  ]
};
