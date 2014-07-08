var http = require("http")
var ecstatic = require("ecstatic")(__dirname + "/static")
var tessel = require("tessel")
var dataurl = require("dataurl")
var dnode = require("dnode")
var shoe = require("shoe")

var script = "/camera/camera.js"

tessel.findTessel(null, true, function(err, client) {
  if (err) throw err
  client.run(__dirname + script, ["tessel", script], {}, function () {
    client.stdout.pipe(process.stdout)
    client.stderr.pipe(process.stderr)

    console.log(__dirname + script, "running")

    // Stop on Ctrl+C.
    process.on("SIGINT", function() {
      setTimeout(function () {
        console.log("Script aborted")
        process.exit(131)
      }, 200)
      client.stop()
    })

    client.once("script-stop", function (code) {
      client.close(function () {
        process.exit(code)
      })
    })

    var server = http.createServer(ecstatic)
    var port = process.env.PORT || 5004

    server.listen(port)

    var sock = shoe(function (stream) {
      var d = dnode({
        feed: function (cb) {
          client.on("message", function (buf) {
            cb(null, dataurl.format({
              data: buf,
              mimetype: "image/jpg"
            }))
          })
        }
      })
      d.pipe(stream).pipe(d)
    })

    sock.install(server, "/dnode")

    console.log("Listening on", port)
  })
})
