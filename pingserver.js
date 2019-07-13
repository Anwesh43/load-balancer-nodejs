const http = require('http')
console.log("making request")
const req = http.request({hostname : 'localhost', port : 8081, method : 'GET', path : '/ping'}, (res) => {
    var msg = ""
    console.log("getting res")
    res.on('data', (data) => {
        msg = `${msg}${data.toString()}`
    })
    res.on('end', () => {
        console.log(msg)
    })
})
req.end()
