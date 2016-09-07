```
async = require('asyncawait/async')
await = require('asyncawait/await')
asyncHandler = require('async-handler')(async, await)

HomeController =
    index: asyncHandler((req, res) ->
      await newsWidget(req, res)
      await videosWidget(req, res)
      await magazinesWidget(req, res)
      await galleriesWidget(req, res)
      view = await res.renderAsync('homepage')
      res.send(200, view)
      return view
    ).cacheFor(20000)
```