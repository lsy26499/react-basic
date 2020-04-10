import React from "react";
import ReactDom from "react-dom";
import { hot } from "react-hot-loader/root";

import ReactionTest from "./ReactionTest";

const Hot = hot(ReactionTest);

ReactDom.render(<Hot />, document.querySelector("#root"));
