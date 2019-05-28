import nodeResolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import nodeGlobals from 'rollup-plugin-node-globals';
import postcss from 'rollup-plugin-postcss';

const globals = {
  react: 'React',
  'react-dom': 'ReactDOM',
};

const config = {
  input: 'src/index.js',
  output: {
    format: 'commonjs',
    name: 'react-datepicker2',
    globals,
  },
  plugins: [
    postcss({
      plugins: []
    }),
    nodeResolve({
      extensions: [".js", ".jsx"]
    }),
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true
    }),
    commonjs(),
    nodeGlobals(),
  ],
  external: Object.keys(globals)
};

export default config;
