export default class SmartTool {
  static httpBuildQuery(params: { [x: string]: any; hasOwnProperty: (arg0: string) => any }) {
    var queryString = ''

    for (var key in params) {
        if (params.hasOwnProperty(key)) {
            var value = params[key]
            queryString += encodeURIComponent(key) + '=' + encodeURIComponent(value) + '&'
        }
    }

    // 去除最后一个多余的"&"
    queryString = queryString.slice(0, -1)

    return queryString
}
}