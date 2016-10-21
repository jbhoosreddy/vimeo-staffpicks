const React = require("react");
const { DOM: dom, PropTypes, createFactory } = React;
const Modal = createFactory(require('./Modal'));
const Header = createFactory(require('./Header'));
const Theatre = createFactory(require('./Theatre'));
const Description = createFactory(require('./Description'));
const Gallery = createFactory(require('./Gallery'));
// A simple JQuery style library for AJAX, EventEmitter, etc.
const $ = require("../utils/utils");
const Svg = require("./Svg");
const classnames = require("classnames");
const Mousetrap = require("mousetrap");

const LOADING_MESSAGE = "Please wait while we fetch some awesome videos for you!";
const ERROR_MESSAGE = "Oops! Something broke. But we are fixing it!";

const RIGHT_KEY_BINDING = "shift+right";
const LEFT_KEY_BINDING = "shift+left";

require("./App.css");

const App = React.createClass({
  
  displayName: "App",
  
  getInitialState() {
    return {
      // Is the application loaded just loaded
      firstLoad: true,
      // Is the application ready
      ready: false,
      // Selected video object
      selectedVideo: null,
      // Previous video object
      prevVideo: null,
      // Next video object
      nextVideo: null,
      // Videos currently loaded in the application
      videos: null,
      // Total number of videos available
      total: null,
      // Page number of the videos gallery
      page: null,
      // Last page for the videos gallery
      last: null,
      paging: null,
      per_page: null,
      // Did the application have an error eg. API broke
      error: null,
    };
  },

  setSelectedVideo(selectedVideo) {
    const { videos } = this.state;
    const idx = videos.findIndex(v => v.uri == selectedVideo.uri);
    const nextVideo = idx < videos.length ? videos[idx + 1] : videos[0];
    const prevVideo = idx > 1 ? videos[idx - 1] : videos[videos.length - 1];
    this.setState({ prevVideo, selectedVideo, nextVideo });
    document.title = selectedVideo.name + " | Staff Picks by Vimeo";
    return window.scrollTo(0,0);
  },

  getVideos(options) {
    const { firstLoad } = this.state;
    const { sort, page } = options;
    this.setState({ ready: false });
    $.ajax.get(`/api/channels/staffpicks/videos/${page || 1}/${sort || "default"}`, {}, { responseType: "json" })
      .then(response => {
        if (response.status == 200) {
          this.setState({
            videos: response.data.data,
            page: response.data.page,
            last: parseInt(response.data.paging.last.split("=").pop()), // Extract last page from response
            total: response.data.total
          });
          this.setState({ ready: true });
          !firstLoad || this.setState({ firstLoad: false });
        } else {
          this.setState({ ready: false, firstLoad: true, error: true })
        }
      });
  },

  componentWillMount() {
    this.getVideos({ sort: 'default', page: 1 });
  },

  keyBinding(e) {
    const { getVideos } = this;
    const { page, last } = this.state;
    if (e.key == "ArrowLeft") {
      page > 1 ? getVideos({ page: page - 1 }) : null;
    } else if (e.key == "ArrowRight") {
      page < last ? getVideos({ page: page + 1 }) : null;
    }
  },

  componentDidMount() {
    const { keyBinding } = this;
    Mousetrap.bind(RIGHT_KEY_BINDING, keyBinding);
    Mousetrap.bind(LEFT_KEY_BINDING, keyBinding);
  },

  componentWillUnmount() {
    const { keyBinding } = this;
    Mousetrap.unbind(RIGHT_KEY_BINDING, keyBinding);
    Mousetrap.unbind(LEFT_KEY_BINDING, keyBinding);
  },

  render() {
    const { setSelectedVideo, getVideos } = this;
    const { ready, page, last, total, firstLoad, error } = this.state;

    const MESSAGE = error ? ERROR_MESSAGE : LOADING_MESSAGE;

    if (firstLoad && !ready) {
      return Modal( { type: "info", message: MESSAGE });
    }
    const { videos, prevVideo, selectedVideo, nextVideo } = this.state;

    return dom.div(
      { className: "content" },
      !ready ? Modal( { type: "info", message: MESSAGE }): null,
      Header(),
      Theatre({ prevVideo, selectedVideo, nextVideo, setSelectedVideo }),
      selectedVideo ? Description({ selectedVideo }): null,
      !firstLoad || ready ? Gallery({ videos, selectedVideo, setSelectedVideo, getVideos, total }): null,
      dom.div({
        className: classnames("gallery-arrow", "gallery-arrow--left", page == 1 ? "disabled" : null),
        onClick: e => page > 1 ? getVideos({ page: page - 1 }) : null
        },
        dom.img({ src: "/img/arrow-left.png", height: "80px" })
      ),
      dom.div({
        className: classnames("gallery-arrow", "gallery-arrow--right", page == last ? "disabled" : null),
        onClick: e => page < last ? getVideos({ page: page + 1 }) : null
        },
        dom.img({ src: "/img/arrow-left.png", height: "80px" })
      )
    );
  }
});

module.exports = App;