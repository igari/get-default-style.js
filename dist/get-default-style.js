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
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function XCSSStyleDeclaration() {}

XCSSStyleDeclaration.prototype.getPropertyValue = function (property) {
	return this[property];
};

const GFS = {

	allTags: [
		"a",
		"abbr",
		"acronym",
		"address",
		"applet",
		"area",
		"article",
		"aside",
		"audio",
		"b",
		"base",
		"basefont",
		"bdi",
		"bdo",
		"big",
		"blockquote",
		"body",
		"br",
		"button",
		"canvas",
		"caption",
		"center",
		"cite",
		"code",
		"col",
		"colgroup",
		"datalist",
		"dd",
		"del",
		"details",
		"dfn",
		"dialog",
		"dir",
		"div",
		"dl",
		"dt",
		"em",
		"embed",
		"fieldset",
		"figcaption",
		"figure",
		"font",
		"footer",
		"form",
		"frame",
		"frameset",
		"h1",
		"h2",
		"h3",
		"h4",
		"h5",
		"h6",
		"head",
		"header",
		"hr",
		"html",
		"i",
		"iframe",
		"img",
		"input",
		"ins",
		"kbd",
		"keygen",
		"label",
		"legend",
		"li",
		"link",
		"main",
		"map",
		"mark",
		"menu",
		"menuitem",
		"meta",
		"meter",
		"nav",
		"noframes",
		"nobr",
		"noscript",
		"object",
		"ol",
		"optgroup",
		"option",
		"output",
		"p",
		"param",
		"pre",
		"picture",
		"progress",
		"q",
		"rp",
		"rt",
		"ruby",
		"s",
		"samp",
		"script",
		"section",
		"select",
		"small",
		"source",
		"span",
		"strike",
		"strong",
		"shadow",
		"style",
		"sub",
		"summary",
		"sup",
		"table",
		"tbody",
		"td",
		"textarea",
		"tfoot",
		"th",
		"thead",
		"time",
		"template",
		"title",
		"tr",
		"track",
		"tt",
		"u",
		"ul",
		"var",
		"video",
		"wbr",
		"svg"
	],

	calculatedValueProperties: [
		'height',
		'width',
	],

	init: function () {
		this.insertIframe4getDefaultStyles();
		this.getDefaultStyleFromAllElements();
	},

	defaultStyles: {},

	getDefaultStyle: function (element, pseudo) {

		let pseudoMatch = pseudo && typeof pseudo === 'string' && pseudo.trim().match(/(before|after)$/);
		this.pseudo = pseudoMatch ? pseudoMatch[1] : false;

		let tagName = element.tagName.toLowerCase();
		return this.pseudo ? this.defaultStyles['span'] : this.defaultStyles[tagName];
	},

	insertIframe4getDefaultStyles: function () {

		this.iframe4test = document.createElement('iframe');
		this.iframe4test.style.setProperty('display', 'none', 'important');

		let body = document.querySelector('body');
		body.appendChild(this.iframe4test);

		this.iframeWindow = this.iframe4test.contentWindow;
		let iframeDocument = this.iframeWindow.document;
		this.iframeBody = iframeDocument.querySelector('body');

		let docFrag = iframeDocument.createDocumentFragment();

		for(let tagName of this.allTags) {
			docFrag.appendChild(iframeDocument.createElement(tagName));
		}
		this.iframeBody.appendChild(docFrag);
	},

	getDefaultStyleFromAllElements: function () {
		let allElements = this.iframeBody.querySelectorAll('*:not(script)');

		for(let element of allElements) {
			let tagName = element.tagName.toLowerCase();
			let computedStyle = window.getComputedStyle(element);
			this.defaultStyles[tagName] = Object.create(XCSSStyleDeclaration.prototype, {});
			for(let property of computedStyle) {
				if(/width|height/.test(property)) {
					this.defaultStyles[tagName][property] = 'auto';
				} else {
					this.defaultStyles[tagName][property] = computedStyle[property];
				}
			}
		}
	}
};

GFS.init();

window.getDefaultStyle = GFS.getDefaultStyle.bind(GFS);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(0);

/***/ })
/******/ ]);