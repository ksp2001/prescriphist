module.exports = {
  webpack(config) {
    config.module.rules.push({
      options: {
        prettier: false,
        svgo: true,
        svgoConfig: {
          plugins: [
            {
              name: 'preset-default',
              params: {
                overrides: { removeViewBox: false },
              },
            },
          ],
        },
        titleProp: true,
      },
      test: /\.svg$/,
      loader: "@svgr/webpack",
    });

    return config;
  }
};
