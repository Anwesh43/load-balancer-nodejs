const ServerInstance = require('./server_instance')
const express = require('express')
const http = require('http')
const RequestUtil = require('./RequestUtil')

class LoadBalancer {

    constructor(app, totalInstances) {
        this.instances = []
        this.initialize(app, totalInstances)
        this.registerEndpoints()
    }

    getFreeServer() {
        const freeInstances = this.instances.filter(instance => instance.busy == false)
        return freeInstances.length > 0 ? freeInstances[0] : null
    }

    registerEndpoints() {
        this.server.use((req, res, next) => {
            if (req.path == "/status") {
                res.json(this.instances)
                next()
                return
            }
            const freeServer = this.getFreeServer()
            console.log(`freeServer is ${freeServer.port}`)
            if (freeServer != null) {
                freeServer.busy = true
                const hostname = 'localhost'
                const port = freeServer.port
                const method = req.method
                const headers = req.headers
                const protocol = 'http:'
                const body = req.body
                const path = req.path
                console.log(`connecting to freeserver at ${freeServer.port}`)
                RequestUtil.createRequest({hostname, port, method, protocol, body, headers, path}).then((data) => {
                    freeServer.busy = false
                    console.log(data)
                    res.send(data)
                    next()
                }).catch((err) => {
                    console.log(`error is ${err}`)
                    freeServer.busy = false
                    res.send(err)
                })
            }
        })
    }

    initialize(app, totalInstances) {
        this.server = express()
        for (var i = 0; i < totalInstances; i++) {
            this.instances.push(new ServerInstance(app, 8080 + (i + 1)))
        }
    }


    start(port) {
        this.instances.forEach((instance) => {
            instance.start()
        })
        this.server.listen(port, () => {
            console.log(`loadbalancer listening on ${port}`)
        })
    }
}
module.exports = LoadBalancer
