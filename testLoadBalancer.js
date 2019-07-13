const LoadBalancer = require('./lib')
const path = require('path')
const loadBalancer = new LoadBalancer(path.join(__dirname, 'test.js'), 10)
loadBalancer.start(8080)
