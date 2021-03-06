# Since yortus async/await module, needs to be compiled on the machine
# is going to be used, we pass async to this module, to avoid compatibility
# issues. 
# TODO: Add proper documentation, and refactor maybe?
module.exports = (async, await)->
  makeAsyncHandler = (routeHandler)->
    wrapper = (req, res, next)->
      async(routeHandler).call(@, req, res, next).catch(next)

    wrapper.cacheFor = (ms)->
      wrapper = makeCacheableAsyncWrapper(routeHandler,  ms)
      return wrapper

    return wrapper

  makeCacheableAsyncWrapper = (action, ms)->
    cache = {}
    return makeAsyncHandler((req, res, next)->
      key = req.url
      if cache[key]?
        return res.send(200, cache[key])
      else
        view = await action.call(@, req, res, next)
        _store(cache, key,  view, ms)
    )

  _store = (cache, key,  data, ms)->
    cache[key] = data
    setTimeout(=>
      cache[key] = null
    , ms)

  return makeAsyncHandler