module.exports = {
  webpack: function (config, env) {
    config.module.rules.unshift({
      test: /\.(js|mjs|jsx|ts|tsx)$/,
      use: [
        {
          loader: require.resolve('@midwayjs/hooks-loader'),
        },
      ],
    })

    return config
  },
}
