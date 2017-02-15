import * as ind from './indicator.js';
var request = require('request');
import {DOMParser} from 'xmldom';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var indicator = new ind.PageIndicator(new DOMParser({locator:{},errorHandler:{warning:function(w){}}}));

request('http://www.google.fr', function(error, response, body) {
  indicator.push(error, response, body);
  console.log('Nb DOM elements  : ' + indicator.nb_dom_elements);
  console.log('Nb HTTP requests : ' + indicator.nb_http_requests);
  console.log('Page size (bytes): ' + indicator.page_size);
});

