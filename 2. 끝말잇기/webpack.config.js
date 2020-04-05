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
          presets: [
            [
              "@babel/preset-env",
              {
                targets: {
                  browsers: ["> 1% in KR"],
                },
                debug: true,
              },
            ],
            "@babel/preset-react",
          ],
          plugins: ["@babel/plugin-proposal-class-properties", "react-hot-loader/babel"],
        },
      },
    ],
  },
  output: {
    path: path.join(__dirname, "dist"), // 현재폴더안의 dist로 경로 설정됨
    filename: "app.js",
    publicPath: "/dist/",
  }, // 출력
};
