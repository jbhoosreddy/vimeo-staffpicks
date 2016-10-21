const React = require("react");
const { DOM: dom, PropTypes, createFactory } = React;
const GalleryItem = createFactory(require('./GalleryItem'));

const SORT_OPTIONS = [ ['default', "Default"], ['date', "Date"], ['duration', "Duration"], ['plays',"Plays"], ['likes', "Likes"] ];

require("./Gallery.css");

const Gallery = React.createClass({

  PropTypes: {
    videos: PropTypes.object,
    selectedVideo: PropTypes.object,
    total: PropTypes.number,
    setSelectedVideo: PropTypes.func,
    getVideos: PropTypes.func
  },

  displayName: "Gallery",

  render() {
    const { videos, selectedVideo, setSelectedVideo, getVideos, total } = this.props;
    return dom.div(
      { className: "gallery" },
      dom.div({},
        dom.h3({}, "Gallery")
      ),
      dom.div({ className: "gallery-main"},
        dom.form({ id: 'sort-form' },
          dom.label({ htmlFor: 'sort-input' }, "Sort by: "),
          dom.div({ className: "styled-select styled-select--slate" },
            dom.select({ id: 'sort-input', defaultValue: 'default', onChange: e => getVideos({ sort: e.target.value }) },
              SORT_OPTIONS.map((option, idx) => dom.option({ key: 'sort-option-'+idx, value: option[0] }, option[1]))
            )
          )
        ),
        dom.br(),
        videos.map((video, idx) => GalleryItem(
          { key: "gallery-item-" + video.uri.replace("/videos/", ""), video, selectedVideo,
            setSelectedVideo
          }))
      ),
    )
  }
});

module.exports = Gallery;