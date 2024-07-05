module.exports = {
  api: {
    port: process.env.API_PORT || 3000,
  },
  docs: {
    info: {
      version: '1.0.0',
      title: 'Social network',
      description: 'Is not like Facebook',
      license: {
        name: 'MIT',
      },
    },
    security: {
      BasicAuth: {
        type: 'http',
        scheme: 'basic',
      },
    },
    baseDir: __dirname,
    filesPattern: './**/*.js',
  },
};
