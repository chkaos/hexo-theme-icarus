const { Component, Fragment } = require('inferno');
const Plugins = require('./plugins');

module.exports = class extends Component {
    render() {
        const { site, config, helper, page } = this.props;
        const { url_for, cdn } = helper;
        const { external_link, article,  url, plugins } = config;
        const language = page.lang || page.language || config.language || 'en';

        let externalLink;
        if (typeof external_link === 'boolean') {
            externalLink = { enable: external_link, exclude: [] };
        } else {
            externalLink = {
                enable: typeof external_link.enable === 'boolean' ? external_link.enable : true,
                exclude: external_link.exclude || []
            };
        }

        let fold = 'unfolded';
        let clipboard = true;
        if (article && article.highlight) {
            if (typeof article.highlight.clipboard !== 'undefined') {
                clipboard = !!article.highlight.clipboard;
            }
            if (typeof article.highlight.fold === 'string') {
                fold = article.highlight.fold;
            }
        }

        const embeddedConfig = `var IcarusThemeSettings = {
            site: {
                url: '${url}',
                external_link: ${JSON.stringify(externalLink)}
            },
            article: {
                highlight: {
                    clipboard: ${clipboard},
                    fold: '${fold}'
                }
            }
        };`;

        return <Fragment>
            <script src={url_for('/js/lazyload.js')}></script>
            <script src={url_for('/js/utils.js')}></script>
            <script src={cdn('jquery', '3.3.1', 'dist/jquery.min.js')}></script>
            <script src={cdn('moment', '2.22.2', 'min/moment-with-locales.min.js')}></script>
            <script dangerouslySetInnerHTML={{ __html: `moment.locale("${language}");` }}></script>
            <script dangerouslySetInnerHTML={{ __html: embeddedConfig }}></script>
            {clipboard ? <script src={cdn('clipboard', '2.0.4', 'dist/clipboard.min.js')} defer={true}></script> : null}
            <Plugins site={site} config={config} page={page} helper={helper} head={false} />
            <script src={url_for('/js/toc.js')} defer={true}></script>
            <script type="text/javascript" src={url_for('/js/theme.js')}></script>
            <script type="text/javascript" src={url_for('/js/egg.js')}></script>
            <script src={url_for('/js/main.js')} defer={true}></script>
            <script src={url_for('/js/music.js')}></script>
            <script src={url_for('/js/copyright.js')}></script>
            {/* instant.page uses just-in-time preloading */}
            <script src={url_for('/js/instant.page.js')} type="module" integrity="sha384-by67kQnR+pyfy8yWP4kPO12fHKRLHZPfEsiSXR8u2IKcTdxD805MGUXBzVPnkLHw"></script>
        </Fragment>;
    }
};
