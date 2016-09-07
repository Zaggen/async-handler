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
      cache = {};
      return makeAsyncHandler(function(req, res, next) {
        var key, view;
        key = req.url;
        if (cache[key] != null) {
          return res.send(200, cache[key]);
        } else {
          view = await(action(req, res, next));
          return _store(cache, key, view, ms);
        }
      });
    };
    _store = function(cache, key, data, ms) {
      cache[key] = data;
      return setTimeout((function(_this) {
        return function() {
          return cache[key] = null;
        };
      })(this), ms);
    };
    return makeAsyncHandler;
  };

}).call(this);

//# sourceMappingURL=index.js.map
