Foolproof.js
==============

Foolproof.js is a group of helper functions for type checking.
You can pass any object to a foolproof helper function and be
certain it will never throw a nasty error since typeof is the first
check that is always done on any value given.

Prototype.toString is used to provide more specific object type
info. Try typeOf() on any object.


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
