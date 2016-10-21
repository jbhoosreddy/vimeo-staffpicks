const React = require("react");
const { DOM: dom, PropTypes, createFactory } = React;
const Svg = require("./Svg");

const LINK_DETECTION_REGEX = /(([a-z]+:\/\/)?(([a-z0-9\-]+\.)+([a-z]{2}|aero|arpa|biz|com|coop|edu|gov|info|int|jobs|mil|museum|name|nato|net|org|pro|travel|local|internal))(:[0-9]{1,5})?(\/[a-z0-9_\-\.~]+)*(\/([a-z0-9_\-\.]*)(\?[a-z0-9+_\-\.%=&amp;]*)?)?(#[a-zA-Z0-9!$&'()*+.=-_~:@/?]*)?)(\s+|$)/gi
const DESCRIPTION_LENGTH = 2000;

require('./Description.css');

const Description = React.createClass({

  displayName: "Description",

  PropTypes: {
    selectedVideo: PropTypes.object,
  },

  getInitialState() {
    return {
      short: true
    };
  },

  render() {
    const { selectedVideo: video } = this.props;
    const { short } = this.state;
    let isShortened;
    let descriptionNode;
    if(video.description) {
      if(video.description.length > DESCRIPTION_LENGTH) {
        isShortened = true;
      }
      let description = short && isShortened ?
      video.description.substring(0, DESCRIPTION_LENGTH) + "... " :
        video.description;
      // Extract URLs
      description = description.split("\n").map(line => urlify(line));
      const expand = dom.a({ onClick: e => this.setState({ short: !short })}, short ? "Read More" : "Read Less");
      descriptionNode = dom.div({},

        dom.div({ className: "video-description--text" },
          description.map((line, idx) => dom.p({
              key: "video-description--text-line" + idx,
              dangerouslySetInnerHTML: { __html: line}
            }))
        ),
        isShortened ? expand : null
      )

    }
    return dom.div(
      { className: "video-description" },
      video.user.pictures ? dom.div({ className: "video-description--image" },
        dom.img({ src: video.user.pictures.sizes[3].link })
      ) : null,
      dom.div({ className: "video-description--details" },
        dom.h2({ className: "video-name" },
          // rel:noopener added to prevent malicious links access application DOM for security.
          dom.a({ href: video.link, target: "_blank", rel: 'noopener noreferrer' }, video.name)
        ),
        dom.h4({}, "Uploaded by: ",
          dom.a({ href: video.user.link, target: "_blank", rel: 'noopener noreferrer'},
            video.user.name
          ))
      ),
      descriptionNode
    )
  }

});

module.exports = Description;

const urlify = function(text) {
  return text.replace(LINK_DETECTION_REGEX, function(url) {
    return '<a href="' + url + '" target="_blank" rel="noopener noreferrer">' + url + '</a>';
  });
  // or alternatively
  // return text.replace(urlRegex, '<a href="$1">$1</a>')
};
