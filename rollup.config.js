import vue from "rollup-plugin-vue";
import commonjs from "rollup-plugin-commonjs";
import babel from "rollup-plugin-babel";
import { terser } from "rollup-plugin-terser";

export default [
  {
    input: "src/plugins/ConnectionAware/index.js",
    output: {
      format: "esm",
      file: "dist/ConnectionAware.js"
    },
    plugins: [
      vue(),
      babel({
        runtimeHelpers: true,
        exclude: "node_modules/**",
        extensions: [".js", ".vue"]
      }),
      commonjs()
    ]
  },
  {
    input: "src/plugins/ConnectionAware/index.js",
    output: {
      format: "esm",
      file: "dist/ConnectionAware.min.js"
    },
    plugins: [
      vue(),
      babel({
        runtimeHelpers: true,
        exclude: "node_modules/**",
        extensions: [".js", ".vue"]
      }),
      commonjs(),
      terser()
    ]
  }
];
