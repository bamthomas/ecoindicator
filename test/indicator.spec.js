import {expect} from "chai";
import {PageIndicator} from "../src/indicator";

describe('indicator', () => {
  it('should return 0 nb dom elements, nb http requests, and downloaded size when not fetched', () => {
    expect(new PageIndicator().nb_dom_elements).to.equal(0);
    expect(new PageIndicator().nb_http_requests).to.equal(0);
    expect(new PageIndicator().page_size).to.equal(0);
  });
});
