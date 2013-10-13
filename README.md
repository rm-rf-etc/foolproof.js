Foolproof.js
==============

## Status: Beta

Please do not rely on this package as it is still in development
and could produce unexpected behavior. If you have mocha and expect.js
installed, you can run the tests from the project root using simply:
```
$ mocha
```

## Description

Foolproof.js is a group of helper functions for type checking.
The goal is to simplify type checking, increase stability for
node applications, and allow for graceful handling of unexpected
conditions.

## Functions:

* SystemLogger - has Use() and EpicFail() methods.
* E(typeof var) - shorthand for (typeof var !== 'undefined')
* U(typeof var) - shorthand for (typeof var === 'undefined')
* failWhen() - a fail-fast method.
* ƒ(typeof var) - a fail-fast method, always use with typeof.
* inArray()
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

Foolproof gives you a couple options. Mainly we want to make it
easy to use the helper functions as you would any other native JS
feature.

You could use it like this:

```js
var fp = require('foolproof')()

console.log( fp.isString('this is a demo') )
```

But it was intended to make the helper functions available natively
in your app's context, like this:

```js
var App = (function(){

  require('foolproof').apply(this)

  // does stuff...

  console.log( isString('this is a demo') )

  return this
})()
```
