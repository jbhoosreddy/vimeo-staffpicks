const React = require("react");
const InlineSVG = require("svg-inline-react");

const svg = {
  "logo": require("./logo.svg"),
  "arrow-right": require("./arrow-right.svg"),
  "arrow-left": require("./arrow-left.svg"),
  "play": require("./play.svg")
};

module.exports = function(name, props) { // eslint-disable-line
  if (!svg[name]) {
    throw new Error("Unknown SVG: " + name);
  }
  let className = name;
  if (props && props.className) {
    className = `${name} ${props.className}`;
  }
  if (name === "subSettings") {
    className = "";
  }
  props = Object.assign({}, props, { className, src: svg[name] });
  return React.createElement(InlineSVG, props);
};
