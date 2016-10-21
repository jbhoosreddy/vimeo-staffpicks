const React = require("react");
const { DOM: dom, PropTypes, createFactory } = React;
const Player = createFactory(require('./Player'));
const classnames = require("classnames");
const Mousetrap = require("mousetrap");

const KEY_BINDING = "shift+/";

require("./Theatre.css");

const Theatre = React.createClass({

  PropTypes: {
    prevVideo: PropTypes.object,
    selectedVideo: PropTypes.object,
    nextVideo: PropTypes.object,
    setSelectedVideo: PropTypes.func
  },

  displayName: "Theatre",

  getInitialState() {
    return {
      mode: false,
    };
  },

  keyBinding() {
    const { selectedVideo } = this.props;
    const { mode } = this.state;
    selectedVideo ? this.setState({ mode: !mode }) : null;
  },

  componentDidMount() {
    const { keyBinding } = this;
    Mousetrap.bind(KEY_BINDING, keyBinding);
  },

  componentWillUnmount() {
    const { keyBinding } = this;
    Mousetrap.unbind(KEY_BINDING, keyBinding);
  },

  render() {
    const { prevVideo, selectedVideo, nextVideo, setSelectedVideo } = this.props;
    const { mode } = this.state;
    return dom.div(
      { className: "theatre" },
      selectedVideo ?
        Player({ prevVideo, selectedVideo, nextVideo, setSelectedVideo, height: "500px" }) :
        dom.div(
          { className: "video-not-available" },
          dom.p({}, "Select a video")
        ),
      selectedVideo ? dom.div({ className: "theatre-mode invert" },
        dom.img({ src: "/img/light.png",
          onClick: e => this.setState({ mode: !mode }),
          width: "30px" })
      ) : null,
      dom.div({
        className: classnames("theatre-modal", mode ? "active" : null),
        onClick: e => this.setState({ mode: !mode })
      })
    )
  }
});

module.exports = Theatre;