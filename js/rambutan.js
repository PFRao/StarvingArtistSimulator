/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var DOMNodeCollection = __webpack_require__(1);

	window.$l = function (selector) {
	  var result;
	  var theArray = [];
	  var functionQueue = [];

	  if (selector instanceof Function) {
	    functionQueue.push(selector);
	    document.addEventListener("DOMContentLoaded", function(event) {
	      for (var i = 0; i < functionQueue.length; i++) {
	        functionQueue[i]();
	      }
	    });
	    return;
	  }

	  if (selector instanceof HTMLElement) {
	    theArray.push(selector);
	    result = theArray;
	  } else {
	    var nodeList = document.querySelectorAll(selector);
	    result = Array.prototype.slice.call(nodeList);
	  }

	  return new DOMNodeCollection(result);
	};

	window.$l.create = function (string, className) {
	  var classes = Array.prototype.slice.call(arguments, 2);
	  var element = document.createElement(string);
	  element.className = className;

	  classes.forEach(function (nextClass) {
	    element.className += " " + nextClass;
	  });

	  return element;
	};

	window.$l.createWithId = function (string, idName) {
	  var element = document.createElement(string);
	  element.id = idName;

	  return element;
	};

	window.$l.extend = function () {
	  var args = [].slice.call(arguments);
	  return Object.assign.apply(null, args);
	};

	window.$l.ajax = function (opts) {
	  var defaults = {
	    method: "GET",
	    url: window.location.pathname,
	    success: function(data) {
	        console.log("We have your data!");
	        console.log(data);
	      },
	    error: function() {
	        console.error("An error occured.");
	      },
	    data: "",
	    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
	  };

	  var defOpts = $l.extend(defaults, opts);
	  var xhr = new XMLHttpRequest();
	  xhr.open(defOpts.method, defOpts.url);
	  xhr.onload = function() {
	    console.log(xhr.status);
	    console.log(xhr.responseType);
	    console.log(xhr.response);
	  };
	  xhr.send();
	};


/***/ },
/* 1 */
/***/ function(module, exports) {

	function DOMNodeCollection(array) {
	  this.elements = array;
	}

	DOMNodeCollection.prototype.html = function (string) {
	    if (string){
	      for (var i = 0; i < this.elements.length; i++) {
	        this.elements[i].innerHTML =  string;
	      }
	      return this;
	    }
	  return this.elements[0].innerHTML;
	};

	DOMNodeCollection.prototype.empty = function () {
	  this.html("");
	};

	DOMNodeCollection.prototype.val = function () {
	  // var theElement = this.elements[0];
	  return this.elements[0].value;
	};

	DOMNodeCollection.prototype.append = function () {
	  var newHTMLs = Array.prototype.slice.call(arguments, 0);
	  newHTMLs.forEach(function (newHTML) {
	    if (newHTML instanceof DOMNodeCollection) {
	      var triggers = "";
	      for (var j = 0; j < newHTML.elements.length; j++) {
	        triggers += newHTML.elements[j].outerHTML;
	      }
	      newHTML = triggers;
	    } else if (newHTML instanceof HTMLElement) {
	      newHTML = newHTML.outerHTML;
	    }

	    for (var i = 0; i < this.elements.length; i++) {
	      this.elements[i].innerHTML += newHTML;
	    }
	  }.bind(this));
	};

	DOMNodeCollection.prototype.attr = function (attrName, value) {
	  if (value !== undefined) {
	    for (var i = 0; i < this.elements.length; i++) {
	      this.elements[i].setAttribute(attrName, value);
	    }
	    return this;
	  }
	  return this.elements[0].getAttribute(attrName);
	};

	DOMNodeCollection.prototype.addClass = function (className) {
	  var newAttr = className;
	  if (this.attr("class")){
	    newAttr = this.attr("class") + " " + className;
	  }
	  this.attr("class", newAttr);
	  return this;
	};

	DOMNodeCollection.prototype.css = function (property, value) {

	};

	DOMNodeCollection.prototype.removeClass = function (className) {
	  var remove = "";
	  if (className){
	    var classes = this.elements[0].getAttribute("class").split(" ");
	    var index = classes.indexOf(className);
	    if (index === -1) { return; }

	    classes.splice(index, 1);
	    remove = classes.join(" ");
	  }

	  this.attr("class", remove);
	};

	DOMNodeCollection.prototype.children = function () {
	  var childrens = [];
	  var nodes;
	  for (var i = 0; i < this.elements.length; i++) {
	    nodes = Array.prototype.slice.call(this.elements[i].children);
	    childrens = childrens.concat(nodes);
	  }

	  return new DOMNodeCollection(childrens);
	};

	DOMNodeCollection.prototype.parent = function () {
	  var parents = [];

	  for (var i = 0; i < this.elements.length; i++) {
	    parents = parents.concat(this.elements[i].parentElement);
	  }

	  return new DOMNodeCollection(parents);
	};

	DOMNodeCollection.prototype.find = function (selector) {
	  var result = [];
	  var nodes;
	  for (var i = 0; i < this.elements.length; i++) {
	    nodes = Array.prototype.slice.call(this.elements[i].querySelectorAll(selector));
	    result = result.concat(nodes);
	  }
	  return new DOMNodeCollection(result);
	};

	DOMNodeCollection.prototype.remove = function () {
	  this.empty();
	  for (var i = 0; i < this.elements.length; i++) {
	    this.elements[i].remove();
	  }
	};

	DOMNodeCollection.prototype.on = function (eventName, callback) {
	  for (var i = 0; i < this.elements.length; i++) {
	    this.elements[i].addEventListener(eventName, callback);
	  }
	};

	DOMNodeCollection.prototype.off = function (eventName, callback) {
	  for (var i = 0; i < this.elements.length; i++) {
	    this.elements[i].removeEventListener(eventName, callback);
	  }
	};

	module.exports = DOMNodeCollection;


/***/ }
/******/ ]);