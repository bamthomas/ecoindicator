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

    page_indicator.push(null, create_response('text/html'), '<html></html>');

    expect(page_indicator.nb_dom_elements).to.equal(1);
    expect(page_indicator.nb_http_requests).to.equal(1);
    expect(page_indicator.page_size).to.equal(13);
  });

  it('should return JS scripts', () => {
    let page_indicator = new ind.PageIndicator(new DOMParser());

    var result = page_indicator.push(null, create_response(),
      '<html>' +
      '<header>' +
      '<script src="myscript1"></script>' +
      '<script src="myscript2"></script>' +
      '</header>' +
      '</html>');

    expect(result).to.have.all.members(['myscript1', 'myscript2']);
  });

  it('should not return inline JS scripts', () => {
    let page_indicator = new ind.PageIndicator(new DOMParser());

    var result = page_indicator.push(null, create_response(),'<html><script></script></html>');

    expect(result).to.have.all.members([]);
  });

  it('should return links', () => {
    let page_indicator = new ind.PageIndicator(new DOMParser());

    var result = page_indicator.push(null, create_response(),
      '<html>' +
      '<header>' +
      '<link rel="icon" type="image/png" href="myimage" />' +
      '<link rel="stylesheet" type="text/css" href="mycss" />' +
      '</header>' +
      '</html>');

    expect(result).to.have.all.members(['myimage', 'mycss']);
  });

  it('should not return empty href link', () => {
    let page_indicator = new ind.PageIndicator(new DOMParser());

    var result = page_indicator.push(null, create_response(),'<html><header><link /></header></html>');

    expect(result).to.have.all.members([]);
  });

  it('should return images', () => {
    let page_indicator = new ind.PageIndicator(new DOMParser());

    var result = page_indicator.push(null, create_response(),
      '<html>' +
      '<body>' +
      '<img src="myimage" />' +
      '</body>' +
      '</html>');

    expect(result).to.have.all.members(['myimage']);
  });

  it('should not return empty src images', () => {
    let page_indicator = new ind.PageIndicator(new DOMParser());

    var result = page_indicator.push(null, create_response(),'<html><img/></html>');

    expect(result).to.have.all.members([]);
  });

  it('should return url starting with http/https from CSS', function () {
    let page_indicator = new ind.PageIndicator(new DOMParser());

    var result = page_indicator.push(null, create_response('text/css'),
      '@import url("http://myfont1");background-image: url(https://image.png);background-image: url(pouet);');

    expect(result).to.have.all.members(['http://myfont1', 'https://image.png']);
  });

  it('should add page links', () => {
    let page_indicator = new ind.PageIndicator(new DOMParser());
    page_indicator.push(null, create_response('text/html'), '<html><body></body></html>');
    page_indicator.push(null, create_response('text/css'), 'my css');
    page_indicator.push(null, create_response('image/png'), 'imagebinary');

    expect(page_indicator.nb_dom_elements).to.equal(2);
    expect(page_indicator.nb_http_requests).to.equal(3);
    expect(page_indicator.page_size).to.equal(43);
  });
});

function create_response(content_type = 'text/html; charset=UTF-8') {
  let response = new IncomingMessage();
  response.headers = {'content-type': content_type};
  return response;
}
