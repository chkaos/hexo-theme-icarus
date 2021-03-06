const moment = require("moment");
const { Component, Fragment } = require("inferno");
const Paginator = require("./misc/paginator");
const ArticleMedia = require("./common/article-media");

module.exports = class extends Component {
  render() {
    const { config, page, helper } = this.props;
    const { url_for, __, date_xml, date } = helper;

    const language = page.lang || page.language || config.language;

    function renderArticleList(posts, year, month = null) {
      const time = moment(
        [page.year, page.month ? page.month - 1 : null].filter(
          (i) => i !== null
        )
      );

      return (
        <div class="card">
          <div class="card-content">
            <h3 class="tag is-primary">
              {month === null
                ? year
                : time.locale(language).format("MMMM YYYY")}
            </h3>
            <div class="timeline">
              {posts.map((post) => {
                return (
                  <ArticleMedia
                    url={url_for(post.link || post.path)}
                    title={post.title}
                    date={date(post.date)}
                    dateXml={date_xml(post.date)}
                  />
                );
              })}
            </div>
          </div>
        </div>
      );
    }

    let articleList;
    if (!page.year) {
      const years = {};
      page.posts.each((p) => {
        years[p.date.year()] = null;
      });
      articleList = Object.keys(years)
        .sort((a, b) => b - a)
        .map((year) => {
          const posts = page.posts.filter(
            (p) => p.date.year() === parseInt(year, 10)
          );
          return renderArticleList(posts, year, null);
        });
    } else {
      articleList = renderArticleList(page.posts, page.year, page.month);
    }

    return (
      <Fragment>
        {articleList}
        {page.total > 1 ? (
          <Paginator
            current={page.current}
            total={page.total}
            baseUrl={page.base}
            path={config.pagination_dir}
            urlFor={url_for}
            prevTitle={__("common.prev")}
            nextTitle={__("common.next")}
          />
        ) : null}
      </Fragment>
    );
  }
};
