const { Component, Fragment } = require('inferno');
const { cacheComponent } = require('hexo-component-inferno/lib/util/cache');

class Pjax extends Component {
    render() {
        // const { title } = this.props;

        var pjaxJs = `var pjax = new Pjax({
            elements: "a",//代表点击链接就更新
            selectors: [  //代表要更新的节点
                ".section",
                "title"
            ],
            cache: true,
            cacheBust:false
        })

        function loadBusuanzi(){
            $.getScript("//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js", function () {});
        }

        // 开始 PJAX 执行的函数
        document.addEventListener('pjax:send', function () {
        });
        
        // PJAX 完成之后执行的函数，可以和上面的重载放在一起
        document.addEventListener('pjax:complete', function () {
            $(".section").css({opacity:1});
        
            loadMainJs(jQuery, window.moment, window.ClipboardJS, window.IcarusThemeSettings);
            loadBackTop();
            loadBusuanzi();
            lazyLoadImg();
        });`;

        return <Fragment>
            <script src="https://cdn.jsdelivr.net/npm/pjax@0.2.8/pjax.js"></script>
            <script type="text/javascript" dangerouslySetInnerHTML={{ __html: pjaxJs }}></script>
        </Fragment>;

    }
}

Pjax.Cacheable = cacheComponent(Pjax, 'plugin.pjax', props => {
    const { helper, head } = props;
    if (head) {
        return null;
    }
    return {
        title: helper.__('plugin.pjax'),
    };
});

module.exports = Pjax;
