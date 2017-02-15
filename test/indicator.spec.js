import {expect} from "chai";
import * as ind from "../src/indicator";
import {stub} from 'sinon';
import {IncomingMessage} from 'http';
import {DOMParser} from 'xmldom';

describe('indicator', () => {
  it('should return 0 nb dom elements, nb http requests, and downloaded size', () => {
    expect(new ind.PageIndicator().nb_dom_elements).to.equal(0);
    expect(new ind.PageIndicator().nb_http_requests).to.equal(0);
    expect(new ind.PageIndicator().page_size).to.equal(0);
  });

  it('should return nb dom elements, nb http requests, and downloaded size of pushed http.IncomingMessage', () => {
    let page_indicator = new ind.PageIndicator(new DOMParser());

    page_indicator.push(null, new IncomingMessage(), '<html></html>');

    expect(page_indicator.nb_dom_elements).to.equal(1);
    expect(page_indicator.nb_http_requests).to.equal(1);
    expect(page_indicator.page_size).to.equal(13);
  });
});
