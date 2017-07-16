var Bindery =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _bindery = __webpack_require__(1);
	
	var _bindery2 = _interopRequireDefault(_bindery);
	
	var _makePages = __webpack_require__(5);
	
	var _makePages2 = _interopRequireDefault(_makePages);
	
	var _page = __webpack_require__(7);
	
	var _page2 = _interopRequireDefault(_page);
	
	var _viewer = __webpack_require__(17);
	
	var _viewer2 = _interopRequireDefault(_viewer);
	
	var _controls = __webpack_require__(20);
	
	var _controls2 = _interopRequireDefault(_controls);
	
	var _Rules = __webpack_require__(23);
	
	var _Rules2 = _interopRequireDefault(_Rules);
	
	var _hyperscript = __webpack_require__(8);
	
	var _hyperscript2 = _interopRequireDefault(_hyperscript);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var DEFAULT_PAGE_SIZE = {
	  width: 300,
	  height: 400
	};
	var DEFAULT_PAGE_MARGIN = {
	  inner: 30,
	  outer: 50,
	  bottom: 60,
	  top: 40
	};
	
	var Binder = function () {
	  function Binder(opts) {
	    _classCallCheck(this, Binder);
	
	    if (!opts.source) {
	      console.error("Bindery: You must include a source element or selector");
	    } else if (typeof opts.source == "string") {
	      this.source = document.querySelector(opts.source);
	      if (!(this.source instanceof HTMLElement)) {
	        console.error("Bindery: Could not find element that matches selector \"" + opts.source + "\"");
	        return;
	      }
	    } else if (opts.source instanceof HTMLElement) {
	      this.source = opts.source;
	    } else {
	      console.error("Bindery: Source must be an element or selector");
	    }
	
	    var pageSize = opts.pageSize ? opts.pageSize : DEFAULT_PAGE_SIZE;
	    var pageMargin = opts.margin ? opts.margin : DEFAULT_PAGE_MARGIN;
	    this.setSize(pageSize);
	    this.setMargin(pageMargin);
	
	    this.controls = new _controls2.default({ binder: this });
	
	    this.rules = [];
	    if (opts.rules) this.addRules(opts.rules);
	
	    this.debugDelay = opts.debugDelay ? opts.debugDelay : 0;
	  }
	
	  _createClass(Binder, [{
	    key: "cancel",
	    value: function cancel() {
	      this.viewer.cancel();
	      document.body.classList.remove("bindery-viewing");
	      this.source.style.display = "";
	    }
	  }, {
	    key: "setSize",
	    value: function setSize(size) {
	      this.pageSize = size;
	      _page2.default.setSize(size);
	    }
	  }, {
	    key: "setMargin",
	    value: function setMargin(margin) {
	      this.pageMargin = margin;
	      _page2.default.setMargin(margin);
	    }
	  }, {
	    key: "addRules",
	    value: function addRules(rules) {
	      for (var selector in rules) {
	        if (!rules[selector]) {
	          console.warn("Bindery: Unknown rule for \"" + selector + "\"");
	          continue;
	        }
	        rules[selector].selector = selector;
	        this.rules.push(rules[selector]);
	      }
	    }
	  }, {
	    key: "makeBook",
	    value: function makeBook(doneBinding) {
	      var _this = this;
	
	      this.source.style.display = "";
	      var content = this.source.cloneNode(true);
	      this.source.style.display = "none";
	
	      // In case we're updating an existing layout
	      document.body.classList.remove("bindery-viewing");
	      document.body.classList.add("bindery-inProgress");
	
	      (0, _makePages2.default)(content, this.rules, function (pages) {
	        if (!_this.viewer) {
	          _this.viewer = new _viewer2.default();
	        }
	        _this.viewer.pages = pages, _this.viewer.update();
	        _this.controls.setState("done");
	        document.body.classList.remove("bindery-inProgress");
	      }, this.debugDelay);
	    }
	  }]);
	
	  return Binder;
	}();
	
	for (var rule in _Rules2.default) {
	  Binder[rule] = _Rules2.default[rule];
	}
	
	module.exports = Binder;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(2);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../node_modules/css-loader/index.js!./bindery.css", function() {
				var newContent = require("!!../node_modules/css-loader/index.js!./bindery.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports
	
	
	// module
	exports.push([module.id, "/* Nothing */\n", ""]);
	
	// exports


/***/ },
/* 3 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (content, rules, done, DELAY) {
	
	  var state = {
	    path: [], // Stack representing which element we're currently inside
	    pages: [],
	    getNewPage: function getNewPage() {
	      // Gross hack to allow rules to advance to next page
	      return makeNextPage();
	    }
	  };
	
	  var throttle = function throttle(func) {
	    if (DELAY > 0) setTimeout(func, DELAY);else func();
	  };
	
	  var beforeAddRules = function beforeAddRules(elmt) {
	    rules.forEach(function (rule) {
	      if (elmt.matches(rule.selector) && rule.beforeAdd) {
	
	        var backupPg = state.currentPage.clone();
	        var backupElmt = elmt.cloneNode(true);
	        rule.beforeAdd(elmt, state);
	
	        if (state.currentPage.hasOverflowed()) {
	          // restore from backup
	          elmt.innerHTML = backupElmt.innerHTML; // TODO: make less hacky
	
	          var idx = state.pages.indexOf(state.currentPage);
	          state.pages[idx] = backupPg;
	          state.currentPage = backupPg;
	
	          state.currentPage = makeNextPage();
	
	          rule.beforeAdd(elmt, state);
	        }
	      }
	    });
	  };
	  var afterAddRules = function afterAddRules(elmt) {
	    rules.forEach(function (rule) {
	      if (elmt.matches(rule.selector) && rule.afterAdd) {
	        rule.afterAdd(elmt, state);
	      }
	    });
	  };
	  var newPageRules = function newPageRules(pg) {
	    rules.forEach(function (rule) {
	      if (rule.newPage) rule.newPage(pg, state);
	    });
	  };
	  var afterBindRules = function afterBindRules(pages) {
	    rules.forEach(function (rule) {
	      if (rule.afterBind) {
	        pages.forEach(function (pg, i) {
	          rule.afterBind(pg, i);
	        });
	      }
	    });
	  };
	
	  // Creates clones for ever level of tag
	  // we were in when we overflowed the last page
	  var makeNextPage = function makeNextPage() {
	    state.path = clonePath(state.path);
	    var newPage = new _page2.default();
	    newPageRules(newPage);
	    state.pages.push(newPage);
	    state.currentPage = newPage; // TODO redundant
	    if (state.path[0]) {
	      newPage.flowContent.appendChild(state.path[0]);
	    }
	
	    // make sure the cloned page is valid.
	    // this catches elements with an explicitly set height greater than the
	    // flow area, which will never be split and cause an infinite loop
	    if (newPage.hasOverflowed()) {
	      var suspect = last(state.path);
	      console.error("Bindery: NextPage already overflowing, probably due to a style set on " + (0, _ElementName2.default)(suspect) + ". Since we aren't sure where to break " + (0, _ElementName2.default)(suspect) + ", it may be overflowing.");
	      suspect.parentNode.removeChild(suspect);
	    }
	
	    return newPage;
	  };
	
	  var moveNodeToNextPage = function moveNodeToNextPage(nodeToMove) {
	    state.path.pop();
	
	    var fn = state.currentPage.footer.lastChild; // <--
	    state.currentPage = makeNextPage();
	    if (fn) state.currentPage.footer.appendChild(fn); // <-- move footnote to new page
	
	    last(state.path).appendChild(nodeToMove);
	    state.path.push(nodeToMove);
	  };
	
	  // Adds an text node by binary searching amount of
	  // words until it just barely doesnt overflow
	  var addTextNode = function addTextNode(node, doneCallback, abortCallback) {
	
	    last(state.path).appendChild(node);
	
	    var textNode = node;
	    var origText = textNode.nodeValue;
	
	    var lastPos = 0;
	    var pos = origText.length / 2;;
	
	    var step = function step() {
	
	      var dist = Math.abs(lastPos - pos);
	
	      if (pos > origText.length - 1) {
	        throttle(doneCallback);
	        return;
	      }
	      textNode.nodeValue = origText.substr(0, pos);
	
	      if (dist < 1) {
	        // Is done
	
	        // Back out to word boundary
	        while (origText.charAt(pos) !== " " && pos > -1) {
	          pos--;
	        }if (pos < 1 && origText.trim().length > 0) {
	          // console.error(`Bindery: Aborted adding "${origText.substr(0,25)}"`);
	          textNode.nodeValue = origText;
	          abortCallback();
	          return;
	        }
	
	        textNode.nodeValue = origText.substr(0, pos);
	
	        origText = origText.substr(pos);
	        pos = 0;
	
	        // Start on new page
	        state.currentPage = makeNextPage();
	
	        textNode = document.createTextNode(origText);
	        last(state.path).appendChild(textNode);
	
	        // If the remainder fits there, we're done
	        if (!state.currentPage.hasOverflowed()) {
	          throttle(doneCallback);
	          return;
	        }
	      }
	      lastPos = pos;
	
	      var hasOverflowed = state.currentPage.hasOverflowed();
	      pos = pos + (hasOverflowed ? -dist : dist) / 2;
	
	      throttle(step);
	    };
	
	    if (state.currentPage.hasOverflowed()) {
	      step(); // find breakpoint
	    } else throttle(doneCallback); // add in one go
	  };
	
	  // Adds an element node by clearing its childNodes, then inserting them
	  // one by one recursively until thet overflow the page
	  var addElementNode = function addElementNode(node, doneCallback) {
	
	    // Add this node to the current page or context
	    if (state.path.length == 0) {
	      state.currentPage.flowContent.appendChild(node);
	    } else {
	      last(state.path).appendChild(node);
	    }
	    state.path.push(node);
	
	    // 1. Cache the children
	    var childNodes = [].concat(_toConsumableArray(node.childNodes));
	    // 2. Clear this node
	    node.innerHTML = '';
	
	    // 3. Try adding each child one by one
	    var index = 0;
	    var addNextChild = function addNextChild() {
	      if (!(index < childNodes.length)) {
	        doneCallback();
	        return;
	      }
	      var child = childNodes[index];
	      index += 1;
	
	      switch (child.nodeType) {
	        case Node.TEXT_NODE:
	          var cancel = function cancel() {
	            moveNodeToNextPage(node);
	            addTextNode(child, addNextChild, cancel);
	          };
	          addTextNode(child, addNextChild, cancel);
	          break;
	        case Node.ELEMENT_NODE:
	          {
	            if (child.tagName == "SCRIPT") {
	              addNextChild(); // skip
	              break;
	            }
	
	            beforeAddRules(child);
	
	            throttle(function () {
	              addElementNode(child, function () {
	                var addedChild = state.path.pop();
	                afterAddRules(addedChild); // TODO: AfterAdd rules may want to access original child, not split second half
	                addNextChild();
	              });
	            });
	            break;
	          }
	        default:
	          console.log("Bindery: Unknown node type: " + child.nodeType);
	      }
	    };
	
	    // kick it off
	    addNextChild();
	  };
	
	  state.currentPage = makeNextPage();
	  content.style.margin = 0;
	  content.style.padding = 0;
	
	  addElementNode(content, function () {
	    console.log("Bindery: Pages created in " + 2 + "ms");
	    var measureArea = document.querySelector(".bindery-measure-area");
	    document.body.removeChild(measureArea);
	
	    var orderedPage = reorderPages(state.pages);
	
	    afterBindRules(orderedPage);
	
	    done(orderedPage);
	  });
	};
	
	var _ElementName = __webpack_require__(6);
	
	var _ElementName2 = _interopRequireDefault(_ElementName);
	
	var _page = __webpack_require__(7);
	
	var _page2 = _interopRequireDefault(_page);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	var last = function last(arr) {
	  return arr[arr.length - 1];
	};
	
	var clonePath = function clonePath(origPath) {
	  var newPath = [];
	  for (var i = origPath.length - 1; i >= 0; i--) {
	    var clone = origPath[i].cloneNode(false);
	    clone.innerHTML = '';
	    clone.setAttribute("bindery-continuation", true);
	    if (clone.id) {
	      console.warn("Bindery: Added a break to " + (0, _ElementName2.default)(clone) + ", so \"" + clone.id + "\" is no longer a unique ID.");
	    }
	    if (i < origPath.length - 1) clone.appendChild(newPath[i + 1]);
	    newPath[i] = clone;
	  }
	  return newPath;
	};
	
	// TODO: only do this if not double sided?
	var reorderPages = function reorderPages(pages) {
	  // TODO: this ignores the cover page, assuming its on the right
	  for (var i = 1; i < pages.length - 1; i += 2) {
	    var left = pages[i];
	
	    // TODO: Check more than once
	    if (left.alwaysRight) {
	      if (left.outOfFlow) {
	        pages[i] = pages[i + 1];
	        pages[i + 1] = left;
	      } else {
	        pages.splice(i, 0, new _page2.default());
	      }
	    }
	
	    var right = pages[i + 1];
	
	    if (right.alwaysLeft) {
	      if (right.outOfFlow) {
	        // TODO: don't overflow, assumes that
	        // there are not multiple spreads in a row
	        pages[i + 1] = pages[i + 3];
	        pages[i + 3] = right;
	      } else {
	        pages.splice(i + 1, 0, new _page2.default());
	      }
	    }
	  }
	
	  return pages;
	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	var prettyName = function prettyName(node) {
	  return "\"" + node.tagName.toLowerCase() + (node.id ? "#" + node.id : "") + "." + [].concat(_toConsumableArray(node.classList)).join(".") + "\"";
	};
	
	module.exports = prettyName;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _hyperscript = __webpack_require__(8);
	
	var _hyperscript2 = _interopRequireDefault(_hyperscript);
	
	var _page = __webpack_require__(13);
	
	var _page2 = _interopRequireDefault(_page);
	
	var _measureArea = __webpack_require__(15);
	
	var _measureArea2 = _interopRequireDefault(_measureArea);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Page = function () {
	  function Page() {
	    _classCallCheck(this, Page);
	
	    this.element = (0, _hyperscript2.default)(".bindery-page", { style: "height:" + Page.H + "px; width:" + Page.W + "px" }, (0, _hyperscript2.default)(".bindery-flowbox", (0, _hyperscript2.default)(".bindery-content")), (0, _hyperscript2.default)(".bindery-footer"));
	    this.flowBox = this.element.querySelector(".bindery-flowbox");
	    this.flowContent = this.element.querySelector(".bindery-content");
	    this.footer = this.element.querySelector(".bindery-footer");
	  }
	
	  _createClass(Page, [{
	    key: "hasOverflowed",
	    value: function hasOverflowed() {
	      var measureArea = document.querySelector(".bindery-measure-area");
	      if (!measureArea) measureArea = document.body.appendChild((0, _hyperscript2.default)(".bindery-measure-area"));
	
	      if (this.element.parentNode !== measureArea) {
	        measureArea.innerHTML = '';
	        measureArea.appendChild(this.element);
	      }
	
	      var contentH = this.flowContent.getBoundingClientRect().height;
	      var boxH = this.flowBox.getBoundingClientRect().height;
	
	      // console.log(`contentH: ${contentH}, boxH: ${boxH}`);
	      return contentH >= boxH;
	    }
	  }, {
	    key: "setPreference",
	    value: function setPreference(dir) {
	      if (dir == "left") this.alwaysLeft = true;
	      if (dir == "right") this.alwaysRight = true;
	    }
	  }, {
	    key: "setOutOfFlow",
	    value: function setOutOfFlow(bool) {
	      this.outOfFlow = bool;
	    }
	  }, {
	    key: "clone",
	    value: function clone() {
	      var newPage = new Page();
	      newPage.flowContent.innerHTML = this.flowContent.cloneNode(true).innerHTML;
	      newPage.footer.innerHTML = this.footer.cloneNode(true).innerHTML;
	      newPage.flowContent.insertAdjacentHTML("beforeend", "RESTORED");
	      return newPage;
	    }
	  }], [{
	    key: "setSize",
	    value: function setSize(size) {
	      Page.W = size.width;
	      Page.H = size.height;
	    }
	  }, {
	    key: "setMargin",
	    value: function setMargin(margin) {
	      var sheet = document.createElement('style');
	      sheet.innerHTML = "\n      [bindery-side=\"left\"] .bindery-flowbox,\n      [bindery-side=\"left\"] .bindery-footer {\n        margin-left: " + margin.outer + "px;\n        margin-right: " + margin.inner + "px;\n      }\n      [bindery-side=\"right\"] .bindery-flowbox,\n      [bindery-side=\"right\"] .bindery-footer {\n        margin-left: " + margin.inner + "px;\n        margin-right: " + margin.outer + "px;\n      }\n      .bindery-flowbox { margin-top: " + margin.top + "px; }\n      .bindery-footer { margin-bottom: " + margin.bottom + "px; }\n    ";
	      document.body.appendChild(sheet);
	    }
	  }]);
	
	  return Page;
	}();
	
	module.exports = Page;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var split = __webpack_require__(9)
	var ClassList = __webpack_require__(10)
	
	var w = typeof window === 'undefined' ? __webpack_require__(12) : window
	var document = w.document
	var Text = w.Text
	
	function context () {
	
	  var cleanupFuncs = []
	
	  function h() {
	    var args = [].slice.call(arguments), e = null
	    function item (l) {
	      var r
	      function parseClass (string) {
	        // Our minimal parser doesn’t understand escaping CSS special
	        // characters like `#`. Don’t use them. More reading:
	        // https://mathiasbynens.be/notes/css-escapes .
	
	        var m = split(string, /([\.#]?[^\s#.]+)/)
	        if(/^\.|#/.test(m[1]))
	          e = document.createElement('div')
	        forEach(m, function (v) {
	          var s = v.substring(1,v.length)
	          if(!v) return
	          if(!e)
	            e = document.createElement(v)
	          else if (v[0] === '.')
	            ClassList(e).add(s)
	          else if (v[0] === '#')
	            e.setAttribute('id', s)
	        })
	      }
	
	      if(l == null)
	        ;
	      else if('string' === typeof l) {
	        if(!e)
	          parseClass(l)
	        else
	          e.appendChild(r = document.createTextNode(l))
	      }
	      else if('number' === typeof l
	        || 'boolean' === typeof l
	        || l instanceof Date
	        || l instanceof RegExp ) {
	          e.appendChild(r = document.createTextNode(l.toString()))
	      }
	      //there might be a better way to handle this...
	      else if (isArray(l))
	        forEach(l, item)
	      else if(isNode(l))
	        e.appendChild(r = l)
	      else if(l instanceof Text)
	        e.appendChild(r = l)
	      else if ('object' === typeof l) {
	        for (var k in l) {
	          if('function' === typeof l[k]) {
	            if(/^on\w+/.test(k)) {
	              (function (k, l) { // capture k, l in the closure
	                if (e.addEventListener){
	                  e.addEventListener(k.substring(2), l[k], false)
	                  cleanupFuncs.push(function(){
	                    e.removeEventListener(k.substring(2), l[k], false)
	                  })
	                }else{
	                  e.attachEvent(k, l[k])
	                  cleanupFuncs.push(function(){
	                    e.detachEvent(k, l[k])
	                  })
	                }
	              })(k, l)
	            } else {
	              // observable
	              e[k] = l[k]()
	              cleanupFuncs.push(l[k](function (v) {
	                e[k] = v
	              }))
	            }
	          }
	          else if(k === 'style') {
	            if('string' === typeof l[k]) {
	              e.style.cssText = l[k]
	            }else{
	              for (var s in l[k]) (function(s, v) {
	                if('function' === typeof v) {
	                  // observable
	                  e.style.setProperty(s, v())
	                  cleanupFuncs.push(v(function (val) {
	                    e.style.setProperty(s, val)
	                  }))
	                } else
	                  var match = l[k][s].match(/(.*)\W+!important\W*$/);
	                  if (match) {
	                    e.style.setProperty(s, match[1], 'important')
	                  } else {
	                    e.style.setProperty(s, l[k][s])
	                  }
	              })(s, l[k][s])
	            }
	          } else if(k === 'attrs') {
	            for (var v in l[k]) {
	              e.setAttribute(v, l[k][v])
	            }
	          }
	          else if (k.substr(0, 5) === "data-") {
	            e.setAttribute(k, l[k])
	          } else {
	            e[k] = l[k]
	          }
	        }
	      } else if ('function' === typeof l) {
	        //assume it's an observable!
	        var v = l()
	        e.appendChild(r = isNode(v) ? v : document.createTextNode(v))
	
	        cleanupFuncs.push(l(function (v) {
	          if(isNode(v) && r.parentElement)
	            r.parentElement.replaceChild(v, r), r = v
	          else
	            r.textContent = v
	        }))
	      }
	
	      return r
	    }
	    while(args.length)
	      item(args.shift())
	
	    return e
	  }
	
	  h.cleanup = function () {
	    for (var i = 0; i < cleanupFuncs.length; i++){
	      cleanupFuncs[i]()
	    }
	    cleanupFuncs.length = 0
	  }
	
	  return h
	}
	
	var h = module.exports = context()
	h.context = context
	
	function isNode (el) {
	  return el && el.nodeName && el.nodeType
	}
	
	function forEach (arr, fn) {
	  if (arr.forEach) return arr.forEach(fn)
	  for (var i = 0; i < arr.length; i++) fn(arr[i], i)
	}
	
	function isArray (arr) {
	  return Object.prototype.toString.call(arr) == '[object Array]'
	}
	
	


/***/ },
/* 9 */
/***/ function(module, exports) {

	/*!
	 * Cross-Browser Split 1.1.1
	 * Copyright 2007-2012 Steven Levithan <stevenlevithan.com>
	 * Available under the MIT License
	 * ECMAScript compliant, uniform cross-browser split method
	 */
	
	/**
	 * Splits a string into an array of strings using a regex or string separator. Matches of the
	 * separator are not included in the result array. However, if `separator` is a regex that contains
	 * capturing groups, backreferences are spliced into the result each time `separator` is matched.
	 * Fixes browser bugs compared to the native `String.prototype.split` and can be used reliably
	 * cross-browser.
	 * @param {String} str String to split.
	 * @param {RegExp|String} separator Regex or string to use for separating the string.
	 * @param {Number} [limit] Maximum number of items to include in the result array.
	 * @returns {Array} Array of substrings.
	 * @example
	 *
	 * // Basic use
	 * split('a b c d', ' ');
	 * // -> ['a', 'b', 'c', 'd']
	 *
	 * // With limit
	 * split('a b c d', ' ', 2);
	 * // -> ['a', 'b']
	 *
	 * // Backreferences in result array
	 * split('..word1 word2..', /([a-z]+)(\d+)/i);
	 * // -> ['..', 'word', '1', ' ', 'word', '2', '..']
	 */
	module.exports = (function split(undef) {
	
	  var nativeSplit = String.prototype.split,
	    compliantExecNpcg = /()??/.exec("")[1] === undef,
	    // NPCG: nonparticipating capturing group
	    self;
	
	  self = function(str, separator, limit) {
	    // If `separator` is not a regex, use `nativeSplit`
	    if (Object.prototype.toString.call(separator) !== "[object RegExp]") {
	      return nativeSplit.call(str, separator, limit);
	    }
	    var output = [],
	      flags = (separator.ignoreCase ? "i" : "") + (separator.multiline ? "m" : "") + (separator.extended ? "x" : "") + // Proposed for ES6
	      (separator.sticky ? "y" : ""),
	      // Firefox 3+
	      lastLastIndex = 0,
	      // Make `global` and avoid `lastIndex` issues by working with a copy
	      separator = new RegExp(separator.source, flags + "g"),
	      separator2, match, lastIndex, lastLength;
	    str += ""; // Type-convert
	    if (!compliantExecNpcg) {
	      // Doesn't need flags gy, but they don't hurt
	      separator2 = new RegExp("^" + separator.source + "$(?!\\s)", flags);
	    }
	    /* Values for `limit`, per the spec:
	     * If undefined: 4294967295 // Math.pow(2, 32) - 1
	     * If 0, Infinity, or NaN: 0
	     * If positive number: limit = Math.floor(limit); if (limit > 4294967295) limit -= 4294967296;
	     * If negative number: 4294967296 - Math.floor(Math.abs(limit))
	     * If other: Type-convert, then use the above rules
	     */
	    limit = limit === undef ? -1 >>> 0 : // Math.pow(2, 32) - 1
	    limit >>> 0; // ToUint32(limit)
	    while (match = separator.exec(str)) {
	      // `separator.lastIndex` is not reliable cross-browser
	      lastIndex = match.index + match[0].length;
	      if (lastIndex > lastLastIndex) {
	        output.push(str.slice(lastLastIndex, match.index));
	        // Fix browsers whose `exec` methods don't consistently return `undefined` for
	        // nonparticipating capturing groups
	        if (!compliantExecNpcg && match.length > 1) {
	          match[0].replace(separator2, function() {
	            for (var i = 1; i < arguments.length - 2; i++) {
	              if (arguments[i] === undef) {
	                match[i] = undef;
	              }
	            }
	          });
	        }
	        if (match.length > 1 && match.index < str.length) {
	          Array.prototype.push.apply(output, match.slice(1));
	        }
	        lastLength = match[0].length;
	        lastLastIndex = lastIndex;
	        if (output.length >= limit) {
	          break;
	        }
	      }
	      if (separator.lastIndex === match.index) {
	        separator.lastIndex++; // Avoid an infinite loop
	      }
	    }
	    if (lastLastIndex === str.length) {
	      if (lastLength || !separator.test("")) {
	        output.push("");
	      }
	    } else {
	      output.push(str.slice(lastLastIndex));
	    }
	    return output.length > limit ? output.slice(0, limit) : output;
	  };
	
	  return self;
	})();


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	// contains, add, remove, toggle
	var indexof = __webpack_require__(11)
	
	module.exports = ClassList
	
	function ClassList(elem) {
	    var cl = elem.classList
	
	    if (cl) {
	        return cl
	    }
	
	    var classList = {
	        add: add
	        , remove: remove
	        , contains: contains
	        , toggle: toggle
	        , toString: $toString
	        , length: 0
	        , item: item
	    }
	
	    return classList
	
	    function add(token) {
	        var list = getTokens()
	        if (indexof(list, token) > -1) {
	            return
	        }
	        list.push(token)
	        setTokens(list)
	    }
	
	    function remove(token) {
	        var list = getTokens()
	            , index = indexof(list, token)
	
	        if (index === -1) {
	            return
	        }
	
	        list.splice(index, 1)
	        setTokens(list)
	    }
	
	    function contains(token) {
	        return indexof(getTokens(), token) > -1
	    }
	
	    function toggle(token) {
	        if (contains(token)) {
	            remove(token)
	            return false
	        } else {
	            add(token)
	            return true
	        }
	    }
	
	    function $toString() {
	        return elem.className
	    }
	
	    function item(index) {
	        var tokens = getTokens()
	        return tokens[index] || null
	    }
	
	    function getTokens() {
	        var className = elem.className
	
	        return filter(className.split(" "), isTruthy)
	    }
	
	    function setTokens(list) {
	        var length = list.length
	
	        elem.className = list.join(" ")
	        classList.length = length
	
	        for (var i = 0; i < list.length; i++) {
	            classList[i] = list[i]
	        }
	
	        delete list[length]
	    }
	}
	
	function filter (arr, fn) {
	    var ret = []
	    for (var i = 0; i < arr.length; i++) {
	        if (fn(arr[i])) ret.push(arr[i])
	    }
	    return ret
	}
	
	function isTruthy(value) {
	    return !!value
	}


/***/ },
/* 11 */
/***/ function(module, exports) {

	
	var indexOf = [].indexOf;
	
	module.exports = function(arr, obj){
	  if (indexOf) return arr.indexOf(obj);
	  for (var i = 0; i < arr.length; ++i) {
	    if (arr[i] === obj) return i;
	  }
	  return -1;
	};

/***/ },
/* 12 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(14);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../node_modules/css-loader/index.js!./page.css", function() {
				var newContent = require("!!../../node_modules/css-loader/index.js!./page.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports
	
	
	// module
	exports.push([module.id, "@media screen {\n  .bindery-page {\n    outline: 1px solid rgba(0,0,0,0.1);\n    background: white;\n    /*box-shadow: 3px 3px 0 rgba(0,0,0,0.2);*/\n    box-shadow: 0px 1px 3px rgba(0,0,0,0.2);\n    overflow: hidden;\n  }\n  .bindery-show-bleed .bindery-page {\n    box-shadow: none;\n    outline: none;\n    overflow: visible;\n  }\n\n  .bindery-page::after {\n    content: \"\";\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n  }\n\n  .bindery-show-bleed .bindery-page::after {\n    outline: 1px solid rgba(0,0,0,0.2);\n    box-shadow: 0px 1px 3px rgba(0,0,0,0.3);\n  }\n\n  .bindery-show-guides .bindery-page::after {\n    outline: 1px solid magenta;\n  }\n\n  .bindery-show-guides .bindery-flowbox {\n    outline: 1px solid cyan;\n  }\n  .bindery-show-guides .bindery-footer {\n    outline: 1px solid cyan;\n  }\n  .bindery-show-guides .bindery-content {\n    box-shadow: inset 0 0 0 1px blue;\n  }\n}\n\n.bindery-page {\n  /*width: 400px;*/\n  /*height: 600px;*/\n  width: 200px;\n  height: 300px;\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  flex-wrap: nowrap;\n  margin: auto;\n}\n\n.bindery-flowbox {\n  margin: 60px 40px;\n  margin-bottom: 0;\n  flex: 1 1 auto;\n  min-height: 0;\n}\n\n.bindery-footer {\n  margin: 60px 40px;\n  margin-top: 4px;\n  flex: 0 1 auto;\n  font-size: 0.66em;\n}\n\n[bindery-continuation] {\n  text-indent: 0 !important;\n  margin-top: 0 !important;\n}\n\n.bindery-page.bleed .bindery-flowbox {\n  margin: 0;\n  position: absolute;\n  top: -20px;\n  bottom: -20px;\n}\n[bindery-side=\"left\"].bleed .bindery-flowbox {\n  right: 0;\n  left: -20px;\n}\n[bindery-side=\"right\"].bleed .bindery-flowbox {\n  left: 0;\n  right: -20px;\n}\n", ""]);
	
	// exports


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(16);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../node_modules/css-loader/index.js!./measureArea.css", function() {
				var newContent = require("!!../../node_modules/css-loader/index.js!./measureArea.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports
	
	
	// module
	exports.push([module.id, ".bindery-measure-area {\n  outline: 1px solid cyan;\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n}\n.bindery-measure-area * {\n  outline: 1px solid gray;\n  color: gray;\n  background: transparent;\n}\n\n.bindery-measure-area .bindery-page {\n  background: transparent;\n  box-shadow: none;\n}\n", ""]);
	
	// exports


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _viewer = __webpack_require__(18);
	
	var _viewer2 = _interopRequireDefault(_viewer);
	
	var _page = __webpack_require__(7);
	
	var _page2 = _interopRequireDefault(_page);
	
	var _hyperscript = __webpack_require__(8);
	
	var _hyperscript2 = _interopRequireDefault(_hyperscript);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Viewer = function () {
	  function Viewer(opts) {
	    _classCallCheck(this, Viewer);
	
	    this.pages = [];
	    this.doubleSided = true;
	    this.currentLeaf = 0;
	
	    this.target = (0, _hyperscript2.default)("div");
	    this.target.setAttribute("bindery-export", true);
	  }
	
	  _createClass(Viewer, [{
	    key: "cancel",
	    value: function cancel() {
	      // TODO this doesn't work if the target is an existing node
	      if (this.target.parentNode) {
	        this.target.parentNode.removeChild(this.target);
	      }
	    }
	  }, {
	    key: "toggleGuides",
	    value: function toggleGuides() {
	      this.target.classList.toggle("bindery-show-guides");
	    }
	  }, {
	    key: "toggleBleed",
	    value: function toggleBleed() {
	      this.target.classList.toggle("bindery-show-bleed");
	    }
	  }, {
	    key: "toggleDouble",
	    value: function toggleDouble() {
	      this.doubleSided = !this.doubleSided;
	      this.update();
	    }
	  }, {
	    key: "setGrid",
	    value: function setGrid() {
	      this.mode = "grid";
	      this.update();
	    }
	  }, {
	    key: "toggleInteractive",
	    value: function toggleInteractive() {
	      this.mode = this.mode == "grid" ? "preview" : "grid";
	      this.update();
	    }
	  }, {
	    key: "update",
	    value: function update() {
	      if (!this.target.parentNode) {
	        document.body.appendChild(this.target);
	      }
	
	      document.body.classList.add("bindery-viewing");
	      switch (this.mode) {
	        case "grid":
	          this.renderGrid();
	          break;
	        case "preview":
	          this.renderPreview();
	          break;
	        default:
	          this.renderGrid();
	      }
	    }
	  }, {
	    key: "renderGrid",
	    value: function renderGrid() {
	      this.mode = "grid";
	      this.target.style.display = "block";
	      this.target.innerHTML = "";
	
	      var pages = this.pages.slice();
	
	      if (this.doubleSided) {
	        if (this.pages.length % 2 !== 0) {
	          var pg = new _page2.default();
	          pages.push(pg);
	        }
	        var spacerPage = new _page2.default();
	        var spacerPage2 = new _page2.default();
	        spacerPage.element.style.visibility = "hidden";
	        spacerPage2.element.style.visibility = "hidden";
	        pages.unshift(spacerPage);
	        pages.push(spacerPage2);
	      }
	
	      for (var i = 0; i < pages.length; i += this.doubleSided ? 2 : 1) {
	
	        if (this.doubleSided) {
	          var left = pages[i];
	          var right = pages[i + 1];
	
	          var leftPage = left.element;
	          var rightPage = right.element;
	
	          leftPage.setAttribute("bindery-side", "left");
	          rightPage.setAttribute("bindery-side", "right");
	
	          var wrap = (0, _hyperscript2.default)(".bindery-print-wrapper", {
	            style: {
	              height: _page2.default.H + "px",
	              width: _page2.default.W * 2 + "px"
	            }
	          }, leftPage, rightPage);
	
	          this.target.appendChild(wrap);
	        } else {
	          var _pg = pages[i].element;
	          _pg.setAttribute("bindery-side", "right");
	          var _wrap = (0, _hyperscript2.default)(".bindery-print-wrapper", {
	            style: {
	              height: _page2.default.H + "px",
	              width: _page2.default.W + "px"
	            }
	          }, _pg);
	          this.target.appendChild(_wrap);
	        }
	      }
	    }
	  }, {
	    key: "renderPreview",
	    value: function renderPreview() {
	      this.mode = "preview";
	      this.target.style.display = "block";
	      this.target.innerHTML = "";
	      this.flaps = [];
	
	      var pages = this.pages.slice();
	
	      if (this.doubleSided) {
	        if (this.pages.length % 2 !== 0) {
	          var pg = new _page2.default();
	          pages.push(pg);
	        }
	      }
	      var spacerPage = new _page2.default();
	      var spacerPage2 = new _page2.default();
	      spacerPage.element.style.visibility = "hidden";
	      spacerPage2.element.style.visibility = "hidden";
	      pages.unshift(spacerPage);
	      pages.push(spacerPage2);
	
	      var leafIndex = 0;
	      for (var i = 1; i < pages.length - 1; i += this.doubleSided ? 2 : 1) {
	        leafIndex++;
	        var li = leafIndex;
	        var flap = (0, _hyperscript2.default)("div.bindery-page3d", {
	          style: "height:" + _page2.default.H + "px; width:" + _page2.default.W + "px",
	          onclick: function onclick() {
	            // this.setLeaf(li-1);
	          }
	        });
	        this.makeDraggable(flap);
	        this.target.classList.add("bindery-stage3d");
	        this.flaps.push(flap);
	
	        var l = pages[i].element;
	        l.classList.add("bindery-page3d-front");
	        flap.appendChild(l);
	        if (this.doubleSided) {
	          flap.classList.add("bindery-doubleSided");
	          var r = pages[i + 1].element;
	          r.classList.add("bindery-page3d-back");
	          flap.appendChild(r);
	        } else {
	          var _r = (0, _hyperscript2.default)(".bindery-page.bindery-page3d-back");
	          flap.appendChild(_r);
	        }
	        // flap.style.zIndex = `${this.pages.length - i}`;
	        // flap.style.top = `${i * 4}px`;
	        flap.style.left = i * 4 + "px";
	        this.target.appendChild(flap);
	      }
	      this.setLeaf(0);
	    }
	  }, {
	    key: "setLeaf",
	    value: function setLeaf(n) {
	      var _this = this;
	
	      this.currentLeaf = n;
	      this.flaps.forEach(function (flap, i) {
	        var z = _this.flaps.length - Math.abs(i - n);
	        flap.style.transform = "translate3d(" + (i < n ? 4 : 0) + "px,0," + z * 5 + "px) rotateY(" + (i < n ? -180 : 0) + "deg)";
	      });
	    }
	  }, {
	    key: "makeDraggable",
	    value: function makeDraggable(flap) {
	      var _this2 = this;
	
	      var isDragging = false;
	      var pct = 0;
	      flap.addEventListener("mousedown", function () {
	        isDragging = true;
	        flap.style.transition = "none";
	      });
	      document.body.addEventListener("mousemove", function (e) {
	        if (isDragging) {
	          e.preventDefault();
	          var pt = coords(e);
	          pct = progress01(pt.x, 1000, 200);
	          var ang = transition(pct, 0, -180);
	          var z = _this2.flaps.length;
	          flap.style.transform = "translate3d(" + 0 + "px,0," + z * 5 + "px) rotateY(" + ang + "deg)";
	        }
	      });
	      document.body.addEventListener("mouseup", function (e) {
	        if (isDragging) {
	          isDragging = false;
	          flap.style.transition = "";
	          if (pct > 0.5) _this2.setLeaf(_this2.currentLeaf);else _this2.setLeaf(_this2.currentLeaf + 1);
	        }
	      });
	    }
	  }]);
	
	  return Viewer;
	}();
	
	var transition = function transition(pct, a, b) {
	  return a + pct * (b - a);
	};
	var clamp = function clamp(val, min, max) {
	  return val <= min ? min : val >= max ? max : val;
	};
	var progress = function progress(val, a, b) {
	  return (val - a) / (b - a);
	};
	var progress01 = function progress01(val, a, b) {
	  return clamp(progress(val, a, b), 0, 1);
	};
	var coords = function coords(e) {
	  return e = e.touches && e.touches[0] || e, { x: e.pageX, y: e.pageY };
	};
	
	exports.default = Viewer;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(19);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../node_modules/css-loader/index.js!./viewer.css", function() {
				var newContent = require("!!../../node_modules/css-loader/index.js!./viewer.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports
	
	
	// module
	exports.push([module.id, "@media screen {\n  .bindery-viewing {\n    background: #f1f1f1 !important;\n  }\n  [bindery-export] {\n    background: #f1f1f1;\n    padding: 50px 20px;\n    z-index: 99;\n    position: relative;\n    padding-right: 240px;\n  }\n\n   .bindery-measure-area {\n     position: fixed;\n     top: 0;\n     left: 0;\n     background: #f1f1f1;\n     padding: 50px 20px;\n     padding-right: 240px;\n     z-index: 99;\n   }\n}\n\n@media print {\n  /* Don't print anything that hasn't been exported. This hides extra controls/ */\n  .bindery-viewing > :not([bindery-export]) {\n    display: none !important;\n  }\n\n  .bindery-print-wrapper {\n    margin: 20px;\n  }\n}\n\n/* Don't print anything that hasn't been exported. This hides extra controls/ */\n.bindery-viewing > :not([bindery-export]) {\n  display: none !important;\n}\n\n.bindery-print-wrapper {\n  page-break-after: always;\n  position: relative;\n  display: flex;\n  width: 800px;\n  margin: 50px auto;\n}\n\n/* Crop Marks */\n.bindery-print-wrapper:before {\n\tcontent: \"\";\n  pointer-events: none;\n\tdisplay: block;\n\tposition: absolute;\n\ttop: -20px;\n\tleft: -20px;\n\twidth: 100%;\n\theight: 100%;\n  -webkit-border-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAEsCAYAAAB5fY51AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDowMjAwMjQwRUNDRDMxMUUzOEYzQ0EwRDQ2MzU4OTNGQyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDowMjAwMjQwRkNDRDMxMUUzOEYzQ0EwRDQ2MzU4OTNGQyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkJFRjE1REVCQ0NEMDExRTM4RjNDQTBENDYzNTg5M0ZDIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkJFRjE1REVDQ0NEMDExRTM4RjNDQTBENDYzNTg5M0ZDIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+OTmWYwAAA3VJREFUeNrs2MGKgzAUhtH+pXt9/6esT3An3RWEQWidScw5EFpchZvwgaaqbswnyevn/fDT610Yaa+c624EgGABCBYgWACCBSBYgGABCBaAYAGCBSBYAIIFCBaAYAEIFiBYAIIFIFiAYAEIFoBgAYIFIFgAggUIFoBgAQgWIFgAggUIFoBgAQgWIFgAggUgWIBgAQgWgGABggUgWACCBQgWgGABCBYgWACCBSBYgGABCBaAYAGCBSBYAIIFCBaAYAEIFiBYAIIFCBaAYAEIFiBYAIIFIFiAYAEIFoBgAYIFIFgAggUIFoBgAQgWIFgA/+ZhBFNb7ZWRpKpMYcaDT3bPer0LI+0Vr4QAggUIFoBgAYIFIFgAggUIFoBgAQgWIFgAggUgWIBgAQgWgGABggUgWACCBQgWgGABCBYgWACCBSBYgGABCBaAYAGCBSBYAIIFCBaAYAGCBSBYAIIFCBaAYAEIFiBYAIIFIFiAYAEIFoBgAYIFIFgAggUIFgAAv0tbZQyHrW1txsAXLW09jcErISBYAAAAXEOqfHOf8uCT3bNe78JIe+VcvmEBggUgWIBgAQgWgGABggUgWACCBQgWgGABCBYgWACCBSBYgGABCBaAYAGCBSBYAIIFCBaAYAEIFiBYAIIFIFiAYAEIFiBYRgAIFoBgAYIFIFgAggUIFgAAH0lbZQyHrW1txsAXLW09jcErISBYAAAAXEOqfHOf8uCT3bNe78JIe+VcvmEBggUgWIBgAQgWgGABggUgWACCBQgWgGABCBYgWACCBSBYgGABCBaAYAGCBSBYAIIFCBaAYAEIFiBYAIIFIFiAYAEIFiBYRgAIFoBgAYIFIFgAggUIFoBgAQgWIFgAggUgWIBgAQgWgGABggUgWACCBQgWwN97GMHUlrf/m73Su1SVKcx48Mnrp0a4CyPtFa+EAIIFCBaAYAGCBSBYAIIFCBaAYAEIFiBYAIIFIFiAYAEIFoBgAYIFIFgAggUIFoBgAQgWIFgAggUgWIBgAQgWgGABggUgWACCBQgWgGABggUgWACCBQgWgGABCBYgWACCBSBYgGABCBaAYAGCBSBYAIIFCBaAYAEIFiBYAIIFIFiAYAEIFoBgAYIFIFgAggUIFoBgAYIFIFgAggUIFoBgAQgWIFgAggUgWIBgAQgWgGABV/UjwADn4TtZkBC9rAAAAABJRU5ErkJggg==) 140 fill stretch round;\n\tborder-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAEsCAYAAAB5fY51AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDowMjAwMjQwRUNDRDMxMUUzOEYzQ0EwRDQ2MzU4OTNGQyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDowMjAwMjQwRkNDRDMxMUUzOEYzQ0EwRDQ2MzU4OTNGQyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkJFRjE1REVCQ0NEMDExRTM4RjNDQTBENDYzNTg5M0ZDIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkJFRjE1REVDQ0NEMDExRTM4RjNDQTBENDYzNTg5M0ZDIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+OTmWYwAAA3VJREFUeNrs2MGKgzAUhtH+pXt9/6esT3An3RWEQWidScw5EFpchZvwgaaqbswnyevn/fDT610Yaa+c624EgGABCBYgWACCBSBYgGABCBaAYAGCBSBYAIIFCBaAYAEIFiBYAIIFIFiAYAEIFoBgAYIFIFgAggUIFoBgAQgWIFgAggUIFoBgAQgWIFgAggUgWIBgAQgWgGABggUgWACCBQgWgGABCBYgWACCBSBYgGABCBaAYAGCBSBYAIIFCBaAYAEIFiBYAIIFCBaAYAEIFiBYAIIFIFiAYAEIFoBgAYIFIFgAggUIFoBgAQgWIFgA/+ZhBFNb7ZWRpKpMYcaDT3bPer0LI+0Vr4QAggUIFoBgAYIFIFgAggUIFoBgAQgWIFgAggUgWIBgAQgWgGABggUgWACCBQgWgGABCBYgWACCBSBYgGABCBaAYAGCBSBYAIIFCBaAYAGCBSBYAIIFCBaAYAEIFiBYAIIFIFiAYAEIFoBgAYIFIFgAggUIFgAAv0tbZQyHrW1txsAXLW09jcErISBYAAAAXEOqfHOf8uCT3bNe78JIe+VcvmEBggUgWIBgAQgWgGABggUgWACCBQgWgGABCBYgWACCBSBYgGABCBaAYAGCBSBYAIIFCBaAYAEIFiBYAIIFIFiAYAEIFiBYRgAIFoBgAYIFIFgAggUIFgAAH0lbZQyHrW1txsAXLW09jcErISBYAAAAXEOqfHOf8uCT3bNe78JIe+VcvmEBggUgWIBgAQgWgGABggUgWACCBQgWgGABCBYgWACCBSBYgGABCBaAYAGCBSBYAIIFCBaAYAEIFiBYAIIFIFiAYAEIFiBYRgAIFoBgAYIFIFgAggUIFoBgAQgWIFgAggUgWIBgAQgWgGABggUgWACCBQgWwN97GMHUlrf/m73Su1SVKcx48Mnrp0a4CyPtFa+EAIIFCBaAYAGCBSBYAIIFCBaAYAEIFiBYAIIFIFiAYAEIFoBgAYIFIFgAggUIFoBgAQgWIFgAggUgWIBgAQgWgGABggUgWACCBQgWgGABggUgWACCBQgWgGABCBYgWACCBSBYgGABCBaAYAGCBSBYAIIFCBaAYAEIFiBYAIIFIFiAYAEIFoBgAYIFIFgAggUIFoBgAYIFIFgAggUIFoBgAQgWIFgAggUgWIBgAQgWgGABV/UjwADn4TtZkBC9rAAAAABJRU5ErkJggg==) 140 fill stretch round;\n\tborder-image-slice: 140;\n\tborder-image-repeat: stretch round;\n\tborder-width: 20px;\n\tbox-sizing: content-box;\n  border-style: solid;\n  z-index: 999;\n}\n\n\n.bindery-stage3d {\n  perspective: 2000px;\n  min-height: 100vh;\n  transform-style: preserve-3d;\n}\n\n.bindery-page3d {\n  margin: auto;\n  width: 400px;\n  height: 600px;\n  transform: rotateY(0);\n  transition: all 0.8s;\n  transform-style: preserve-3d;\n  transform-origin: left;\n  position: absolute;\n  left: 0;\n  right: -10%;\n}\n\n.bindery-page3d:hover {\n  outline: 1px solid red;\n  /*transform: translate3d(20px, 0, 0);*/\n}\n.bindery-page3d.flipped {\n  transform: rotateY(-180deg);\n}\n\n.bindery-page3d .bindery-page {\n  position: absolute;\n  backface-visibility: hidden;\n}\n\n.bindery-page3d .bindery-page3d-front {\n  transform: rotateY(0);\n}\n.bindery-page3d .bindery-page3d-back {\n  transform: rotateY(-180deg);\n}\n", ""]);
	
	// exports


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _controls = __webpack_require__(21);
	
	var _controls2 = _interopRequireDefault(_controls);
	
	var _hyperscript = __webpack_require__(8);
	
	var _hyperscript2 = _interopRequireDefault(_hyperscript);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var btn = function btn() {
	  return _hyperscript2.default.apply(undefined, ["button.bindery-btn"].concat(Array.prototype.slice.call(arguments)));
	};
	var btnMain = function btnMain() {
	  return _hyperscript2.default.apply(undefined, ["button.bindery-btn.bindery-btn-main"].concat(Array.prototype.slice.call(arguments)));
	};
	var toggle = function toggle() {
	  return _hyperscript2.default.apply(undefined, [".bindery-toggle"].concat(Array.prototype.slice.call(arguments), [toggleSwitch]));
	};
	var toggleSwitch = function toggleSwitch() {
	  return (0, _hyperscript2.default)(".bindery-switch", (0, _hyperscript2.default)(".bindery-switch-handle"));
	};
	var label = function label() {
	  return _hyperscript2.default.apply(undefined, [".bindery-label"].concat(Array.prototype.slice.call(arguments)));
	};
	
	var Controls = function () {
	  function Controls(opts) {
	    var _this = this;
	
	    _classCallCheck(this, Controls);
	
	    this.holder = (0, _hyperscript2.default)("div.bindery-controls");
	    document.body.appendChild(this.holder);
	
	    this.binder = opts.binder;
	
	    var start = function start() {
	      _this.setState("working");
	      _this.binder.bind();
	    };
	    var done = function done() {
	      _this.binder.cancel();
	      _this.setState("start");
	    };
	    var guides = function guides() {
	      guidesToggle.classList.toggle("selected");
	      opts.binder.viewer.toggleGuides();
	    };
	    var bleed = function bleed() {
	      bleedToggle.classList.toggle("selected");
	      opts.binder.viewer.toggleBleed();
	    };
	    var interactivePreview = function interactivePreview() {
	      previewToggle.classList.toggle("selected");
	      opts.binder.viewer.toggleInteractive();
	    };
	    var facing = function facing() {
	      facingToggle.classList.toggle("selected");
	      opts.binder.viewer.toggleDouble();
	    };
	    var print = function print() {
	      opts.binder.viewer.setGrid();
	      window.print();
	    };
	
	    var printBtn = btnMain({ style: { float: "right" }, onclick: print }, "Print");
	    var previewToggle = toggle({ onclick: interactivePreview }, "Interactive Preview");
	    var guidesToggle = toggle({ onclick: guides }, "Guides");
	    var bleedToggle = toggle({ onclick: bleed }, "Bleed");
	    var facingToggle = toggle({ onclick: facing }, "Facing Pages");
	    facingToggle.classList.add("selected");
	    var doneBtn = btn({ onclick: done }, "Done");
	
	    var input = {
	      top: (0, _hyperscript2.default)("input", { type: "number", value: this.binder.pageMargin.top }),
	      inner: (0, _hyperscript2.default)("input", { type: "number", value: this.binder.pageMargin.inner }),
	      outer: (0, _hyperscript2.default)("input", { type: "number", value: this.binder.pageMargin.outer }),
	      bottom: (0, _hyperscript2.default)("input", { type: "number", value: this.binder.pageMargin.bottom }),
	      width: (0, _hyperscript2.default)("input", { type: "number", value: this.binder.pageSize.width }),
	      height: (0, _hyperscript2.default)("input", { type: "number", value: this.binder.pageSize.height })
	    };
	
	    var heightControl = (0, _hyperscript2.default)(".bindery-val", input.height, (0, _hyperscript2.default)("div", "Height"));
	    var widthControl = (0, _hyperscript2.default)(".bindery-val", input.width, (0, _hyperscript2.default)("div", "Width"));
	    var topMarginControl = (0, _hyperscript2.default)(".bindery-val", input.top, (0, _hyperscript2.default)("div", "Top"));
	    var innerMarginControl = (0, _hyperscript2.default)(".bindery-val", input.inner, (0, _hyperscript2.default)("div", "Inner"));
	    var outerMarginControl = (0, _hyperscript2.default)(".bindery-val", input.outer, (0, _hyperscript2.default)("div", "Outer"));
	    var bottomMarginControl = (0, _hyperscript2.default)(".bindery-val", input.bottom, (0, _hyperscript2.default)("div", "Bottom"));
	
	    var updateBtn = btn({ onclick: updateLayout }, "Rebuild Layout");
	
	    var updateDelay = void 0;
	    var throttledUpdate = function throttledUpdate() {
	      clearTimeout(updateDelay);
	      updateDelay = setTimeout(updateLayout, 700);
	    };
	    var updateLayout = function updateLayout() {
	      var newMargin = {
	        top: input.top.value,
	        inner: input.inner.value,
	        outer: input.outer.value,
	        bottom: input.bottom.value
	      };
	      var newSize = {
	        height: input.height.value,
	        width: input.width.value
	      };
	
	      var needsUpdate = false;
	      for (var k in newMargin) {
	        if (_this.binder.pageMargin[k] !== newMargin[k]) {
	          needsUpdate = true;
	        }
	      }
	      for (var _k in newSize) {
	        if (_this.binder.pageSize[_k] !== newSize[_k]) {
	          needsUpdate = true;
	        }
	      }
	
	      if (needsUpdate) {
	        _this.binder.setSize(newSize);
	        _this.binder.setMargin(newMargin);
	        _this.binder.makeBook();
	      }
	    };
	
	    for (var k in input) {
	      input[k].addEventListener("change", throttledUpdate);
	      input[k].addEventListener("keyup", throttledUpdate);
	    }
	
	    this.states = {
	      // start: , btn({ onclick: start}, "Get Started"),
	      working: (0, _hyperscript2.default)("div.bindery-status", "Binding..."),
	      done: (0, _hyperscript2.default)("div", {}, doneBtn, printBtn, label("View"), previewToggle, guidesToggle, bleedToggle, label("Page Setup"), facingToggle, widthControl, heightControl, label("Margin"), topMarginControl, innerMarginControl, outerMarginControl, bottomMarginControl)
	    };
	    this.state = "";
	    this.setState("start");
	  }
	
	  _createClass(Controls, [{
	    key: "setState",
	    value: function setState(newState) {
	      this.holder.style.display = newState == "start" ? "none" : "block";
	
	      if (newState !== this.state && this.states[newState]) {
	        this.state = newState;
	        this.holder.innerHTML = "";
	        this.holder.appendChild(this.states[newState]);
	      }
	    }
	  }]);
	
	  return Controls;
	}();
	
	module.exports = Controls;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(22);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../node_modules/css-loader/index.js!./controls.css", function() {
				var newContent = require("!!../../node_modules/css-loader/index.js!./controls.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports
	
	
	// module
	exports.push([module.id, "@media screen {\n  .bindery-viewing .bindery-controls {\n    display: block !important;\n  }\n}\n\n.bindery-controls {\n  font-family: -apple-system, BlinkMacSystemFont, \"Roboto\", sans-serif;\n  position: fixed;\n  top: 0;\n  bottom: 0;\n  right: 0;\n  width: 240px;\n  z-index: 999;\n  margin: auto;\n  background: white;\n  outline: 1px solid rgba(0,0,0,0.05);\n  animation: fadeIn 0.4s;\n}\n\n.bindery-inProgress .bindery-controls {\n  opacity: 0.5;\n  pointer-events: none;\n}\n\n@keyframes fadeIn {\n  0% {\n    opacity: 0;\n    transform: translate3d(20px, 0, 0);\n  }\n  20% {\n    opacity: 0;\n    transform: translate3d(20px, 0, 0);\n  }\n  100% {\n    opacity: 1;\n    transform: translate3d(0, 0, 0);\n  }\n}\n\n.bindery-status {\n  color: white;\n  padding: 6px 10px;\n}\n\n.bindery-btn {\n  -webkit-appearance: none;\n  padding: 8px 12px;\n  color: #444;\n  border: none;\n  background: transparent;\n  cursor: pointer;\n  font-size: 12px;\n  text-transform: uppercase;\n  letter-spacing: 0.01em;\n  font-weight: 500;\n  display: inline-block;\n  border-radius: 2px;\n  margin: 12px;\n  width: auto;\n}\n\n.bindery-label {\n  font-size: 12px;\n  text-transform: uppercase;\n  color: #aaa;\n  letter-spacing: 0.01em;\n  padding: 12px 12px;\n  border-top: 1px solid #ddd;\n}\n\n.bindery-toggle, .bindery-val {\n  position: relative;\n  display: block;\n  font-size: 14px;\n  padding: 8px 12px;\n  cursor: pointer;\n  margin-bottom: 8px;\n}\n\n.bindery-toggle:hover, .bindery-val:hover {\n  background: rgba(0,0,0,0.06);\n}\n\n\n.bindery-val input {\n  width: 85px;\n  padding: 4px 8px;\n  text-align: right;\n  border: none;\n  background: none;\n  position: absolute;\n  top: 0;\n  right: 0;\n  height: 100%;\n  width: 100%;\n  color: navy;\n}\n\n.bindery-val input:focus {\n    outline: none;\n    background: rgba(0,0,0,0.04);\n}\n\n.bindery-switch {\n  width: 28px;\n  height: 16px;\n  background: rgba(0,0,0,0.2);\n  border-radius: 8px;\n  margin-right: 5px;\n  vertical-align: middle;\n  float: right;\n  font-size: 8px;\n  transition: all 0.2s;\n  position: relative;\n}\n.bindery-switch-handle {\n  width: 16px;\n  height: 16px;\n  border-radius: 50%;\n  background: white;\n  box-shadow: 0 1px 2px rgba(0,0,0,0.2);\n  transition: all 0.2s;\n  position: absolute;\n  left: 0px;\n  top: 0px;\n}\n.bindery-toggle:hover .bindery-switch-handle {\n  box-shadow: 0 2px 3px rgba(0,0,0,0.3);\n}\n\n.bindery-toggle.selected .bindery-switch {\n  background: rgba(0, 0, 128, 0.42);\n}\n.bindery-toggle.selected .bindery-switch-handle {\n  background: navy;\n  left: 12px;\n}\n\n\n\n.bindery-btn-main {\n  background: navy;\n  color: white;\n  /*border-color: black;*/\n}\n.bindery-btn:focus {\n  /*outline: 1px solid blue;*/\n  outline: none;\n}\n.bindery-btn:hover {\n  background: rgba(0,0,0,0.06);\n}\n.bindery-btn:active {\n  background: rgba(0,0,0,0.1);\n}\n.bindery-btn-main:hover {\n  background: navy;\n  opacity: 0.8;\n}\n.bindery-btn-main:active {\n  background: black;\n  opacity: 1;\n}\n", ""]);
	
	// exports


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _breakBefore = __webpack_require__(24);
	
	var _breakBefore2 = _interopRequireDefault(_breakBefore);
	
	var _fullPage = __webpack_require__(25);
	
	var _fullPage2 = _interopRequireDefault(_fullPage);
	
	var _spread = __webpack_require__(28);
	
	var _spread2 = _interopRequireDefault(_spread);
	
	var _Footnote = __webpack_require__(31);
	
	var _Footnote2 = _interopRequireDefault(_Footnote);
	
	var _PageReference = __webpack_require__(32);
	
	var _PageReference2 = _interopRequireDefault(_PageReference);
	
	var _pageNumber = __webpack_require__(33);
	
	var _pageNumber2 = _interopRequireDefault(_pageNumber);
	
	var _runningHeader = __webpack_require__(36);
	
	var _runningHeader2 = _interopRequireDefault(_runningHeader);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  Spread: _spread2.default,
	  FullPage: _fullPage2.default,
	  Footnote: _Footnote2.default,
	  BreakBefore: _breakBefore2.default,
	  PageNumber: _pageNumber2.default,
	  RunningHeader: _runningHeader2.default,
	  PageReference: _PageReference2.default
	};

/***/ },
/* 24 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  beforeAdd: function beforeAdd(elmt, state) {
	    if (state.currentPage.flowContent.innerText !== "") {
	      state.currentPage = state.getNewPage();
	      state.currentPage.setPreference("right");
	    }
	  }
	};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _fullPage = __webpack_require__(26);
	
	var _fullPage2 = _interopRequireDefault(_fullPage);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var prevPage = void 0,
	    prevElementPath = void 0;
	
	exports.default = {
	  beforeAdd: function beforeAdd(elmt, state) {
	    prevPage = state.currentPage;
	    prevElementPath = state.path;
	    state.currentPage = state.getNewPage();
	
	    //TODO: Rather than just add padding,
	    // put full-bleed content on a separate
	    // out-of-flow background layer
	    if (elmt.classList.contains("bleed")) {
	      state.currentPage.element.classList.add("bleed");
	    }
	  },
	  afterAdd: function afterAdd(elmt, state) {
	    state.currentPage = prevPage;
	    state.path = prevElementPath;
	  }
	};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(27);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../node_modules/css-loader/index.js!./fullPage.css", function() {
				var newContent = require("!!../../../node_modules/css-loader/index.js!./fullPage.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports
	
	
	// module
	exports.push([module.id, "/* TODO */\n", ""]);
	
	// exports


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _spread = __webpack_require__(29);
	
	var _spread2 = _interopRequireDefault(_spread);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var prevPage = void 0,
	    prevElementPath = void 0;
	
	exports.default = {
	  beforeAdd: function beforeAdd(elmt, state) {
	    prevPage = state.currentPage;
	    prevElementPath = state.path;
	
	    state.currentPage = state.getNewPage();
	  },
	  afterAdd: function afterAdd(elmt, state) {
	    var leftPage = state.currentPage;
	    var dupedContent = leftPage.flowContent.cloneNode(true);
	    var rightPage = state.getNewPage();
	    rightPage.flowBox.innerHTML = "";
	    rightPage.flowBox.appendChild(dupedContent);
	    rightPage.flowContent = dupedContent;
	
	    leftPage.element.classList.add("bindery-spread");
	    leftPage.element.classList.add("bleed");
	    leftPage.setPreference("left");
	    leftPage.setOutOfFlow(true);
	
	    rightPage.element.classList.add("bindery-spread");
	    rightPage.element.classList.add("bleed");
	    rightPage.setPreference("right");
	    rightPage.setOutOfFlow(true);
	
	    state.currentPage = prevPage;
	    state.path = prevElementPath;
	  }
	};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(30);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../node_modules/css-loader/index.js!./spread.css", function() {
				var newContent = require("!!../../../node_modules/css-loader/index.js!./spread.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports
	
	
	// module
	exports.push([module.id, "[bindery-side=\"left\"].bindery-spread .bindery-content {\n  width: 200%;\n  position: absolute;\n  left: 0;\n}\n[bindery-side=\"right\"].bindery-spread .bindery-content {\n  width: 200%;\n  position: absolute;\n  right: 0;\n}\n", ""]);
	
	// exports


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (textGetter) {
	  return {
	    newPage: function newPage(pg) {},
	    afterAdd: function afterAdd(elmt, state) {
	      var fn = (0, _hyperscript2.default)(".footnote");
	      var n = state.currentPage.footer.querySelectorAll(".footnote").length;
	      fn.innerHTML = n + " " + textGetter(elmt);
	      state.currentPage.footer.appendChild(fn);
	      elmt.insertAdjacentHTML("beforeend", "<sup>" + n + "</sup>");
	    }
	  };
	};
	
	var _hyperscript = __webpack_require__(8);
	
	var _hyperscript2 = _interopRequireDefault(_hyperscript);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 32 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var references = {};
	
	exports.default = {
	  afterAdd: function afterAdd(elmt, state) {
	    references[elmt.getAttribute("href")] = elmt;
	    elmt.removeAttribute("href");
	  },
	  afterBind: function afterBind(pg, i) {
	    for (var ref in references) {
	      if (pg.element.querySelector(ref)) {
	        references[ref].insertAdjacentHTML("afterend", "<span style=\"float:right;\">" + pg.number.textContent + "</span>");
	      }
	    }
	  }
	};

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _hyperscript = __webpack_require__(8);
	
	var _hyperscript2 = _interopRequireDefault(_hyperscript);
	
	var _pageNumber = __webpack_require__(34);
	
	var _pageNumber2 = _interopRequireDefault(_pageNumber);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  newPage: function newPage(pg, state) {
	    // let el = h(".bindery-num", "#");
	    // pg.number = el;
	    // pg.element.appendChild(el);
	  },
	  afterBind: function afterBind(pg, i) {
	    var el = (0, _hyperscript2.default)(".bindery-num", "#");
	    pg.number = el;
	    pg.element.appendChild(el);
	    pg.number.textContent = i + 1;
	  }
	};

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(35);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../node_modules/css-loader/index.js!./pageNumber.css", function() {
				var newContent = require("!!../../../node_modules/css-loader/index.js!./pageNumber.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports
	
	
	// module
	exports.push([module.id, "@media screen {\n  .bindery-show-guides .bindery-num {\n    outline: 1px solid cyan;\n  }\n}\n\n.bindery-num {\n  position: absolute;\n  text-align: center;\n  bottom: 20px;\n  -webkit-user-select: none;\n  /*font-size: 0.66em;*/\n}\n\n[bindery-side=\"left\"] .bindery-num {\n  left: 20px;\n}\n[bindery-side=\"right\"] .bindery-num {\n  right: 20px;\n}\n", ""]);
	
	// exports


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _hyperscript = __webpack_require__(8);
	
	var _hyperscript2 = _interopRequireDefault(_hyperscript);
	
	var _runningHeader = __webpack_require__(37);
	
	var _runningHeader2 = _interopRequireDefault(_runningHeader);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var headerContent = "";
	exports.default = {
	  afterAdd: function afterAdd(elmt, state) {
	    headerContent = elmt.textContent;
	    state.currentPage.runningHeader.textContent = "";
	  },
	  newPage: function newPage(pg, state) {
	    var el = (0, _hyperscript2.default)(".bindery-running-header");
	    pg.runningHeader = el;
	    pg.element.appendChild(el);
	    pg.runningHeader.textContent = headerContent;
	  }
	};

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(38);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../node_modules/css-loader/index.js!./runningHeader.css", function() {
				var newContent = require("!!../../../node_modules/css-loader/index.js!./runningHeader.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports
	
	
	// module
	exports.push([module.id, "@media screen {\n  .bindery-show-guides .bindery-running-header {\n    outline: 1px solid cyan;\n  }\n}\n\n.bindery-running-header {\n  position: absolute;\n  text-align: center;\n  top: 20px;\n  left: 0;\n  right: 0;\n  margin: auto;\n  font-size: 0.66em;\n  -webkit-user-select: none;\n}\n\n[bindery-side=\"left\"] .bindery-running-header {\n  /*right: 40px;*/\n}\n[bindery-side=\"right\"] .bindery-running-header {\n  /*left: 40px;*/\n}\n", ""]);
	
	// exports


/***/ }
/******/ ]);
//# sourceMappingURL=bindery.js.map