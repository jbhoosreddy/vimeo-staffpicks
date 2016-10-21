const React = require("react");
const { DOM: dom, PropTypes, createFactory } = React;
const classnames = require("classnames");

require("./Modal.css");

const Modal = React.createClass({

  displayName: "Modal",

  PropTypes: {
    code: PropTypes.string,
    type: PropTypes.string,
    message: PropTypes.string.isRequired,
  },

  render() {
    const { type, message } = this.props;
    return dom.div(
      { className: "modal" },
      dom.div(
        { className: classnames("modal-content", type) },
        dom.p({}, message)
      )
    );
  }
});

module.exports = Modal;