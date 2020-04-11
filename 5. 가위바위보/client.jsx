import React from "react";
import ReactDom from "react-dom";
import { hot } from "react-hot-loader/root";

import GawiBawiBo from "./GawiBawiBo";

const Hot = hot(GawiBawiBo);

ReactDom.render(<Hot />, document.querySelector("#root"));
