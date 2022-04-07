const webpack = require('webpack')

module.exports = function override(config) {
  const fallback = config.resolve.fallback || {}
  const rules = config.module.rules || []

  Object.assign(fallback, {
    "buffer": require.resolve("buffer"),
  })

  config.module.rules = [
    ...rules,
    {
      test: /\.m?js/,
      resolve: {
          fullySpecified: false
      }
    },
  ]
  config.resolve.fallback = fallback;
  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer']
    })
  ])
  return config
}
