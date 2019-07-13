const http = require('http')
class RequestUtil {

    static handleResponse(response) {
        return new Promise((resolve, reject) => {
            var msg = ""
            response.on('data', (data) => {
                msg = `${msg}${data.toString()}`
            })
            response.on('end', (data) => {
                console.log("end of response")
                resolve(msg)
            })
            response.on('error', (err) => {
                reject(err)
            })
        })
    }

    static createRequest(options) {
        return new Promise((resolve, reject) => {
            console.log("creating request")
            console.log(options)
            const req = http.request(options, (response) => {
                RequestUtil.handleResponse(response).then((data) => {
                    console.log("handling response")
                    resolve(data)
                }).catch((err) => {
                    reject(err)
                })
            })
            req.on('error', (err) => {
                reject(err)
            })
            if (options.method == 'POST' || options.method == 'PUT') {
                req.write(JSON.stringify(options))
            }
            req.end()
        })
    }
}

module.exports = RequestUtil
