var Util = require('../');

describe('index.js', () => {
    it('isTelephone', () => {
        Util.isTelephone(`132`).should.be.false;
    })
})