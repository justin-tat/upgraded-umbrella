var expect  = require('chai').expect;
const axios = require('axios').default;

it('Basic Test', function(done) {
    axios.get('http://localhost:3000').then(response => {
      expect(response.status).to.equal(200);
      done();
    })
});