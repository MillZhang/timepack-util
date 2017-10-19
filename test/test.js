const expect = require('chai').expect;

import Util from '../lib/index.js'

describe('timepack-util单元测试', () => {
    it('非法电话号码:abcd123', () => {
        var result = Util.isTelephone('abcd123');
        expect(result).to.be.false;
    });
    it('合法电话号码:15812123201', () => {
        var result = Util.isTelephone('15812123201');
        expect(result).to.be.true;
    });
})