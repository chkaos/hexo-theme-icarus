const moment = require("moment");
const crypto = require("crypto");
const { Component, Fragment } = require("inferno");
const Share = require("./share");
const Donates = require("./donates");
const Comment = require("./comment");

/**
 * Get the word count of text.
 */
function getWordCount(content) {
  if (typeof content === "undefined") {
    return 0;
  }
  content = content.replace(/<\/?[a-z][^>]*>/gi, "");
  content = content.trim();
  return content
    ? (content.match(/[\u00ff-\uffff]|[a-zA-Z]+/g) || []).length
    : 0;
}

module.exports = class extends Component {
  render() {
    const { config, helper, page, index } = this.props;
    const { article, plugins } = config;
    const {
      has_thumbnail,
      get_thumbnail,
      url_for,
      date,
      date_xml,
      __,
      _p,
    } = helper;

    const indexLaunguage = config.language || "en";
    const language = page.lang || page.language || config.language || "en";
    const permalink = config.url + config.root + page.path;
    const isArticleDetail = !index;
    const isNotDetail = !index;
    const id = page.abbrlink;
    const md5Id = crypto.createHash("md5").update(id).digest("hex");

    const words = getWordCount(page._content);
    const time = moment.duration((words / 150.0) * 60, "seconds");
    const timeStr = time
      .locale(language)
      .humanize()
      .replace("a few seconds", "fast")
      .replace("hours", "h")
      .replace("minutes", "m")
      .replace("seconds", "s")
      .replace("days", "d");

    const wordsCount = (words / 1000.0).toFixed(1) + "k";

    const pageType = page.type;

    const categories = [];

    page.categories.forEach((category, i) => {
      categories.push(<span>{category.name}</span>);
      if (i < page.categories.length - 1) {
        categories.push(<span>&nbsp;/&nbsp;</span>);
      }
    });

    if (isArticleDetail) {
      return (
        <Fragment>
          {/* Main content */}
          <div class="card">
            {/* Metadata */}
            <article
              class={`card-content article${
                "direction" in page ? " " + page.direction : ""
              }`}
              role="article"
            >
              {/* Title */}
              <h1 class="title is-3 is-size-4-mobile">{page.title}</h1>
              {/* type */}
              <div class={`article-type ${pageType}`}>
                <span>{__("article." + pageType)}</span>
              </div>

              {/* Content/Excerpt */}
              <div
                class="content"
                dangerouslySetInnerHTML={{
                  __html:
                    isNotDetail && page.excerpt ? page.excerpt : page.content,
                }}
              ></div>
              {/*copyright*/}
              {isArticleDetail && page.layout == "post" ? (
                <ul class="article-post-copyright">
                  <li>
                    本文于 {date(page.date)} 发布在 {categories} 分类下，当前已有
                    <span
                      id="busuanzi_container_page_pv"
                      dangerouslySetInnerHTML={{
                        __html:
                          _p(
                            "plugin.visitor",
                            '&nbsp;&nbsp;<span id="busuanzi_value_page_pv">0</span>'
                          ),
                      }}>
                      </span>
                  </li>
                  {page.tags && page.tags.length ? (
                    <li>
                      <strong>相关标签 : </strong>
                      {page.tags.map((tag, i) => {
                        return (
                          <Fragment>
                            <a
                              class="link-muted mr-2"
                              rel="tag"
                              href={url_for(tag.path)}
                            >
                              {tag.name}
                            </a>
                            {/* 最后一个标签不加逗号 */}
                            {i!==page.tags.length-1 ? <span>&sbquo;&nbsp;</span> : null}
                          </Fragment>
                        );
                      })}
                    </li>
                  ) : null}

                  <li>
                    <strong>{__("article.copyright.link")}</strong>
                    <a href={permalink}>{permalink}</a>
                  </li>
                  <li>
                    <strong>{__("article.copyright.copyright_title")}</strong>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: __("article.copyright.copyright_content"),
                      }}
                    ></span>
                  </li>
                </ul>
              ) : null}
              {/*copyright*/}

              {<Share config={config} page={page} helper={helper} />}
            </article>
          </div>
          {/* Donate button */}
          <Donates config={config} helper={helper} />
          {/* Post navigation */}
          {page.prev || page.next ? (
            <nav class="post-navigation mt-4 is-mobile">
              {page.prev ? (
                <div class="article-nav-prev">
                  <a
                    class={`${
                      !page.prev ? " is-hidden-mobile" : ""
                    } link-muted`}
                    href={url_for(page.prev.path)}
                  >
                    <i class="fas fa-chevron-left"></i>
                    <span>{page.prev.title}</span>
                  </a>
                </div>
              ) : <div class="article-nav-prev"></div>}
              {page.next ? (
                <div class="article-nav-next">
                  <a
                    class={`${
                      !page.next ? " is-hidden-mobile" : ""
                    } link-muted`}
                    href={url_for(page.next.path)}
                  >
                    <span>{page.next.title}</span>
                    <i class="fas fa-chevron-right"></i>
                  </a>
                </div>
              ) : <div class="article-nav-next"></div>}
            </nav>
          ) : null}
          {/* Comment */}
          {isArticleDetail ? (
            <Comment config={config} page={page} helper={helper} />
          ) : null}
        </Fragment>
      );
    } else {
      return (
        <div class="article-cover">
          <div class="content">
            <div class="thumb">
              <a href={url_for(page.link || page.path)}>
                <span class={`article-type ${pageType}`}>
                  <span>{__("article." + pageType)}</span>
                </span>
                <img
                  class="thumb-img"
                  src={get_thumbnail(page)}
                  alt={page.title || get_thumbnail(page)}
                />
              </a>
            </div>
            <div class="content-body">
              <h5 class="content-title">
                <a href={url_for(page.link || page.path)} title={page.title}>
                  {page.title}
                </a>
              </h5>
              <p class="description">{page.description}</p>
              <div class="meta">
                <span class="date">
                  <i class="fa fa-clock" />
                  <span>{date(page.date)}</span>
                </span>
                <span class="comments">
                  <span class="display-none-class">{id}</span>
                  <i class="far fa-comment-dots" />
                  &nbsp;
                  <span class="commentCount" id={md5Id}>
                    99+
                  </span>
                </span>
                <span class="likes">
                  <i class="fa fa-redo"></i>
                  <span>{timeStr}</span>
                </span>
                <span class="likes">
                  <i class="fa fa-pencil-alt"></i>
                  <span>{wordsCount}</span>
                </span>
                <span class="categories">
                  <i class="fa fa-th-list" />
                  {categories}
                </span>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
};
