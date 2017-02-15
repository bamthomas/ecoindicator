import * as ind from './indicator.js';
import * as _ from 'lodash';
var request = require('request');
import {DOMParser} from 'xmldom';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var indicator = new ind.PageIndicator(new DOMParser({locator:{},errorHandler:{warning:function(w){}}}));

var req = request('https://www.google.fr', cb);

function cb(error, response, body) {
  let links = indicator.push(error, response, body);
  _.map(links, function (link) {
    req.pipe(request(link, cb));
  });
  console.log('Nb DOM elements  : ' + indicator.nb_dom_elements);
  console.log('Nb HTTP requests : ' + indicator.nb_http_requests);
  console.log('Page size (bytes): ' + indicator.page_size);
}