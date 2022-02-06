/* eslint-disable no-console */
import PropTypes from 'prop-types';
import { interpolate } from '~enable-a11y/js/modules/interpolate';
import EnableFlyoutHamburger from '~enable-a11y/js/modules/hamburger';
import './style.scss';


class FlyoutMenu {
  constructor(element, props) {
    this.props = props;
    this.element = element;
    this.className = 'flyout-menu';
    this.contentToken = '${html:content}';

    console.log('content', this.props.content);

    element.innerHTML = this.renderContent(this.props.content);

    EnableFlyoutHamburger.init();
  }

  renderContent(templates) {
    const html = [];

    if (templates) {
      templates.forEach((template) => {
        html.push(this.renderTemplate(template));
      });
    }

    return html.join('');
  }

  renderTemplate(template) {
    const { id, props, content } = template;
    const $template = document.getElementById(id);
    let html;

    if ($template) {
      const templateHTML = $template.innerHTML;
      console.log('template', id);
      html = interpolate(templateHTML, props);
      if (html.indexOf(this.contentToken) > -1) {
        const contentHTML = this.renderContent(content);
        if (contentHTML === '') {
          console.log('content: ', content);
        }
        html = html.replace(this.contentToken, contentHTML);
      } else {
        console.log(`no content for template ${id}`);
      }
    } else {
      html = `%${id}%`;
    }

    return html;
  }
}

FlyoutMenu.propTypes = {
  content: PropTypes.arrayOf({
    id: PropTypes.string,
    props: PropTypes.object,
    content: PropTypes.array
  })
};

export default FlyoutMenu;
