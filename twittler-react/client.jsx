import React from "react";
import ReactDom from "react-dom";
import { hot } from "react-hot-loader/root";

import Twittler from "./Twittler";

const Hot = hot(Twittler);

ReactDom.render(<Hot />, document.querySelector("#root"));
