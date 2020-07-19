const { Component } = require("inferno");
const { cacheComponent } = require("hexo-component-inferno/lib/util/cache");

class Footer extends Component {
  render() {
    const {
      siteTitle,
      siteYear,
      author,
      websiteStartTime,
      showVisitorCounter,
      visitorCounterTitle,
      footerWebsiteTime
    } = this.props;

    var footerWebsiteTimeTemp = footerWebsiteTime + "";
    var timeArr = footerWebsiteTimeTemp.split("|");

    var timeJs = `function createTime(time) {
      var n = new Date(time);
      now.setTime(now.getTime() + 250),
          days = (now - n) / 1e3 / 60 / 60 / 24,
          dnum = Math.floor(days),
          hours = (now - n) / 1e3 / 60 / 60 - 24 * dnum,
          hnum = Math.floor(hours),
      1 == String(hnum).length && (hnum = "0" + hnum),
          minutes = (now - n) / 1e3 / 60 - 1440 * dnum - 60 * hnum,
          mnum = Math.floor(minutes),
      1 == String(mnum).length && (mnum = "0" + mnum),
          seconds = (now - n) / 1e3 - 86400 * dnum - 3600 * hnum - 60 * mnum,
          snum = Math.round(seconds),
      1 == String(snum).length && (snum = "0" + snum),
          document.getElementById("statistic-times").innerHTML = "${timeArr[0]}"+time.split(" ")[0].replace(/\\//g,".")+"${timeArr[1]}" + dnum + "${timeArr[2]}" + hnum + "${timeArr[3]}" + mnum + "${timeArr[4]}" + snum + "${timeArr[5]}";
  }var now = new Date();setInterval("createTime('${websiteStartTime}')", 250,"");`;

    return (
      <footer class="footer">
        <div class="container">
          <div class="level">
            <p class="size-small">
              <span
                dangerouslySetInnerHTML={{
                  __html: `&copy; ${siteYear} ${author} ${siteTitle}`,
                }}
              ></span>
              <span> | </span>
              <span>
                Powered by{" "}
                <a href="https://hexo.io/" target="_blank" rel="noopener">
                  Hexo
                </a>
                &nbsp;&&nbsp;
                <a
                  href="https://github.com/ppoffice/hexo-theme-icarus"
                  target="_blank"
                  rel="noopener"
                >
                  Icarus
                </a>
              </span>
            </p>
            {websiteStartTime ? (
              <p class="size-small">
                <span id="statistic-times">loading...</span>
                <script dangerouslySetInnerHTML={{ __html: timeJs }}></script>
                <br />
              </p>
            ) : null}
            {showVisitorCounter ? (
              <p class="size-small">
                <span
                  id="busuanzi_container_site_uv"
                  dangerouslySetInnerHTML={{ __html: visitorCounterTitle }}
                ></span>
              </p>
            ) : null}
          </div>
        </div>
      </footer>
    );
  }
}

module.exports = cacheComponent(Footer, "common.footer", (props) => {
  const { config, helper } = props;
  const { url_for, __, _p, date } = helper;
  const {
    logo,
    subtitle,
    author,
    footer,
    plugins,
    website_start_time,
  } = config;

  const links = {};
  if (footer && footer.links) {
    Object.keys(footer.links).forEach((name) => {
      const link = footer.links[name];
      links[name] = {
        url: url_for(typeof link === "string" ? link : link.url),
        icon: link.icon,
      };
    });
  }

  return {
    logo,
    logoUrl: url_for(logo),
    siteUrl: url_for("/"),
    siteTitle: subtitle,
    siteYear: date(new Date(), "YYYY"),
    websiteStartTime: website_start_time,
    author,
    links,
    showVisitorCounter: plugins && plugins.busuanzi === true,
    visitorCounterTitle: _p(
      "plugin.visitor",
      '<span id="busuanzi_value_site_uv">0</span>'
    ),
    footerWebsiteTime: __('footer.website_time')
  };
});
