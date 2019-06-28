import resolve from 'rollup-plugin-node-resolve';
import rollupTypescript from 'rollup-plugin-typescript';
import rollupCJS from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import { terser } from "rollup-plugin-terser";

export default {
  input: './src/Component.tsx',
  output: {
    file: 'dist/bundle.js',
    format: 'cjs',
    name: 'RootComponent',
    globals: {
      'react': 'React',
      'react-dom': 'ReactDOM',
      'redux': 'Redux',
      'react-redux': 'ReactRedux',
    },
  },
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**'
    }),
    rollupCJS({
      include: 'node_modules/**',
      namedExports: {
        'node_modules/react-is/index.js': ['isValidElementType', 'isContextConsumer']
      }
    }),
    rollupTypescript(),
    terser()
  ],
  external: [ 'react', 'react-dom', 'redux', 'react-redux' ]
};
