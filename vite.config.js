import path from "node:path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "screw",
      formats: ["es", "umd"],
      fileName: (format) => `screw.${format}.js`,
    },
    rollupOptions: {},
  },
  define: {
    __VERSION: JSON.stringify(process.env.npm_package_version),
  },
});
