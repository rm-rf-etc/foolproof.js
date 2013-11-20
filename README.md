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

Foolproof.js is a group of helper functions intended to extend the
native language features for node applications, simplify type checking,
and allow for graceful handling of unexpected conditions.

## Functions:

SystemLogger
    Has use() and epicFail() methods, allows setting of a custom error handler.
E(typeof var)
    A shorthand for (typeof var !== 'undefined')
U(typeof var)
    A shorthand for (typeof var === 'undefined')
failWhen(condition, message, level, errorType)
    A fail-fast method, invokes SystemLogger.EpicFail() when condition is true.
ƒ(typeof var)
    A fail-fast method, always use with typeof.
findProperty(obj, 'parent.child.property')
    Access any properties/sub-properties of obj using dot notation (false if no match).
removeItem(needle, haystack):
    Modifies haystack, removing the item which strictly matches needle.
concatUnique(existing, additional)
    Adds only unique items from additional to existing.
inArray(needle, haystack)
    True if haystack strictly contains needle.
objExtend(to, from)
    Reimplementation of jQuery extend method, minus support for extending jQuery itself.

Complete list of methods:
```
var methods = {
       "ƒ"                :  ƒ
    ,  "U"                :  U
    ,  "E"                :  E
    ,  "dd"               :  dd
    ,  "systemLogger"     :  systemLogger
    ,  "failWhen"         :  failWhen
    ,  "inArray"          :  inArray
    ,  "concatUnique"     :  concatUnique
    ,  "findUnique"       :  findUnique
    ,  "removeItem"       :  removeItem
    ,  "nameOf"           :  nameOf
    ,  "typeOf"           :  typeOf
    ,  "isType"           :  isType
    ,  "isFunction"       :  isFunction
    ,  "isObject"         :  isObject
    ,  "isBoolean"        :  isBoolean
    ,  "isString"         :  isString
    ,  "isRegex"          :  isRegex
    ,  "isArray"          :  isArray
    ,  "isNull"           :  isNull
    ,  "isNumber"         :  isNumber
    ,  "isNumeric"        :  isNumeric
    ,  "isTruthy"         :  isTruthy
    ,  "isFalsey"         :  isFalsey
    ,  "notType"          :  notType
    ,  "notFunction"      :  notFunction
    ,  "notObject"        :  notObject
    ,  "notBoolean"       :  notBoolean
    ,  "notString"        :  notString
    ,  "notRegex"         :  notRegex
    ,  "notArray"         :  notArray
    ,  "notNull"          :  notNull
    ,  "notNumber"        :  notNumber
    ,  "standardizePath"  :  standardizePath
    ,  "isValidPath"      :  isValidPath
    ,  "notValidPath"     :  notValidPath
    ,  "urlParse"         :  urlParse
    ,  "isFolderSync"     :  isFolderSync
    ,  "isFileSync"       :  isFileSync
    ,  "filesHereSync"    :  filesHereSync
    ,  "formPath"         :  formPath
    ,  "fileName"         :  fileName
    ,  "fullPath"         :  fullPath
    ,  "parentFolder"     :  parentFolder
    ,  "loadFileSync"     :  loadFileSync
    ,  "loadFile"         :  loadFile
    ,  "findProperty"     :  findProperty
    ,  "objExtend"        :  objExtend
}
```


### Available from npm
`$ npm install foolproof`

will add it to your node_modules folder.


How to Include Foolproof.js
-----------------------------

Foolproof exports one method: extend(). This method supports
two use cases. To make these methods global, like other native
language features such as typeof, simply extend root, like so:

```js
require('foolproof').extend(root)

console.log( isString('this is a demo') )
// prints true
  
console.log( isFunction( function(){} ) )
// prints true
```

If you choose to use foolproof this way, the helpers become like
truly native language features, in that they are immutable:

```js
require('foolproof').extend(root)

console.log( isString )
// prints [Function: isString]

isString = null
console.log( isString )
// prints [Function: isString]
```

Or, if you would rather attach the helpers to a namespace object,
simply pass that to extend(), like so:

```js
var fp = {}
require('foolproof').extend(fp)

console.log( fp.isString('this is a demo') )
// prints true
  
console.log( fp.isFunction( function(){} ) )
// prints true
```
