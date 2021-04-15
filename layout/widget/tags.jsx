/**
 * Tags widget JSX component.
 * @module view/widget/tags
 */

const { Component } = require('inferno');
const { cacheComponent } = require('hexo-component-inferno/lib/util/cache');


/**
 * Tags widget JSX component.
 *
 * @example
 * <Tags
 *     title="Widget title"
 *     showCount={true}
 *     tags={[
 *         {
 *             url: '/path/to/category/page',
 *             name: 'Category name',
 *             count: 1
 *         }
 *     ]} />
 */
class Tags extends Component {
  render() {
    const { tags, title, showCount } = this.props;

    return (
      <div class="card widget" data-type="tags">
        <div class="card-content">
          <div class="menu">
            <h3 class="menu-label">{title}</h3>
            <div class="field is-grouped is-grouped-multiline tag-container">
              {tags.map((tag) => (
                <div class="control">
                  <a class="tags has-addons" href={tag.url}>
                    <span class="tag">{tag.name}</span>
                    {showCount ? <span class="tag">{tag.count}</span> : null}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

/**
 * Cacheable tags widget JSX component.
 * <p>
 * This class is supposed to be used in combination with the <code>locals</code> hexo filter
 * ({@link module:hexo/filter/locals}).
 *
 * @see module:util/cache.cacheComponent
 * @see https://github.com/hexojs/hexo/blob/4.2.0/lib/plugins/helper/list_tags.js
 * @example
 * <Tags.Cacheable
 *     site={{ tags: {...} }}
 *     helper={{
 *         url_for: function() {...},
 *         _p: function() {...}
 *     }}
 *     tags={{...}}
 *     orderBy="name"
 *     order={1}
 *     amount={100}
 *     showCount={true} />
 */
Tags.Cacheable = cacheComponent(Tags, 'widget.tags', (props) => {
  const { helper, orderBy = 'name', order = 1, amount, showCount = true } = props;
  let tags = props.tags || props.site.tags;
  const { url_for, _p } = helper;

  if (!tags || !tags.length) {
    return null;
  }

  tags = tags.sort(orderBy, order).filter((tag) => tag.length);

  if (amount) {
    tags = tags.limit(amount);
  }

  return {
    showCount,
    title: _p('common.tag', Infinity),
    tags: tags.map((tag) => ({
      name: tag.name,
      count: tag.length,
      url: url_for(tag.path),
    })),
  };
});

module.exports = Tags;