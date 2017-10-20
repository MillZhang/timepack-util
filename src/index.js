/**
 * Timepack Util package
 * @author MillZhang
 * @date 2017-10-17 13:58:23
 * @version 1.1.5
 */
class TimepackUtil {
    constructor() {
        console.warn(`如需使用fileUploader方法,请先导入qiniu上传组件;`)
        this.name = "timepack-util";
        this.version = '1.1.5';
        this.constant = {
            DOMAIN: 'https://images.cache.timepack.cn/',
            TEMPLATE_DOMAIN: 'http://template.cache.timepack.cn/',
            THUMB600: '?imageMogr2/thumbnail/600x600'
        }
    }

    /**
     * 获取url中的查询属性的值
     * @param  {String}  param [url查询属性]
     * @return {Object}       [返回字符串或null]
     */
    getQueryByName(param) {
        let reg = new RegExp("(^|&)" + param + "=([^&]*)(&|$)", "i");
        let r = window.location.search.substr(1).match(reg);
        if (null !== r) return unescape(r[2]);
        return null;
    }

    /**
     * 手机号码校验
     * @param  {String}  param [入参字符串]
     * @return {Boolean}       [返回是否]
     */
    isTelephone(param) {
        if (/^1[3|4|5|7|8]\d{9}$/.test(param)) {
            return true;
        }
        return false;
    }

    /**
     * 日期格式化
     * @param  {[Date]} date [传入日期格式]
     * @param  {[String]} fmt  [格式化格式]
     * @return {[String]}      [返回格式成功的字符串]
     */
    dateFormat(date, fmt) {
        let o = {
            "M+": date.getMonth() + 1, //月份
            "d+": date.getDate(), //日
            "h+": date.getHours(), //小时
            "m+": date.getMinutes(), //分
            "s+": date.getSeconds(), //秒
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度
            "S": date.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (let k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }

    /**
     * 数组常用方法
     * @return {[type]} [description]
     */
    array() {
        return {
            /**
             * 根据数组下标删除数组项
             * @param  {[Array]} array [原数组]
             * @param  {[Number]} index [待删除项下标]
             * @return {[Array]}       [新数组]
             */
            remove(array, index) {
                array.remove(array[index]);
                return array;
            }
        }
    }

    /**
     * 字符串操作常用方法
     * @return {[type]} [description]
     */
    string() {
        return {
            trim(str) {
                return str.replace(/^(\s|\xA0)+|(\s|\xA0)+$/g, '');
            },
            isEmpty(str) {
                return (!str || 0 === str.length);
            },
            isNotEmpty(str) {
                return !this.isEmpty(str);
            },
            isBlank(str) {
                return (!str || 0 === this.trim(str).length);
            },
            isNotBlank(str) {
                return !this.isBlank(str);
            }
        }
    }

    /**
     * 浏览器判断
     * @return {[type]} [description]
     */
    browser() {
        return {
            isIE() {
                return /msie/.test(navigator.userAgent.toLowerCase()) || /rv:([\d.]+)\) like gecko/.test(navigator.userAgent.toLowerCase());
            },
            isFirefox() {
                return /firefox/.test(navigator.userAgent.toLowerCase());
            },
            isChrome() {
                return /chrome/.test(navigator.userAgent.toLowerCase());
            },
            isAndroid() {
                let u = navigator.userAgent;
                return u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
            },
            isIOS() {
                let u = navigator.userAgent;
                return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
            },
            isWeixin() {
                let u = navigator.userAgent;
                return u.match(/MicroMessenger/i).toLowerCase() == 'micromessenger';
            }
        }

    }

    /**
     * 七牛组件图片上传
     * @param  {[Object]}   param    [入参]
     * @param  {Function} callback [回调访问]
     * @return {[type]}            [description]
     */
    fileUploader(param, callback) {
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
                    extensions: undefined == param.fileType ? 'jpg,png,jpeg' : param.fileType
                }],
                max_file_size: undefined == param.size ? '4mb' : param.size
            },
            log_level: undefined == param.logLevel ? 1 : param.logLevel,
            init: {
                'FilesAdded': function(up, files) {
                    if (undefined != callback.added) {
                        callback.added(up, files);
                    }
                },
                'BeforeUpload': function(up, file) {},
                'UploadProgress': function(up, file) {
                    if (undefined != callback.progress) {
                        callback.progress(up, file);
                    }
                },
                'UploadComplete': function(up) {
                    up.files = [];
                    if (undefined != callback.complete) {
                        callback.complete();
                    }
                },
                'FileUploaded': function(up, file, info) {
                    let res = $.parseJSON(info);
                    callback.uploaded(encodeURI(res.key));
                },
                'Error': function(up, err, errTip) {
                    if (undefined != callback.error) {
                        callback.error(up, err, errTip);
                    }
                }
            }
        });
    }
}

/**
 * 数组删除
 * @param  {[type]} val [description]
 * @return {[type]}     [description]
 */
Array.prototype.remove = function(val) {
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
Array.prototype.indexOf = function(val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
    }
    return -1;
};

export default new TimepackUtil;