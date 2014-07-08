# Tessel CaaS

Tessel camera as a service is a couple of scripts that expose a feed to the Tessel camera module over a dnode connection.

## Getting started

Plug camera module into port "B".

```sh
cd /path/to/tessel-caas
npm install
cd camera
npm install
cd ..
node server
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
