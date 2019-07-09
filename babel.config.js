// module.exports = {
//   presets: [
//     [
//       '@babel/preset-env',
//       {
//         modules: false,
//       },
//     ],
//     '@babel/preset-react',
//   ],

//   plugins: [
//     '@babel/plugin-proposal-class-properties',
//   ],
// };

module.exports = {
  env: {
    es: {
      presets: [
        [
          '@babel/env', {
            modules: false,
          },
        ],
        '@babel/react',
      ],
    },

    cjs: {
      presets: [
        '@babel/env',
        '@babel/react',
      ],
    },

    test: {
      presets: [
        '@babel/env',
        '@babel/react',
      ],
    },

    dev: {
      presets: [
        [
          '@babel/env', {
            modules: false,

            targets: {
              firefox: '66',
              chrome: '73',
            },
          },
        ],
        '@babel/react',
      ],
    },
  },

  plugins: [
    '@babel/plugin-transform-runtime',
    '@babel/plugin-proposal-class-properties',
  ],
};