module.exports = {
  productionSourceMap: false,
  transpileDependencies: [
    '@sentry',
    'fast-png'
  ],
  devServer: {
    proxy: {
      '/api': {
        target: process.env.VUE_APP_SERVER || 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
        logLevel: 'debug'
      }
    }
  }
}
