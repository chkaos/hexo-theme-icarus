const { Component } = require("inferno");

module.exports = class MusicContainer extends Component {
  render() {
    const { isPlay } = this.props;

    return (
      <meting-js
          server="netease"
          type="playlist"
          id="2683835425"
          theme="#3273dc"
          loop="all"
          fixed="true"
          mini="true"
          autoplay="true"
          order="list"
          storageName="aplayer-setting"
          list-folded="true"
          lrctype="0"
          list-max-height="300px"
          >
      </meting-js>
    );
  }
}
