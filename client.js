var img = document.getElementById("img")
var shoe = require("shoe")
var dnode = require("dnode")

var stream = shoe("/dnode")

var d = dnode()
d.on("remote", function (remote) {
  console.log("Connected to remote")
  remote.feed(function (er, src) {
    console.log("Got new image", src)
    img.src = src
  })
})

d.pipe(stream).pipe(d)
