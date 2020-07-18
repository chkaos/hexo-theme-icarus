const { Component } = require("inferno");
const { cacheComponent } = require("hexo-component-inferno/lib/util/cache");
const ArticleMedia = require("../common/article-media");

class RecentPosts extends Component {
  render() {
    const { title, posts } = this.props;

    return (
      <div class="card widget">
        <div class="card-content">
          <h3 class="menu-label">{title}</h3>
          {posts.map((post) => {
            return (
              <ArticleMedia
                url={post.url}
                title={post.title}
                date={post.date}
                dateXml={post.dateXml}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

module.exports = cacheComponent(RecentPosts, "widget.recentposts", (props) => {
  const { site, helper } = props;
  const { url_for, __, date_xml, date } = helper;
  if (!site.posts.length) {
    return null;
  }
  const posts = site.posts
    .sort("date", -1)
    .filter((item, index, arr) => item.encrypt != true)
    .limit(5)
    .map((post) => ({
      url: url_for(post.link || post.path),
      title: post.title,
      date: date(post.date),
      dateXml: date_xml(post.date),
    }));
  return {
    posts,
    title: __("widget.recents"),
  };
});
