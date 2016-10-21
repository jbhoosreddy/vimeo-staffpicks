const React = require("react");
const { DOM: dom, PropTypes, createFactory } = React;
const Svg = require("./Svg");

require('./Header.css');

const Header = React.createClass({

  displayName: "Header",

  render() {
    return dom.div(
      {},
      dom.div(
        { className: "body_ribbon esi_ribbon" },
      ),
      dom.div(
        { className: "topnav_desktop" },
        dom.div({ className: "topnav_desktop_wrapper" },
          dom.span(
            {
              href: "/",
              alt: "Go to home page",
              title: "Home page"
            },
            dom.img(
              { src: "/img/logo.png",
                width: "100"
              }
            ),
            dom.img(
              { src: "/img/staffpicks.svg",
                style: {
                  paddingLeft: 10
                },
                width: "50"
              }
            )
          )
        )
      )
    )
  }

});

module.exports = Header;