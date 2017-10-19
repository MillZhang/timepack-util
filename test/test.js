const expect = require('chai').expect;

import Util from '../lib/index.js'

describe('timepack-util:单元测试', () => {
    it('非法电话号码:abcd123', () => {
        var result = Util.isTelephone('abcd123');
        expect(result).to.be.false;
    });
    it('合法电话号码:15812123201', () => {
        var result = Util.isTelephone('15812123201');
        expect(result).to.be.true;
    });
});

describe('timepack-util:字符串测试', () => {
    it('判断字符串是否为空', () => {
        var result = Util.string().isEmpty('2222');
        expect(result).to.be.false;
    });
});

describe('timepack-util:数组测试', () => {
    it('从数组中删除指定下标项', () => {
        let arr = [1, 2, 3, 4, 5, "a"];
        var result = Util.array().remove(arr, 5);
    });
});