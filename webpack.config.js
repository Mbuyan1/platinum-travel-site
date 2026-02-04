import path from "path";
import { fileURLToPath } from "url";
import postcssNested from "postcss-nested";
import postcssSimpleVars from "postcss-simple-vars";
import autoprefixer from "autoprefixer";
import postcssImport from "postcss-import";
import postcssMixins from "postcss-mixins";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  mode: "development",
  entry: "./app/assets/scripts/app.js",
  output: {
    filename: "bundled.js",
    path: path.resolve(__dirname, "app"),
  },

  devServer: {
    static: {
      directory: path.join(__dirname, "app"), // HTML байгаа хавтас
    },
    hot: true,
    port: 3000,
    host: "0.0.0.0",
    watchFiles: ["./app/**/*.html"], // HTML өөрчлөгдөхийг хянан
    open: {
      app: {
        name: "chrome", // Эсвэл 'google-chrome' (Linux бол)
      },
    },
  },

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  postcssImport(),
                  postcssSimpleVars(), // Хувьсагч зарлахад ($mainblue) хэрэгтэй
                  postcssNested(), // Nesting (.large-hero h1) хийхэд хэрэгтэй
                  postcssMixins(),
                  autoprefixer(), // Browser-ийн зохицолд хэрэгтэй
                ],
              },
            },
          },
        ],
      },
    ],
  },
};
