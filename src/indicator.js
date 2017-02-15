import * as _ from 'lodash';

export class PageIndicator {
  constructor(dom_parser) {
    this.dom_parser = dom_parser;
    this.nb_http_requests = 0;
    this.nb_dom_elements = 0;
    this.page_size = 0;
  }

  push(error, response, body) {
    let result = [];
    if (!error && response.statusCode < 400) {
      this.nb_http_requests += 1;
      this.page_size += body.length;
      if (response.headers['content-type'].startsWith('text/html')) {
        let doc = this.dom_parser.parseFromString(body);
        this.nb_dom_elements = doc.getElementsByTagName('*').length;

        let scripts = _.chain(doc.getElementsByTagName('script')).map(function (item) {
          return item.getAttribute('src')
        }).compact().value();
        let links = _.chain(doc.getElementsByTagName('link')).map(function (item) {
          return item.getAttribute('href')
        }).compact().value();
        let images = _.chain(doc.getElementsByTagName('img')).map(function (item) {
          return item.getAttribute('src')
        }).compact().value();

        result = result.concat(scripts).concat(links).concat(images);
      }
      if (response.headers['content-type'].startsWith('text/css')) {
        let re = new RegExp(/url\((.*?)\)/, 'gi');
        let css_urls = [];
        let match;
        while (match = re.exec(body)) {
          let url = _.trim(match[1], '\'"');
          if (url.startsWith('http://') || url.startsWith('https://')) {
            css_urls.push(url);
          }
        }
        result = result.concat(css_urls);
      }
      return result;
    }
  }
}