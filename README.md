
Bulletproof.js
==============


### not available on npm just yet...


Bulletproof.js is a group of helper functions for type checking.
You can pass any object to a bulletproof helper function and be
certain it will never throw a nasty error since typeof is the first
check that is always done on any value given.

Prototype.toString is used to provide more specific object type
info. Try typeOf() on any object.


How to Include Bulletproof.js
-----------------------------

Bulletproof gives you a couple options. Mainly we want to make it
easy to use the helper functions as you would any other native JS
feature.

You could use it like this:

```js
var bp = require('bulletproof')()

alert( bp.isString('this is a demo') );
```

But it was intended to make the helper functions available natively
in your app's context, like this:

```js
var App = (function(){

  require('bulletproof').apply(this);

  // does stuff...

  alert( isString('this is a demo') );

  return this
});
```

