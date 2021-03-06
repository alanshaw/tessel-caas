# Tessel CaaS

Tessel camera as a service is a couple of scripts that expose a feed to the Tessel camera module over a dnode connection.

![Screenshot](https://raw.github.com/alanshaw/tessel-caas/master/screenshot.png)

## Getting started

Plug camera module into port "B".

```sh
cd /path/to/tessel-caas
npm install
npm run browserify
cd camera
npm install
cd ..
npm start
open http://localhost:5004
```

## How does it work?

`server.js` starts the tessel script `camera.js` and also creates a dnode server. `camera.js` takes pictures with the Tessel camera and sends them as messages back to `server.js`. Connected clients receive dataURL encoded images which you can drop directly into an image `src` attribute.

```
              Image
.-----------. buffer .-----------. dataURL  .---------.
| camera.js |------->| server.js |--------->| Browser |
'-----------'        '-----------' (dnode)  '---------'
```
