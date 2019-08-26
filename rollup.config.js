import vue from "rollup-plugin-vue";
import commonjs from "rollup-plugin-commonjs";
import babel from "rollup-plugin-babel";
import { terser } from "rollup-plugin-terser";

export default [
  {
    input: "src/components/ConnectionAware.vue",
    output: {
      banner: "/* my-library version " + version + " */",
      format: "esm",
      file: "dist/ConnectionAware.js"
    },
    plugins: [
      vue(),
      commonjs(),
      babel({
        runtimeHelpers: true,
        exclude: "node_modules/**",
        extensions: [".js", ".vue"]
      })
    ]
  },
  {
    input: "src/components/ConnectionAware.vue",
    output: {
      format: "esm",
      file: "dist/ConnectionAware.min.js"
    },
    plugins: [
      vue(),
      commonjs(),
      babel({
        runtimeHelpers: true,
        exclude: "node_modules/**",
        extensions: [".js", ".vue"]
      }),
      terser()
    ]
  }
];
