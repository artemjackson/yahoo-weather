import { createConfig, match, addPlugins, resolve } from 'webpack-blocks';
import babel from '@webpack-blocks/babel';
import { css, file } from '@webpack-blocks/assets';
import postcss from '@webpack-blocks/postcss';
import DotEnv from 'dotenv-webpack';
import HTML from 'html-webpack-plugin';

export default createConfig([
  babel(),
  css.modules(),
  postcss(),
  match('*.svg', [file()]),
  addPlugins([
    new DotEnv(),
    new HTML({ template: 'src/index.html' }),
  ]),
  resolve({
    extensions: ['.js', '.jsx', '.css'],
    modules: ['src', 'node_modules'],
  }),
]);
