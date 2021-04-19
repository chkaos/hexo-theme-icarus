const { Component, Fragment } = require('inferno');
const Paginator = require('hexo-component-inferno/lib/view/misc/paginator');
const Article = require('./common/article');
// const MainRecentPosts = require('./widget/recent_posts_main');

module.exports = class extends Component {
    render() {
        const { config, page, helper, site } = this.props;
        const { __, url_for } = helper;

        return <Fragment>
            {/* <MainRecentPosts.Cacheable site={site} helper={helper}/> */}
            {page.posts.map(post => <Article config={config} page={post} helper={helper} index={true} />)}
            {page.total > 1 ? <Paginator
                current={page.current}
                total={page.total}
                baseUrl={page.base}
                path={config.pagination_dir}
                urlFor={url_for}
                prevTitle={__('common.prev')}
                nextTitle={__('common.next')} /> : null}
        </Fragment>;
    }
};
