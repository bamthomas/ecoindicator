import './indicator.js';

var indicator = new PageIndicator().fetch('blah');

console.log('Nb DOM elements : ' + indicator.nb_dom_elements);
console.log('Nb HTTP requests: ' + indicator.nb_http_requests);
console.log('Page size       : ' + indicator.page_size);
