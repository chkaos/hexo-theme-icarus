const { Component } = require("inferno");

module.exports = class MusicContainer extends Component {
  render() {
    const { isPlay } = this.props;

    return (
      // <Fragment>
      //   <meting-js
      //     server="netease"
      //     type="playlist"
      //     id="2683835425"
      //     theme="#2980b9"
      //     loop="all"
      //     fixed="true"
      //     autoplay="true"
      //     order="random"
      //     storageName="aplayer-setting"
      //     lrctype="0"
      //     list-max-height="300px"
      //     >
      // </meting-js>
      //   <div class="header-player">
      //     <div class="panel">
      //       <button class="prev-song btn">
      //         <i class="iconfont icon-music-prev" />
      //       </button>
      //       <button class="toggle-play btn" onclick="togglePlay">
      //         <i
      //           class="iconfont"
      //           className={isPlay ? "icon-music-pause" : "icon-music-play"}
      //         />
      //       </button>
      //       <button class="next-song btn">
      //         <i class="iconfont icon-music-next" />
      //       </button>
      //     </div>
      //     {/* <div class="song">
      //             <nuxt-link
      //                 to="/music"
      //                 class="link"
      //                 :title="
      //                 `${currentSong.name} / ${currentSong.album.name || 'unknow'}`
      //                 "
      //             >
      //                 <span>{{ currentSong.name }}</span>
      //                 <span>By</span>
      //                 <span>{{ currentSong.album.name || 'unknow' }}</span>
      //             </nuxt-link>
      //             </div> */}
      //   </div>
      // </Fragment>
      <meting-js
          server="netease"
          type="playlist"
          id="2683835425"
          theme="#2980b9"
          loop="all"
          fixed="true"
          autoplay="true"
          order="random"
          storageName="aplayer-setting"
          lrctype="0"
          list-max-height="300px"
          >
      </meting-js>
    );
  }
}
