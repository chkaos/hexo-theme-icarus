const { Component } = require("inferno");

module.exports = class MusicContainer extends Component {
  render() {
    const { isPlay } = this.props;

    return (
      <meting-js
          server="netease"
          type="playlist"
          id="2683835425"
          theme="#2980b9"
          loop="all"
          fixed="true"
          autoplay="false"
          order="random"
          storageName="aplayer-setting"
          lrctype="0"
          list-max-height="300px"
          >
      </meting-js>
    );
  }
}
