import React from "react";
import ReactDom from "react-dom";
import { hot } from "react-hot-loader/root";

import NumberBaseball from "./NumberBaseball";
// require는 node의 모듈 시스템 (common js)
// import는 es2015의 문법

const Hot = hot(NumberBaseball);

ReactDom.render(<Hot />, document.querySelector("#root"));
