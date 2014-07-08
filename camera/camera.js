var tessel = require("tessel")
var camera = require("camera-vc0706").use(tessel.port["B"])

function take (cb) {
  camera.takePicture(function(er, image) {
    if (er) {
      console.log("error taking image", er)
    } else {
      console.log("picture taken")
      process.send(image)
    }
    cb(er)
  })
}

function startTake () {
  setTimeout(function () {
    take(startTake)
  }, 0)
}

camera.on("ready", function () {
  startTake()
})

camera.on("error", function (er) {
  console.error(er)
})
