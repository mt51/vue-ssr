const { createBundleRenderer } = require('vue-server-renderer')
const fs = require('fs')
const path = require('path')
const isProd = process.env.NODE_ENV === 'production'

const resolve = file => path.resolve(__dirname, file)

function createRenderer (bundle, options) {
  return createBundleRenderer(bundle, Object.assign(options, {
      basedir: resolve('./dist'),
      runInNewContext: false
    }))
}

module.exports = function (app) {
  let renderer
  let readyPromise

  function render (req, res) {
    const s = Date.now()

    res.setHeader("Content-Type", "text/html")

    const handleError = err => {
      if (err.url) {
        res.redirect(err.url)
      } else if(err.code === 404) {
        res.status(404).send('404 | Page Not Found')
      } else {
        // Render Error Page or Redirect
        res.status(500).send('500 | Internal Server Error')
        console.error(`error during render : ${req.url}`)
        console.error(err.stack)
      }
    }

    const context = {
      title: 'Vue SSR', 
      url: req.url
    }
    renderer.renderToString(context, (err, html) => {
      if (err) {
        return handleError(err)
      }
      res.send(html)
      if (!isProd) {
        console.log(`whole request: ${Date.now() - s}ms`)
      }
    })
  }

  const templatePath = resolve('../views/index.html')
  if (isProd) {
    const template = fs.readFileSync(templatePath, 'utf-8')
    const bundle = require('../dist/vue-ssr-server-bundle.json')
    renderer = createRenderer(bundle, {
      template
    })
  } else {
    readyPromise = require('../build/setup-dev-server')(
      app,
      templatePath,
      (bundle, options) => {
        renderer = createRenderer(bundle, options)
      }
    )
  }
  return isProd ? render : (req, res) => {
    readyPromise.then(() => render(req, res))
  }
}