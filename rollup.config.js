import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import filesize from 'rollup-plugin-filesize';
import localResolve from 'rollup-plugin-local-resolve';
import { terser } from 'rollup-plugin-terser';
import replace from 'rollup-plugin-replace';

import pkg from './package.json';

const globals = {
  react: 'React',
  'react-dom': 'ReactDom',
  'prop-types': 'PropTypes',
  'react-onclickoutside': 'onClickOutside',
  'react-popper': 'ReactPopper',
  classnames: 'classNames',
  'moment-jalaali': 'moment',
  'react-tether': 'TetherComponent',
  'rc-trigger': 'Trigger'
};

const config = {
  input: 'src/index.js',
  // sourcemap: true,
  output: [
    {
      file: pkg.module,
      format: 'es',
      name: 'DatePicker',
      exports: 'named'
    }
  ],
  plugins: [
    nodeResolve({
      mainFields: ['module'],
      extensions: ['.js', '.jsx']
    }),
    peerDepsExternal(),
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true
    }),
    localResolve(),
    commonjs({
      include: 'node_modules/**'
    }),
    // filesize(),
    // terser(),
    postcss(),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ],
  external: Object.keys(pkg.dependencies).concat(Object.keys(pkg.peerDependencies))
};

export default config;
