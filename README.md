Foolproof.js
==============

## Status: Beta

Please refer to the test file. To run it, simply get expect.js and mocha, and run mocha, like this:
```
$ cd ~/YourProject/
$ npm install expect.js
$ npm install -g mocha
$ mocha
```

## Description

Foolproof.js is a group of helper functions for type checking.
The goal is to simplify type checking, increase stability for
node applications, and allow for graceful handling of unexpected
conditions.

## Functions:

* SystemLogger - has Use() and EpicFail() methods, allows setting of a custom error handler.
* E(typeof var) - shorthand for (typeof var !== 'undefined')
* U(typeof var) - shorthand for (typeof var === 'undefined')
* failWhen(condition, message, level, errorType) - a fail-fast method, invokes SystemLogger.EpicFail() when condition is true.
* ƒ(typeof var) - a fail-fast method, always use with typeof.
* findProperty(obj, 'parent.child.property') - Access any properties/sub-properties of obj using dot notation (false if no match).
* removeItem(needle, haystack) - modifies haystack, removing the item which strictly matches needle.
* inArray(needle, haystack)
* typeOf()
* isType()
* ~~isUndefined()~~
* isFunction()
* isObject()
* isString()
* isRegex()
* isArray()
* isNull()
* isTruthy()
* isFalsey()
* notType()
* ~~notUndefined()~~
* notFunction()
* notObject()
* notString()
* notRegex()
* notArray()
* notNull()



### Available from npm
`$ npm install foolproof`

will add it to your node_modules folder.


How to Include Foolproof.js
-----------------------------

Foolproof exports a constructor function. If you want the helper
functions to be available in the global context, simply invoke
the function, like this:

```js
require('foolproof')()

console.log( isString('this is a demo') )
// prints true
  
console.log( isFunction( function(){} ) )
// prints true
```

If you would rather attach them to a namespace object, use the
new keyword, like this:

```js
var Fp = require('foolproof')
var fp = new Fp()

console.log( fp.isString('this is a demo') )
// prints true
  
console.log( fp.isFunction( function(){} ) )
// prints true
```
