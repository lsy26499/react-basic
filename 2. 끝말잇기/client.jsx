const React = require("react");
const ReactDom = require("react-dom");
const { hot } = require("react-hot-loader/root");

const KketMalItGi = require("./KketMalItGi");

const Hot = hot(KketMalItGi);

ReactDom.render(<Hot />, document.querySelector("#root"));
