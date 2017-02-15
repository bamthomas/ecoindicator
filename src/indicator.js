

export class PageIndicator {
  constructor(dom_parser) {
    this.dom_parser = dom_parser;
    this.nb_http_requests = 0;
    this.nb_dom_elements = 0;
    this.page_size = 0;
  }

  push(error, response, body) {
    if (!error && response.statusCode < 400) {
      let doc = this.dom_parser.parseFromString(body);
      this.nb_dom_elements = doc.getElementsByTagName('*').length;
      this.page_size = body.length;
      this.nb_http_requests = 1;
    }
  }
}