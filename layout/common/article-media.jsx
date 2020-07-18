const { Component } = require('inferno');

module.exports = class extends Component {
    render() {
        const { url, title, date, dateXml } = this.props;

        return <article class="media">
            <div class="media-content">
                <p><time dateTime={dateXml}>{date}</time></p>
                <p class="title is-6"><a href={url} class="link-muted">{title}</a></p>
            </div>
        </article>;
    }
};
