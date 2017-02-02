# getDefaultStyle

An API which is able to get default computed value(except for width / height) in state of non specified style via dummy ifame in the browser.

## Installation

```html
<script src="/path/to/get-default-style.js">
```

## Usage

Almost the same as [getComputedStyle](https://developer.mozilla.org/en/docs/Web/API/Window/getComputedStyle)

```
let style = getDefaultStyle(element[, pseudoElt]);
```

## API

### getPropertyValue
```
style.getPropertyValue(propertyName);//any value
```

## Example

```js
let div = document.querySelector('div');
let style = getDefaultStyle(div);
style.getPropertyValue('width');//auto
style.getPropertyValue('margin-top');//0px
style.getPropertyValue('background-position');//0% 0%
```
