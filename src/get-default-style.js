'use strict';

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

	getDefaultStyle: function (element) {
		let tagName = element.tagName.toLowerCase();
		return this.defaultStyles[tagName];
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
