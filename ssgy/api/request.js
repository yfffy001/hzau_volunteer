export default function(options) {
	var baseUrl = "http://localhost:3000"
	// var baseUrl ="http://www.yemengs.cn"
	return uni.request({
		url: baseUrl + options.url,
		data: options.data || {},
		method: options.method || "GET"
	})
}
