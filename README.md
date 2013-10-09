
Bulletproof.js
==============

Bulletproof.js is a group of helper functions for type checking.
You can pass any object to a bulletproof helper function and be
certain it will never throw a nasty error since typeof is the first
check that is always done on any value given.

Prototype.toString is used to provide more specific object type
info. Try typeOf() on any object.


Usage
-----


```js
typeOf({})
```


### Title