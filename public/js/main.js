;(function() {
  const boot = function () {
    const ReactDOM = require("react-dom");
    const React = require("react");
    const { DOM: dom } = React;

    const App = require("./components/App");

    function mountRoot(component) {
      const mount = document.querySelector("#mount");
      // Useful for testing
      if (!mount) {
        return;
      }
      ReactDOM.render(
        dom.div({ className: "root",
            style: { flex: 1 } },
          React.createElement(component)),
        mount
      );
    }

// Maybe not really useful for the Browser Content DOM context but leaving it for now.
    function unmountRoot() {
      const mount = document.querySelector("#mount");
      ReactDOM.unmountComponentAtNode(mount);
    }

    mountRoot(App);
  };
  // Wait till DOM is ready for interaction.
  document.addEventListener("DOMContentLoaded", boot);
})();

