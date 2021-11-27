/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 236:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* module decorator */ module = __webpack_require__.nmd(module);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var runtime = function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.

  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }

  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function define(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []); // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.

    generator._invoke = makeInvokeMethod(innerFn, self, context);
    return generator;
  }

  exports.wrap = wrap; // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.

  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed"; // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.

  var ContinueSentinel = {}; // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.

  function Generator() {}

  function GeneratorFunction() {}

  function GeneratorFunctionPrototype() {} // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.


  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });
  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));

  if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = GeneratorFunctionPrototype;
  define(Gp, "constructor", GeneratorFunctionPrototype);
  define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
  GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"); // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.

  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function (genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor ? ctor === GeneratorFunction || // For the native GeneratorFunction constructor, the best we can
    // do is to check its .name property.
    (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
  };

  exports.mark = function (genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }

    genFun.prototype = Object.create(Gp);
    return genFun;
  }; // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.


  exports.awrap = function (arg) {
    return {
      __await: arg
    };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);

      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;

        if (value && _typeof(value) === "object" && hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function (value) {
            invoke("next", value, resolve, reject);
          }, function (err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function (unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function (error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function (resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise = // If enqueue has been called before, then we want to wait until
      // all previous Promises have been resolved before calling invoke,
      // so that results are always delivered in the correct order. If
      // enqueue has not been called before, then it is important to
      // call invoke immediately, without waiting on a callback to fire,
      // so that the async generator function has the opportunity to do
      // any necessary setup in a predictable way. This predictability
      // is why the Promise constructor synchronously invokes its
      // executor callback, and why async functions synchronously
      // execute code before the first await. Since we implement simple
      // async functions in terms of async generators, it is especially
      // important to get this right, even though it requires care.
      previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, // Avoid propagating failures to Promises returned by later
      // invocations of the iterator.
      callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
    } // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).


    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  });
  exports.AsyncIterator = AsyncIterator; // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.

  exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
    : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;
    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        } // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume


        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;

        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);

          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;
        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);
        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;
        var record = tryCatch(innerFn, self, context);

        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done ? GenStateCompleted : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };
        } else if (record.type === "throw") {
          state = GenStateCompleted; // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.

          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  } // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.


  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];

    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError("The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (!info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value; // Resume execution at the desired location (see delegateYield).

      context.next = delegate.nextLoc; // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.

      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }
    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    } // The delegate iterator is finished, so forget it and continue with
    // the outer generator.


    context.delegate = null;
    return ContinueSentinel;
  } // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.


  defineIteratorMethods(Gp);
  define(Gp, toStringTagSymbol, "Generator"); // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.

  define(Gp, iteratorSymbol, function () {
    return this;
  });
  define(Gp, "toString", function () {
    return "[object Generator]";
  });

  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{
      tryLoc: "root"
    }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function (object) {
    var keys = [];

    for (var key in object) {
      keys.push(key);
    }

    keys.reverse(); // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.

    return function next() {
      while (keys.length) {
        var key = keys.pop();

        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      } // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.


      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];

      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1,
            next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;
          return next;
        };

        return next.next = next;
      }
    } // Return an iterator with no values.


    return {
      next: doneResult
    };
  }

  exports.values = values;

  function doneResult() {
    return {
      value: undefined,
      done: true
    };
  }

  Context.prototype = {
    constructor: Context,
    reset: function reset(skipTempReset) {
      this.prev = 0;
      this.next = 0; // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.

      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;
      this.method = "next";
      this.arg = undefined;
      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },
    stop: function stop() {
      this.done = true;
      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;

      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },
    dispatchException: function dispatchException(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;

      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !!caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }
          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }
          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },
    abrupt: function abrupt(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },
    complete: function complete(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" || record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },
    finish: function finish(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },
    "catch": function _catch(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;

          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }

          return thrown;
        }
      } // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.


      throw new Error("illegal catch attempt");
    },
    delegateYield: function delegateYield(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  }; // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.

  return exports;
}( // If this script is executing as a CommonJS module, use module.exports
// as the regeneratorRuntime namespace. Otherwise create a new empty
// object. Either way, the resulting object will be used to initialize
// the regeneratorRuntime variable at the top of this file.
( false ? 0 : _typeof(module)) === "object" ? module.exports : {});

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, in modern engines
  // we can explicitly access globalThis. In older engines we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  if ((typeof globalThis === "undefined" ? "undefined" : _typeof(globalThis)) === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";

// EXTERNAL MODULE: ./node_modules/regenerator-runtime/runtime.js
var runtime = __webpack_require__(236);
;// CONCATENATED MODULE: ./src/js/BgImg.js
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var BgImg = /*#__PURE__*/function () {
  function BgImg(_ref) {
    var $target = _ref.$target;

    _classCallCheck(this, BgImg);

    _defineProperty(this, "imgNumber", 0);

    this.$target = $target;
    this.setState();
  }

  _createClass(BgImg, [{
    key: "getRandom",
    value: function getRandom() {
      return Math.floor(Math.random() * BgImg._IMG_NUM) + 1;
    }
  }, {
    key: "setState",
    value: function setState() {
      this.imgNumber = this.getRandom();
      this.render();
    }
  }, {
    key: "render",
    value: function render() {
      var imgNumber = this.imgNumber,
          $target = this.$target;
      var img = new Image();
      img.src = "./assets/images/".concat(imgNumber, ".jpg");
      $target.setAttribute("style", "background-image: url(".concat(img.src, ")"));
    }
  }]);

  return BgImg;
}();

_defineProperty(BgImg, "_IMG_NUM", 11);

/* harmony default export */ const js_BgImg = (BgImg);
;// CONCATENATED MODULE: ./src/js/constants.js
var DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
var USER_NAME = "userName";
var PENDING = "pending";
var FINISHED = "finished";
var DEL = "del";
var CHECK = "check";
var BACK = "back";
var BTN = "btn";
var COORDS = "coords";
;// CONCATENATED MODULE: ./src/js/Clock.js
function Clock_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Clock_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Clock_createClass(Constructor, protoProps, staticProps) { if (protoProps) Clock_defineProperties(Constructor.prototype, protoProps); if (staticProps) Clock_defineProperties(Constructor, staticProps); return Constructor; }

function Clock_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var Clock = /*#__PURE__*/function () {
  function Clock(_ref) {
    var $target = _ref.$target;

    Clock_classCallCheck(this, Clock);

    Clock_defineProperty(this, "$clockWrap", null);

    Clock_defineProperty(this, "nowDate", {
      seconds: null,
      minutes: null,
      hours: null,
      day: null,
      date: null,
      month: null
    });

    this.$clockWrap = document.createElement("article");
    this.$clockWrap.className = "clockWrap";
    $target.appendChild(this.$clockWrap);
    this.getTime = this.getTime.bind(this);
    this.getTime();
    setInterval(this.getTime, 1000);
  }

  Clock_createClass(Clock, [{
    key: "getTime",
    value: function getTime() {
      var nowDate = new Date(),
          seconds = nowDate.getSeconds(),
          minutes = nowDate.getMinutes(),
          hours = nowDate.getHours(),
          day = nowDate.getDay(),
          date = nowDate.getDate(),
          month = nowDate.getMonth() + 1;
      this.setState({
        seconds: seconds,
        minutes: minutes,
        hours: hours,
        day: day,
        date: date,
        month: month
      });
    }
  }, {
    key: "setState",
    value: function setState(nowDateObj) {
      this.nowDate = nowDateObj;
      this.render();
    }
  }, {
    key: "render",
    value: function render() {
      var _this$nowDate = this.nowDate,
          seconds = _this$nowDate.seconds,
          minutes = _this$nowDate.minutes,
          hours = _this$nowDate.hours,
          day = _this$nowDate.day,
          date = _this$nowDate.date,
          month = _this$nowDate.month,
          $clockWrap = this.$clockWrap;
      $clockWrap.innerHTML = "\n        <p class=\"dateText\">\n            ".concat(month < 10 ? "0".concat(month) : month, " /\n            ").concat(date < 10 ? "0".concat(date) : date, " ").concat(DAYS[day], "\n        </p>\n        <p class=\"timeText\">\n            ").concat(hours < 10 ? "0".concat(hours) : hours, " :\n            ").concat(minutes < 10 ? "0".concat(minutes) : minutes, " :\n            ").concat(seconds < 10 ? "0".concat(seconds) : seconds, "\n        </p>\n      ");
    }
  }]);

  return Clock;
}();

/* harmony default export */ const js_Clock = (Clock);
;// CONCATENATED MODULE: ./src/js/TasksList.js
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function TasksList_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function TasksList_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function TasksList_createClass(Constructor, protoProps, staticProps) { if (protoProps) TasksList_defineProperties(Constructor.prototype, protoProps); if (staticProps) TasksList_defineProperties(Constructor, staticProps); return Constructor; }

function TasksList_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var TasksList = /*#__PURE__*/function () {
  function TasksList(_ref) {
    var $target = _ref.$target,
        title = _ref.title;

    TasksList_classCallCheck(this, TasksList);

    TasksList_defineProperty(this, "_tasks", []);

    TasksList_defineProperty(this, "title", null);

    TasksList_defineProperty(this, "$wrap", null);

    this.title = title;
    this.$wrap = document.createElement("article");
    $target.appendChild(this.$wrap);
    this.handleBtn = this.handleBtn.bind(this);
    this.getTasks();
  }

  TasksList_createClass(TasksList, [{
    key: "saveTasks",
    value: function saveTasks() {
      localStorage.setItem(this.title, JSON.stringify(this._tasks));
    }
  }, {
    key: "getTasks",
    value: function getTasks() {
      this.setState(JSON.parse(localStorage.getItem(this.title)) || []);
    }
  }, {
    key: "addTask",
    value: function addTask(newTaskObj) {
      this.setState([].concat(_toConsumableArray(this._tasks), [newTaskObj]));
    }
  }, {
    key: "deleteTask",
    value: function deleteTask(delTaskId) {
      this.setState(this._tasks.filter(function (task) {
        return task.id !== delTaskId;
      }));
    }
  }, {
    key: "handleBtn",
    value: function handleBtn(e) {
      var $target = e.target;
      var classList = $target.classList;
      var isBtn = classList.contains(BTN);
      if (!isBtn) return;
      var $targetLi = $target.parentNode;
      var id = $targetLi.id;

      if (classList.contains(DEL)) {
        this.deleteTask(id);
      }
    }
  }, {
    key: "setState",
    value: function setState(tasks) {
      this._tasks = tasks;
      this.saveTasks();
      this.render();
    }
  }, {
    key: "render",
    value: function render() {
      var $wrap = this.$wrap,
          _tasks = this._tasks,
          handleBtn = this.handleBtn,
          title = this.title;
      $wrap.innerHTML = "\n      <h4>".concat(title[0].toUpperCase() + title.slice(1), "</h4>\n      <ul class=\"").concat(title, "\">\n        ").concat(_tasks.map(function (task) {
        return "<li id=".concat(task.id, ">").concat(task.text, "<button class=\"").concat(DEL, " ").concat(BTN, "\">\u274C</button></li>");
      }).join(""), "\n      </ul>\n    ");
      _tasks.length && $wrap.querySelector("ul").addEventListener("click", handleBtn);
    }
  }]);

  return TasksList;
}();

/* harmony default export */ const js_TasksList = (TasksList);
;// CONCATENATED MODULE: ./src/js/Finished.js
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function Finished_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Finished_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Finished_createClass(Constructor, protoProps, staticProps) { if (protoProps) Finished_defineProperties(Constructor.prototype, protoProps); if (staticProps) Finished_defineProperties(Constructor, staticProps); return Constructor; }

function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }




var Finished = /*#__PURE__*/function (_TasksList) {
  _inherits(Finished, _TasksList);

  var _super = _createSuper(Finished);

  function Finished(_ref) {
    var _this;

    var $target = _ref.$target,
        handleBack = _ref.handleBack,
        title = _ref.title;

    Finished_classCallCheck(this, Finished);

    _this = _super.call(this, {
      $target: $target,
      title: title
    });
    _this.handleBack = handleBack;
    return _this;
  }

  Finished_createClass(Finished, [{
    key: "handleBtn",
    value: function handleBtn(e) {
      _get(_getPrototypeOf(Finished.prototype), "handleBtn", this).call(this, e);

      var $target = e.target;
      var classList = $target.classList;
      var $targetLi = $target.parentNode;
      var id = $targetLi.id;

      if (classList.contains(BACK)) {
        var backTask = this._tasks.find(function (task) {
          return task.id === id;
        });

        this.deleteTask(id);
        this.handleBack(backTask);
      }
    }
  }, {
    key: "render",
    value: function render() {
      _get(_getPrototypeOf(Finished.prototype), "render", this).call(this);

      var $wrap = this.$wrap;
      $wrap.querySelectorAll("li").forEach(function (li) {
        var backBtn = document.createElement("button");
        backBtn.className = "".concat(BACK, " ").concat(BTN);
        backBtn.innerText = "↩️";
        li.append(backBtn);
      });
    }
  }]);

  return Finished;
}(js_TasksList);

/* harmony default export */ const js_Finished = (Finished);
;// CONCATENATED MODULE: ./src/js/Pending.js
function Pending_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Pending_typeof = function _typeof(obj) { return typeof obj; }; } else { Pending_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Pending_typeof(obj); }

function Pending_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Pending_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Pending_createClass(Constructor, protoProps, staticProps) { if (protoProps) Pending_defineProperties(Constructor.prototype, protoProps); if (staticProps) Pending_defineProperties(Constructor, staticProps); return Constructor; }

function Pending_get() { if (typeof Reflect !== "undefined" && Reflect.get) { Pending_get = Reflect.get; } else { Pending_get = function _get(target, property, receiver) { var base = Pending_superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return Pending_get.apply(this, arguments); }

function Pending_superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = Pending_getPrototypeOf(object); if (object === null) break; } return object; }

function Pending_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) Pending_setPrototypeOf(subClass, superClass); }

function Pending_setPrototypeOf(o, p) { Pending_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return Pending_setPrototypeOf(o, p); }

function Pending_createSuper(Derived) { var hasNativeReflectConstruct = Pending_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = Pending_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = Pending_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return Pending_possibleConstructorReturn(this, result); }; }

function Pending_possibleConstructorReturn(self, call) { if (call && (Pending_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return Pending_assertThisInitialized(self); }

function Pending_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function Pending_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function Pending_getPrototypeOf(o) { Pending_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return Pending_getPrototypeOf(o); }




var Pending = /*#__PURE__*/function (_TasksList) {
  Pending_inherits(Pending, _TasksList);

  var _super = Pending_createSuper(Pending);

  function Pending(_ref) {
    var _this;

    var $target = _ref.$target,
        handleCheck = _ref.handleCheck,
        title = _ref.title;

    Pending_classCallCheck(this, Pending);

    _this = _super.call(this, {
      $target: $target,
      title: title
    });
    _this.handleCheck = handleCheck;
    return _this;
  }

  Pending_createClass(Pending, [{
    key: "handleBtn",
    value: function handleBtn(e) {
      Pending_get(Pending_getPrototypeOf(Pending.prototype), "handleBtn", this).call(this, e);

      var $target = e.target;
      var classList = $target.classList;
      var $targetLi = $target.parentNode;
      var id = $targetLi.id;

      if (classList.contains(CHECK)) {
        var checkTask = this._tasks.find(function (task) {
          return task.id === id;
        });

        this.deleteTask(id);
        this.handleCheck(checkTask);
      }
    }
  }, {
    key: "render",
    value: function render() {
      Pending_get(Pending_getPrototypeOf(Pending.prototype), "render", this).call(this);

      var $wrap = this.$wrap;
      $wrap.querySelectorAll("li").forEach(function (li) {
        var checkBtn = document.createElement("button");
        checkBtn.className = "".concat(CHECK, " ").concat(BTN);
        checkBtn.innerText = "✅";
        li.append(checkBtn);
      });
    }
  }]);

  return Pending;
}(js_TasksList);

/* harmony default export */ const js_Pending = (Pending);
;// CONCATENATED MODULE: ./src/js/TaskForm.js
function TaskForm_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function TaskForm_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function TaskForm_createClass(Constructor, protoProps, staticProps) { if (protoProps) TaskForm_defineProperties(Constructor.prototype, protoProps); if (staticProps) TaskForm_defineProperties(Constructor, staticProps); return Constructor; }

function TaskForm_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TaskForm = /*#__PURE__*/function () {
  function TaskForm(_ref) {
    var $target = _ref.$target,
        handleNewTask = _ref.handleNewTask;

    TaskForm_classCallCheck(this, TaskForm);

    TaskForm_defineProperty(this, "handleNewTask", null);

    TaskForm_defineProperty(this, "$form", null);

    this.handleNewTask = handleNewTask;
    this.$form = document.createElement("form");
    $target.appendChild(this.$form);
    this.onSubmit = this.onSubmit.bind(this);
    this.$form.addEventListener("submit", this.onSubmit);
    this.render();
  }

  TaskForm_createClass(TaskForm, [{
    key: "onSubmit",
    value: function onSubmit(e) {
      e.preventDefault();
      var $input = e.target.taskForm;
      var value = $input.value;
      if (!value) return;
      $input.value = "";
      this.handleNewTask(value);
    }
  }, {
    key: "render",
    value: function render() {
      var $form = this.$form;
      $form.innerHTML = "\n      <input type=\"text\" placeholder=\"Write a to do\" id=\"taskForm\" required/>\n    ";
    }
  }]);

  return TaskForm;
}();

/* harmony default export */ const js_TaskForm = (TaskForm);
;// CONCATENATED MODULE: ./src/js/TasksContainer.js
function TasksContainer_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }






var TasksContainer = function TasksContainer(_ref) {
  var _this = this;

  var $target = _ref.$target;

  TasksContainer_classCallCheck(this, TasksContainer);

  this.$listWrap = document.createElement("section");
  this.$listWrap.className = "listWrap cf";
  this.taskForm = new js_TaskForm({
    $target: this.$listWrap,
    handleNewTask: function handleNewTask(text) {
      var taskObj = {
        id: String(Date.now()),
        text: text
      };

      _this.pending.addTask(taskObj);
    }
  });
  this.pending = new js_Pending({
    $target: this.$listWrap,
    handleCheck: function handleCheck(taskObj) {
      return _this.finished.addTask(taskObj);
    },
    title: PENDING
  });
  this.finished = new js_Finished({
    $target: this.$listWrap,
    handleBack: function handleBack(taskObj) {
      return _this.pending.addTask(taskObj);
    },
    title: FINISHED
  });
  $target.appendChild(this.$listWrap);
};

/* harmony default export */ const js_TasksContainer = (TasksContainer);
;// CONCATENATED MODULE: ./src/js/userName.js
function userName_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function userName_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function userName_createClass(Constructor, protoProps, staticProps) { if (protoProps) userName_defineProperties(Constructor.prototype, protoProps); if (staticProps) userName_defineProperties(Constructor, staticProps); return Constructor; }

function userName_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var UserName = /*#__PURE__*/function () {
  function UserName(_ref) {
    var $target = _ref.$target;

    userName_classCallCheck(this, UserName);

    userName_defineProperty(this, "userName", null);

    userName_defineProperty(this, "$userWrap", null);

    this.$userWrap = document.createElement("div");
    $target.appendChild(this.$userWrap);
    this.onSubmit = this.onSubmit.bind(this);
    this.getUser();
  }

  userName_createClass(UserName, [{
    key: "setUser",
    value: function setUser() {
      var userName = this.userName;
      localStorage.setItem(USER_NAME, JSON.stringify(userName));
    }
  }, {
    key: "getUser",
    value: function getUser() {
      var name = JSON.parse(localStorage.getItem(USER_NAME));
      this.setState(name);
    }
  }, {
    key: "onSubmit",
    value: function onSubmit(e) {
      e.preventDefault();
      var $nameInput = e.target.name;
      var value = $nameInput.value;
      if (!value) return;
      $nameInput.value = "";
      this.setState(value);
    }
  }, {
    key: "setState",
    value: function setState(name) {
      this.userName = name;
      this.setUser();
      this.render();
    }
  }, {
    key: "render",
    value: function render() {
      var userName = this.userName,
          $userWrap = this.$userWrap,
          onSubmit = this.onSubmit;

      if (userName) {
        $userWrap.innerHTML = "<p>Hello ".concat(userName, "</p>");
      } else {
        $userWrap.innerHTML = "\n        <form action=\"#\" class=\"nameForm\">\n            <input type=\"text\" placeholder=\"Hello Stranger\" id=\"name\" />\n        </form>\n        ";
        $userWrap.querySelector("form").addEventListener("submit", onSubmit);
      }
    }
  }]);

  return UserName;
}();

/* harmony default export */ const userName = (UserName);
;// CONCATENATED MODULE: ./src/js/weather.js
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function weather_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function weather_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function weather_createClass(Constructor, protoProps, staticProps) { if (protoProps) weather_defineProperties(Constructor.prototype, protoProps); if (staticProps) weather_defineProperties(Constructor, staticProps); return Constructor; }

function weather_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var Weather = /*#__PURE__*/function () {
  function Weather(_ref) {
    var $target = _ref.$target;

    weather_classCallCheck(this, Weather);

    weather_defineProperty(this, "$weather", null);

    this.$weather = document.createElement("span");
    this.$weather.className = "weather";
    this.handleGeoSucces = this.handleGeoSucces.bind(this);
    this.handleGeoError = this.handleGeoError.bind(this);
    $target.appendChild(this.$weather);
    this.loadCoords();
  }

  weather_createClass(Weather, [{
    key: "getWeather",
    value: function () {
      var _getWeather = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _this$coordsObj, lat, lng, response, _yield$response$json, place, temp, weather, sky;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this$coordsObj = this.coordsObj, lat = _this$coordsObj.latitude, lng = _this$coordsObj.longitude;
                _context.next = 3;
                return fetch("https://api.openweathermap.org/data/2.5/weather?lat=".concat(lat, "&lon=").concat(lng, "&appid=").concat("8fe1baf3aef0a2073f16346b8f874d78", "&units=metric"));

              case 3:
                response = _context.sent;
                _context.next = 6;
                return response.json();

              case 6:
                _yield$response$json = _context.sent;
                place = _yield$response$json.name;
                temp = _yield$response$json.main.temp;
                weather = _yield$response$json.weather;
                sky = weather[0].main;
                this.render({
                  place: place,
                  sky: sky,
                  temp: temp
                });

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getWeather() {
        return _getWeather.apply(this, arguments);
      }

      return getWeather;
    }()
  }, {
    key: "handleGeoSucces",
    value: function handleGeoSucces(position) {
      var _position$coords = position.coords,
          latitude = _position$coords.latitude,
          longitude = _position$coords.longitude;
      this.setState({
        latitude: latitude,
        longitude: longitude
      });
    }
  }, {
    key: "handleGeoError",
    value: function handleGeoError() {
      console.log("sorry error");
    }
  }, {
    key: "askForCoords",
    value: function askForCoords() {
      var handleGeoSucces = this.handleGeoSucces,
          handleGeoError = this.handleGeoError;
      navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
    }
  }, {
    key: "saveCoords",
    value: function saveCoords() {
      localStorage.setItem(COORDS, JSON.stringify(this.coordsObj));
    }
  }, {
    key: "loadCoords",
    value: function loadCoords() {
      var getCoords = JSON.parse(localStorage.getItem(COORDS)) || null;

      if (getCoords === null) {
        this.askForCoords();
      } else {
        this.setState(getCoords);
      }
    }
  }, {
    key: "setState",
    value: function setState(coordsObj) {
      this.coordsObj = coordsObj;
      this.saveCoords();
      this.getWeather();
    }
  }, {
    key: "render",
    value: function render(_ref2) {
      var place = _ref2.place,
          sky = _ref2.sky,
          temp = _ref2.temp;
      var $weather = this.$weather;

      if (place && sky && temp) {
        $weather.innerText = "".concat(place, " ").concat(sky, " ").concat(temp, "\xB0C ");
      }
    }
  }]);

  return Weather;
}();

/* harmony default export */ const weather = (Weather);
;// CONCATENATED MODULE: ./src/js/Content.js
function Content_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }






var Content = function Content(_ref) {
  var $target = _ref.$target;

  Content_classCallCheck(this, Content);

  this.$target = $target;
  this.$content = document.createElement("section");
  this.$content.className = "content";
  this.weather = new weather({
    $target: this.$content
  });
  this.clock = new js_Clock({
    $target: this.$content
  });
  this.userName = new userName({
    $target: this.$content
  });
  this.tasksContainer = new js_TasksContainer({
    $target: this.$content
  });
  this.$target.appendChild(this.$content);
};

/* harmony default export */ const js_Content = (Content);
;// CONCATENATED MODULE: ./src/js/App.js
function App_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }




var App = function App($target) {
  App_classCallCheck(this, App);

  this.bg = new js_BgImg({
    $target: $target
  });
  this.content = new js_Content({
    $target: $target
  });
};

/* harmony default export */ const js_App = (App);
;// CONCATENATED MODULE: ./src/js/index.js



new js_App(document.getElementById("App"));
})();

/******/ })()
;