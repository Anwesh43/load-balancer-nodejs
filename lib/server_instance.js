const cp = require('child_process')
const MAX_TRIAL = 3
class ServerInstance {

    constructor(app, port) {
        this.port = port
        this.app = app
        this.busy = false
        this.trials = 0
    }

    start() {
        this.trials++
        console.log(this.app)
        cp.exec(`node ${this.app} ${this.port}`, (err, stdout) => {
            if (err != null) {
                console.log(`issue in starting server ${err}`)
                if (this.trails <= MAX_TRIAL) {
                    console.log('trying again')
                    this.port += 10
                    this.start()
                } else {
                    console.log("stopping here")
                }
            } else {
                console.log("no issue")
                console.log(stdout)
            }
        })
    }
}

module.exports = ServerInstance
