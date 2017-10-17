/**
 * Timepack Util package
 * @author MillZhang
 * @date 2017-10-17 13:58:23
 * @param  
 * @return 
 */
var TimepackUtil = (function(u) {

    u.getQuery(name) {
        let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        let r = window.location.search.substr(1).match(reg);
        if (null !== r) return unescape(r[2]);
        return null;
    }

    return u;

}(TimepackUtil || {}));

export default TimepackUtil;