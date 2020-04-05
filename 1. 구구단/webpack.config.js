const path = require("path");
const webpack = require("webpack");

module.exports = {
  mode: "development",
  devtool: "eval", // production일 때는 hidden-source-map
  resolve: {
    extensions: [".jsx", ".js"],
  },
  entry: {
    app: "./client",
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        options: {
          presets: [
            [
              "@babel/preset-env",
              {
                // preset의 설정 작성: 적용할 브라우저
                // browsers list 참고
                targets: {
                  browsers: ["> 5% in KR", "last 2 chrome versions"],
                },
                debug: true,
              },
            ],
            "@babel/preset-react",
          ],
          plugins: [], // plugin 모음이 preset
        },
      },
    ],
  },
  plugins: [new webpack.LoaderOptionsPlugin({ debug: true })],
  output: {
    filename: "app.js",
    path: path.join(__dirname, "dist"),
  },
};
