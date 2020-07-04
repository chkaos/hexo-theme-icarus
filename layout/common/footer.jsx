const { Component } = require("inferno");
const { cacheComponent } = require("hexo-component-inferno/lib/util/cache");

class Footer extends Component {
  render() {
    const {
      siteTitle,
      siteYear,
      author,
      showVisitorCounter,
      visitorCounterTitle,
    } = this.props;

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
            </p>
            <p class="size-small">
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
            </p>
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
  const { url_for, _p, date } = helper;
  const { logo, subtitle, author, footer, plugins } = config;

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
    author,
    links,
    showVisitorCounter: plugins && plugins.busuanzi === true,
    visitorCounterTitle: _p(
      "plugin.visitor",
      '<span id="busuanzi_value_site_uv">0</span>'
    ),
  };
});
