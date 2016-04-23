var express = require('express')
var path = require('path')
var moment = require('moment')
var app = express()
app.use(express.static(__dirname))
app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'front-page.html'))
})
app.get('/:time', function(req, res){
    if(isNaN(parseInt(req.params.time, 10)) == false){
        var time = parseInt(req.params.time, 10)
        res.send(JSON.parse('{"unix":' + time + ', "natural":"' + moment.unix(time).format("MMMM DD, YYYY") + '"}'))
    } else if(isNaN(Date.parse(req.params.time)) == false ){
        res.send(JSON.parse('{"unix":' + parseInt(Date.parse(req.params.time), 10)/1000 + ', "natural":"' + req.params.time + '"}'))
    } else {
        res.send(JSON.parse('{"unix": null, "natural": null}'))
    }
})
app.listen(8080)