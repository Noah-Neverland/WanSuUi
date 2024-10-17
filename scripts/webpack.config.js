const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..', 'src/packages/index.ts');

/** @type {import('webpack').Configuration} */
module.exports = {
  mode: 'production',
  entry: [ROOT_DIR],
  output: {
    filename: 'wan-su.js',
    path: path.join(__dirname, '..', 'dist/umd'),
    library: 'WanSu',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          configFile: path.resolve(__dirname, './tsconfig.build.json'),
        },
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
};
