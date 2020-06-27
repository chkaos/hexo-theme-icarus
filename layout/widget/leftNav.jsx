const { Component, Fragment } = require("inferno");
const { cacheComponent } = require("hexo-component-inferno/lib/util/cache");
const classname = require("hexo-component-inferno/lib/util/classname");

function isSameLink(a, b) {
  function santize(url) {
    let paths = url
      .replace(/(^\w+:|^)\/\//, "")
      .split("#")[0]
      .split("/")
      .filter((p) => p.trim() !== "");
    if (paths.length > 0 && paths[paths.length - 1].trim() === "index.html") {
      paths = paths.slice(0, paths.length - 1);
    }
    return paths.join("/");
  }
  return santize(a) === santize(b);
}

class leftNav extends Component {
  render() {
    const { menu, links } = this.props;

    return (
      <Fragment>
        <div class="card">
          <div class="card-content">
            <div class="left-navbar-menu">
              {Object.keys(menu).length ? (
                <Fragment>
                  {Object.keys(menu).map((name) => {
                    const item = menu[name];
                    return (
                      <a
                        class={classname({
                          "navbar-item": true,
                          "is-active": item.active,
                        })}
                        href={item.url}
                      >
                        {name}
                      </a>
                    );
                  })}
                </Fragment>
              ) : null}
              {Object.keys(links).length ? (
                <Fragment>
                  {Object.keys(links).map((name) => {
                    const link = links[name];
                    return (
                      <a
                        class="navbar-item"
                        target="_blank"
                        rel="noopener"
                        title={name}
                        href={link.url}
                      >
                        {link.icon ? <i class={link.icon}></i> : name}
                      </a>
                    );
                  })}
                </Fragment>
              ) : null}
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

module.exports = cacheComponent(leftNav, "widget.leftNav", (props) => {
  const { helper, widget, page } = props;
  const { url_for } = helper;

  const { menu, links } = widget;

  const afterMenu = {};
  if (menu) {
    const pageUrl = typeof page.path !== "undefined" ? url_for(page.path) : "";
    Object.keys(menu).forEach((name) => {
      const url = url_for(menu[name]);
      const active = isSameLink(url, pageUrl);
      afterMenu[name] = { url, active };
    });
  }

  const afterLinks = {};
  if (links) {
    Object.keys(links).forEach((name) => {
      const link = links[name];
      afterLinks[name] = {
        url: url_for(typeof link === "string" ? link : link.url),
        icon: link.icon,
      };
    });
  }

  return {
    menu: afterMenu,
    links: afterLinks,
  };
});
