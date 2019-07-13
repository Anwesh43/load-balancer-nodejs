const app = require('express')()
app.get('/hello', (req, res) => {
    setTimeout(() => {
        res.send("hello world")
    }, 50000)
})
app.get('/ping', (req,res) => {
    console.log("pinging")
    res.send("pong")
})
console.log(`coming here ${process.argv.length}`)
if (process.argv.length == 3) {
    console.log("starting server")
    app.listen(process.argv[2], () => {
        console.log(`listening on ${process.argv[2]}`)
    })
}
