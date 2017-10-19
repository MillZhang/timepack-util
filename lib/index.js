/**
 * Timepack Util package
 * @author MillZhang
 * @date 2017-10-17 13:58:23
 * @version 1.1.0
 */
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _qiniuMoxieJs = require('./qiniu/moxie.js');

var _qiniuMoxieJs2 = _interopRequireDefault(_qiniuMoxieJs);

var _qiniuPluploadFullMinJs = require('./qiniu/plupload.full.min.js');

var _qiniuPluploadFullMinJs2 = _interopRequireDefault(_qiniuPluploadFullMinJs);

var _qiniuQiniuJs = require('./qiniu/qiniu.js');

var _qiniuQiniuJs2 = _interopRequireDefault(_qiniuQiniuJs);

exports['default'] = new ((function () {
    function TimepackUtil() {
        _classCallCheck(this, TimepackUtil);
    }

    /**
     * 获取url中的查询属性的值
     * @param  {String}  param [url查询属性]
     * @return {Object}       [返回字符串或null]
     */

    TimepackUtil.prototype.getQueryByName = function getQueryByName(param) {
        var reg = new RegExp("(^|&)" + param + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (null !== r) return unescape(r[2]);
        return null;
    };

    /**
     * 手机号码校验
     * @param  {String}  param [入参字符串]
     * @return {Boolean}       [返回是否]
     */

    TimepackUtil.prototype.isTelephone = function isTelephone(param) {
        if (/^1[3|4|5|7|8]\d{9}$/.test(param)) {
            return true;
        }
        return false;
    };

    /**
     * 日期格式化
     * @param  {[Date]} date [传入日期格式]
     * @param  {[String]} fmt  [格式化格式]
     * @return {[String]}      [返回格式成功的字符串]
     */

    TimepackUtil.prototype.dateFormat = function dateFormat(date, fmt) {
        var o = {
            "M+": date.getMonth() + 1, //月份
            "d+": date.getDate(), //日
            "h+": date.getHours(), //小时
            "m+": date.getMinutes(), //分
            "s+": date.getSeconds(), //秒
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度
            "S": date.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }return fmt;
    };

    /**
     * 根据数组下标删除数组项
     * @param  {[Array]} array [原数组]
     * @param  {[Number]} index [待删除项下标]
     * @return {[Array]}       [新数组]
     */

    TimepackUtil.prototype.removeArrayItem = function removeArrayItem(array, index) {
        array.remove(array[index]);
        return array;
    };

    /**
     * 七牛组件图片上传
     * @param  {[Object]}   param    [入参]
     * @param  {Function} callback [回调访问]
     * @return {[type]}            [description]
     */

    TimepackUtil.prototype.fileUploader = function fileUploader(param, callback) {
        var exension = "jpg,png,jpeg";
        if (undefined == param.fileType || param.fileType == 'image') {
            //do nothing
        } else if (param.fileType == 'excel') {
                exension = 'xls,xlsx';
            }
        Qiniu.uploader({
            runtimes: 'html5,flash,html4',
            browse_button: param.buttonId,
            uptoken: param.uptoken,
            domain: undefined == param.domain ? this.constant.DOMAIN : param.domain,
            get_new_uptoken: false,
            max_file_size: '100mb', //没有会导致微信端614错误
            max_retries: 3,
            dragdrop: true,
            chunk_size: '10mb',
            auto_start: true,
            unique_names: true,
            save_key: false,
            filters: {
                mime_types: [{
                    title: "Image files",
                    extensions: exension
                }],
                max_file_size: undefined == param.size ? '4mb' : param.size
            },
            log_level: undefined == param.logLevel ? 1 : param.logLevel,
            init: {
                'FilesAdded': function FilesAdded(up, files) {
                    if (undefined != callback.added) {
                        callback.added(up, files);
                    }
                },
                'BeforeUpload': function BeforeUpload(up, file) {},
                'UploadProgress': function UploadProgress(up, file) {
                    if (undefined != callback.progress) {
                        callback.progress(up, file);
                    }
                },
                'UploadComplete': function UploadComplete(up) {
                    up.files = [];
                    if (undefined != callback.complete) {
                        callback.complete();
                    }
                },
                'FileUploaded': function FileUploaded(up, file, info) {
                    var res = $.parseJSON(info);
                    callback.uploaded(encodeURI(res.key));
                },
                'Error': function Error(up, err, errTip) {
                    if (undefined != callback.error) {
                        callback.error(up, err, errTip);
                    }
                }
            }
        });
    };

    return TimepackUtil;
})())();

/**
 * 数组删除
 * @param  {[type]} val [description]
 * @return {[type]}     [description]
 */
Array.prototype.remove = function (val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};

/**
 * 数组下标
 * @param  {[type]} val [description]
 * @return {[type]}     [description]
 */
Array.prototype.indexOf = function (val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
    }
    return -1;
};
module.exports = exports['default'];