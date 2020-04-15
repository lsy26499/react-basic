import React from "react";
import ReactDom from "react-dom";
import { hot } from "react-hot-loader/root";

import Minesweeper from "./Minesweeper";

const Hot = hot(Minesweeper);

ReactDom.render(<Hot />, document.querySelector("#root"));
