const React = require("react");
const { DOM: dom, PropTypes, createFactory } = React;
const Svg = require("./Svg");
const classnames = require("classnames");

require("./GalleryItem.css");

const GalleryItem = React.createClass({

  PropTypes: {
    video: PropTypes.object,
    selectedVideo: PropTypes.object,
    setSelectedVideo: PropTypes.func
  },

  displayName: "GalleryItem",

  _onClick(e) {
    e.preventDefault();
    const { setSelectedVideo, video } = this.props;
    setSelectedVideo(video);
  },

  render() {
    const { video, selectedVideo } = this.props;
    const active = selectedVideo ? selectedVideo.uri == video.uri : null;
    return dom.div(
      { className: "gallery-item",
      },
      dom.div({
          className: classnames("gallery-item--image", active ? "gallery-item--image--active": null),
          onClick: e => this._onClick(e)
        },
        dom.img({
          src: video.pictures.sizes[3].link,
          width: 320,
          height: 160
        }),
        dom.div({ className: "item-overlay" },
          dom.div({ className: "item-overlay--content"},
            Svg("play")
          ),
        ),
      ),
      dom.h6({},
        dom.a({ href: video.link, target: "_blank", rel: 'noopener noreferrer' }, video.name),
      ),
      dom.p({},
        dom.a({ href: video.user.link, target: "_blank", rel: 'noopener noreferrer'},
          video.user.name
        )
      )
    )
  }
});

module.exports = GalleryItem;