import typescript from 'rollup-plugin-typescript2'
import pkg from './package.json'

export default {
  input: 'src/cli.ts',
  output: [
    {
      file: 'dist/cli.js',
      format: 'cjs',
      banner: '#!/usr/bin/env node',
    },
  ],
  external: [...Object.keys(pkg.dependencies || {})],
  plugins: [
    typescript({
      typescript: require('typescript'),
      tsconfig: './tsconfig.build.json',
    }),
  ],
}
