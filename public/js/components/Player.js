const React = require("react");
const { DOM: dom, PropTypes, createFactory } = React;
const VimeoPlayer = require("@vimeo/player");
const Mousetrap = require("mousetrap");

const RIGHT_KEY_BINDING = "ctrl+shift+right";
const LEFT_KEY_BINDING = "ctrl+shift+left";
const SPACE_KEY_BINDING = "space";

require("./Player.css");

const Player = React.createClass({

  PropTypes: {
    height: PropTypes.number,
    width: PropTypes.number,
    prevVideo: PropTypes.object,
    selectedVideo: PropTypes.object,
    nextVideo: PropTypes.object,
    setSelectedVideo: PropTypes.func
  },

  displayName: "Player",

  getInitialState() {
    return {
      playing: false,
      player: null
    };
  },

  keyBinding(e) {
    if (e.code == "Space") {
      e.preventDefault();
      const { playing, player } = this.state;
      playing ? player.pause() : player.play();
      this.setState({ playing: !playing });
    } else {
      const { prevVideo, nextVideo, setSelectedVideo } = this.props;
      if(e.code == "ArrowRight") {
        setSelectedVideo(nextVideo);
      } else if(e.code == "ArrowLeft") {
        setSelectedVideo(prevVideo);
      }
    }
  },

  componentDidMount() {
    const { selectedVideo, width, height } = this.props;
    const { keyBinding } = this;
    const id = parseInt(selectedVideo.uri.replace("/videos/", ''));
    const options = {
      id,
      height,
      width
    };
    const player = new VimeoPlayer("video-player-component", options);
    player.play();
    this.setState({ player });
    Mousetrap.bind(SPACE_KEY_BINDING, keyBinding);
    Mousetrap.bind(RIGHT_KEY_BINDING, keyBinding);
    Mousetrap.bind(LEFT_KEY_BINDING, keyBinding);
  },

  componentWillUnmount() {
    const { keyBinding } = this;
    Mousetrap.unbind(SPACE_KEY_BINDING, keyBinding);
    Mousetrap.unbind(RIGHT_KEY_BINDING, keyBinding);
    Mousetrap.unbind(LEFT_KEY_BINDING, keyBinding);
  },

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.selectedVideo.uri !== this.props.selectedVideo.uri;
  },

  componentWillReceiveProps(nextProps) {
    const { player } = this.state;
    const { selectedVideo, nextVideo, setSelectedVideo } = nextProps;
    if(nextProps.selectedVideo.uri !== this.props.selectedVideo.uri) {
      const id = parseInt(selectedVideo.uri.replace("/videos/", ''));
      player.loadVideo(id).then(() => {
        player.play();
      }).catch(function(error) {
        console.log(error);
      });
      // Logic for auto-playing the next video
      // const _setSelectedVideo = () => {
      //   player.off("ended", _setSelectedVideo);
      //   console.log('cueing', nextVideo.uri);
      //   setSelectedVideo(nextVideo);
      // };
      // player.on("ended", _setSelectedVideo);
    }
  },

  render() {
    return dom.div(
      { className: "player",
        id: "video-player-component" }
      );
  }

});

module.exports = Player;