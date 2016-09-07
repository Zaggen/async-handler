// Generated by CoffeeScript 1.10.0
(function() {
  module.exports = function(async, await) {
    var _store, makeAsyncHandler, makeCacheableAsyncWrapper;
    makeAsyncHandler = function(routeHandler) {
      var wrapper;
      wrapper = function(req, res, next) {
        return async(routeHandler)(req, res, next)["catch"](next);
      };
      wrapper.cacheFor = function(ms) {
        wrapper = makeCacheableAsyncWrapper(routeHandler, ms);
        return wrapper;
      };
      return wrapper;
    };
    makeCacheableAsyncWrapper = function(action, ms) {
      var cache;
      cache = {
        store: null
      };
      return makeAsyncHandler(function(req, res, next) {
        var view;
        if (cache.store != null) {
          return res.send(200, cache.store);
        } else {
          view = await(action(req, res, next));
          return _store(cache, view, ms);
        }
      });
    };
    _store = function(cache, data, ms) {
      cache.store = data;
      return setTimeout((function(_this) {
        return function() {
          return cache.store = null;
        };
      })(this), ms);
    };
    return makeAsyncHandler;
  };

}).call(this);

//# sourceMappingURL=index.js.map
