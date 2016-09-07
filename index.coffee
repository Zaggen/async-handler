# Since yortus async/await module, needs to be compiled on the machine
# is going to be used, we pass async to this module, to avoid compatibility
# issues. 
# TODO: Add proper documentation, and refactor maybe?
module.exports = (async, await)->
  makeAsyncHandler = (routeHandler)->
    wrapper = (req, res, next)->
      async(routeHandler)(req, res, next).catch(next)

    wrapper.cacheFor = (ms)->
      wrapper = makeCacheableAsyncWrapper(routeHandler,  ms)
      return wrapper

    return wrapper

  makeCacheableAsyncWrapper = (action, ms)->
    cache = {store: null}
    return makeAsyncHandler((req, res, next)->
      if cache.store?
        return res.send(200, cache.store)
      else
        view = await action(req, res, next)
        _store(cache, view, ms)
    )

  _store = (cache, data, ms)->
    cache.store = data
    setTimeout(=>
      cache.store = null
    , ms)

  return makeAsyncHandler