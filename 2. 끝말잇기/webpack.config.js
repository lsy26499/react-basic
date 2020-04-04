const path = require("path");

module.exports = {
  name: "kketmalitgi-setting",
  mode: "development", // 실서비스: production
  devtool: "eval",
  resolve: {
    extensions: [".js", ".jsx"], // entry app의 해당 확장자 파일 찾아주도록
  },
  entry: {
    app: ["./client"],
  }, // 입력
  module: {
    rules: [
      {
        test: /\.jsx?/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
          plugins: ["@babel/plugin-proposal-class-properties"],
        },
      },
    ],
  },
  output: {
    path: path.join(__dirname, "dist"), // 현재폴더안의 dist로 경로 설정됨
    filename: "app.js",
  }, // 출력
};
