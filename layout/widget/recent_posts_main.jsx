const { Component } = require("inferno");
const { cacheComponent } = require("hexo-component-inferno/lib/util/cache");
const ArticleMedia = require("../common/article-media");

// todo 轮播图形式，暂时没接好
class MainRecentPosts extends Component {
  render() {
    const { posts } = this.props;

    return (
      <div class="card widget">
        <div class="card-content">
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

module.exports = cacheComponent(MainRecentPosts, "common.mainrecentposts", (props) => {
  const { site, helper } = props;
  const { url_for, __, date_xml, date } = helper;
  if (!site.posts.length) {
    return null;
  }
  console.log(123, site.posts)
  const posts = site.posts
    .sort("date", -1)
    .filter((item, index, arr) => item.encrypt != true)
    .limit(5)
    .map((post) => ({
      url: url_for(post.link || post.path),
      title: post.title,
      date: date(post.date),
      thumbnail: post.thumbnail,
      dateXml: date_xml(post.date),
    }));
  
  return {
    posts
  };
});
