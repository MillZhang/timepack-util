# timepack-util

## How to install?

`npm install timepack-util`

## How to Use?

```
import Util from 'timepack-util'
```

## API List


method | return | description
---|---|---
getQueryByName(str) | String or Null | get url query-value by query-key
isTelephone(str) |  Boolean | judge string is telephone or not
dateFormat(date,fmt) | String | format date
removeArrayItem(array,index) | String | remove item from an array
browser.isIE()|Boolean| judge current browser is ie or not
browser.isFirefox()|Boolean| judge current browser is firefox or not
browser.isChrome()|Boolean| judge current browser is chrome or not
browser.isAndroid()|Boolean| judge current browser is android or not
browser.isIOS()|Boolean| judge current browser is ios or not
browser.isWeixin()|Boolean| judge current browser is wechat or not
string.trim(str)|String| trim string
string.isEmpty(str)|String| judge the input string is empty
string.isNotEmpty(str)|String| judge the input string is not empty
string.isBlank(str)|String| judge the  input string is blank
string.isNotBlank(str)|String| judge the input string is blank
fileUploader(param,callback)| No Return| upload a file to server through qiniu


#### `fileUploader` method statement

param | default|required
---|---|---|--
fileType | image|false
buttonId | null | true
uptoken  | null | true
domain   | https://images.cache.timepack.cn/|true
size     | 4mb  |false



callback | header 2
---|---
added | row 1 col 2
progress | row 2 col 2
complete|
uploaded|
error|

