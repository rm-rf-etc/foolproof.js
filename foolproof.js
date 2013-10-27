
/**
 * @module foolproof
 * @class Exports
 */
module.exports = function(){

  // Level 0 is the worst possible error level. 1 is default for really bad.
  ReferenceError.prototype.lvl = 1



  /**
   * Allows custom error handling.
   * @class fSystemLogger
   * @for Exports
   */
  this.fSystemLogger = (function(){

    /*`'~.,.~'`*\
       private
    \*,.~'`'~.,*/

    var func = CaughtOnCamera

    function CaughtOnCamera (err)
    {
      console.log('Level: '+err.lvl, err, err.stack)
      throw err
    }

    /*`'~.,.~'`*\
       public
    \*,.~'`'~.,*/

    /**
     * Call this when everything goes really wrong.
     * @method EpicFail
     * @for fSystemLogger
     * @param msg {String} text that will go into the error.
     * @param lvl {Number} level value that will go into the error.
     * @param typ {Error} optional, include if you don't want a ReferenceError.
     * @param req {Error} optional, for future integration with node server.
     */
    function EpicFail (msg, lvl, typ, req)
    {
      var msg = msg || 'No error message was defined for this condition.'

      var err
      if ( E(typeof typ) )
        err = new typ(msg)
      else
        err = new ReferenceError(msg)

      err.lvl = lvl || 1

      func(err)
    }

    /**
     * @method Use
     * @for fSystemLogger
     * @param alternate {Function} Set a custom error handler. Will receive an Error object (pass Null to reset).
     */
    function Use (alternate)
    {
      if ( isFunction(alternate) )
        func = alternate
      else if ( isFalsey(alternate) )
        func = CaughtOnCamera
    }

    return {
      EpicFail: EpicFail,
      Use: Use
    }
  })()



  /**
   * Die and dump.
   * @method dd
   * @for Exports
   * @param arguments {Arguments}
   */
  this.dd = function dd () { console.log(arguments); process.exit() }



  /**
   * Just a shorthand for (typeof x === 'undefined').
   *
   * @method E(typeof var)
   * @for Exports
   * @param thing {Variable}
   * @return {Boolean}
   */
  this.U = function U (/*typeof*/ thing) { return (thing === 'undefined') }
  this.E = function E (/*typeof*/ thing) { return (thing !== 'undefined') }


  /**
   * This is a fail-fast system protection method. Always use with the typeof
   * operator, like this: "ƒ(typeof [var])".
   *
   * OS X: alt+f. Windows: alt+159.
   *
   * @method ƒ(typeof var)
   * @for Exports
   * @param enemy {Variable}
   * @param msg {String}
   * @param lvl {Number}
   * @return {Boolean}
   */
  this.ƒ = function ƒ (/*typeof*/ enemy, msg, lvl, typ, req)
  {
    var msg = msg || undefined
    var lvl = lvl || undefined
    var typ = typ || undefined

    if (enemy === 'undefined') {
      fSystemLogger.EpicFail(msg, lvl, typ)
      return false
    }
    else
      return true
  }


  /**
   * This is a fail-fast system protection method. Can be used with U(typeof var)
   * to do exactly the same thing as ƒ(typeof var), however allows you to test
   * multiple conditions, like this:
   *
   * failWhen( U(typeof x) || U(typeof y), message, 1 )
   *
   * @method failWhen
   * @for Exports
   * @param condition {Boolean}
   * @param msg {String}
   * @param lvl {String}
   * return {Boolean}
   */
  // @throws {Error}
  this.failWhen = function failWhen (condition, msg, lvl, typ, req)
  {
    var msg = msg || undefined
    var lvl = lvl || undefined
    var typ = typ || undefined

    if ( condition ) {
      fSystemLogger.EpicFail(msg, lvl, typ)
      return false
    }
    else
      return true
  }


  /**
   * inArray(needle, haystack)
   * @method inArray
   * @for Exports
   * @param needle {any object}
   * @param haystack {Array}
   * @return {Boolean}
   */
  this.inArray = function inArray (needle, haystack)
  {
    for (var key in haystack)
      if (haystack[key] === needle) return true

    return false
  }


  /**
   * @method removeItem
   * @for Exports
   * @param string {String}
   * @param array {Array}
   * @return {Array or False}
   */
  this.removeItem = function removeItem (string, array)
  {
    if ( inArray(string, array) ) {
      var i = array.indexOf(string)

      if (i !== -1) {
        var result = array
        result.splice(i,1)
        return result
      }
    }
    return false
  }


  /**
   * @method nameOf
   * @for Exports
   * @param thing {String}
   * @return name {String} of thing
   */
  this.nameOf = function nameOf (thing)
  {
    if ( isFunction(thing) ) {
      if ( /^function\s\(/g.test(thing.toString()) )
        return 'Anonymous Function'
      else
        return /^function\s(\w+?)\(\).*/g.exec( thing.toString() )[1]
    }

    if (thing !== null && thing !== undefined )
      return thing.constructor.name
    
    else
      return (thing === null) ? 'Null' : 'Undefined'
  }

  /**
   * @method typeOf
   * @for Exports
   * @param thing {String}
   * @return type {String} Lower case only.
   */
  this.typeOf = function typeOf (thing)
  {
    switch (typeof thing) {
      case 'undefined':
        return 'undefined'
      case 'number':
        if (isNaN(thing)) return 'NaN'
        else return 'number'
      case 'function': return 'function'
      case 'string': return 'string'
      default:
        var type = Object.prototype.toString.apply(thing).toLowerCase().replace(/(^\[object\s|\]$)/g, '')
        if (type == 'regexp') return 'regex'
        else return type
    }
  }

  /**
   * @method isType
   * @for Exports
   * @param thing {any object}
   * @param type {String}
   * @return {Boolean}
   */
  this.isType = function isType (thing, type)
  {
    if (isString(type))
      return (typeOf(thing) === type)
    else
      return false //! Or throw error?
  }

  /**
   * @method isFunction
   * @for Exports
   * @param thing {any object}
   * @return {Boolean}
   */
  this.isFunction = function isFunction (thing) {     return (typeOf(thing) === 'function')   }

  /**
   * @method isObject
   * @for Exports
   * @param thing {any object}
   * @return {Boolean}
   */
  this.isObject = function isObject (thing) {         return (typeOf(thing) === 'object')     }

  /**
   * @method isString
   * @for Exports
   * @param thing {any object}
   * @return {Boolean}
   */
  this.isString = function isString (thing) {         return (typeOf(thing) === 'string')     }

  /**
   * @method isRegex
   * @for Exports
   * @param thing {any object}
   * @return {Boolean}
   */
  this.isRegex = function isRegex (thing) {           return (typeOf(thing) === 'regex')      }

  /**
   * @method isArray
   * @for Exports
   * @param thing {any object}
   * @return {Boolean}
   */
  this.isArray = Array.isArray

  /**
   * @method isNull
   * @for Exports
   * @param thing {any object}
   * @return {Boolean}
   */
  this.isNull = function isNull (thing) {             return (typeOf(thing) === 'null')       }

  /**
   * @method isNumber
   * @for Exports
   * @param thing {any object}
   * @return {Boolean}
   */
  this.isNumber = function isNumber (thing) {         return (typeOf(thing) === 'number')     }

  /**
   * Credit goes to: http://stackoverflow.com/questions/18082/validate-numbers-in-javascript-isnumeric
   * @method isNumeric
   * @for Exports
   * @param thing {any object}
   * @return {Boolean}
   */
  this.isNumeric = function isNumeric (thing) {
    return !isNaN(parseFloat(thing)) && isFinite(thing)
  }

  /**
   * @method isTruthy
   * @for Exports
   * @param thing {any object}
   * @return {Boolean}
   */
  this.isTruthy = function isTruthy (thing) {         return ( !isFalsey(thing) )             }

  /**
   * @method isFalsey
   * @for Exports
   * @param thing {any object}
   * @return {Boolean}
   */
  this.isFalsey = function isFalsey (thing) {         return !thing                           }

  /**
   * @method notType
   * @for Exports
   * @param thing {any object}
   * @param type {String}
   * @return {Boolean}
   */
  this.notType = function notType (thing, type) {         return !isType (thing, type)   }

  /**
   * @method notFunction
   * @for Exports
   * @param thing {any object}
   * @return {Boolean}
   */
  this.notFunction = function notFunction (thing) {       return !isFunction (thing)     }

  /**
   * @method notObject
   * @for Exports
   * @param thing {any object}
   * @return {Boolean}
   */
  this.notObject = function notObject (thing) {           return !isObject (thing)       }

  /**
   * @method notString
   * @for Exports
   * @param thing {any object}
   * @return {Boolean}
   */
  this.notString = function notString (thing) {           return !isString (thing)       }

  /**
   * @method notRegex
   * @for Exports
   * @param thing {any object}
   * @return {Boolean}
   */
  this.notRegex = function notRegex (thing) {             return !isRegex (thing)        }

  /**
   * @method notArray
   * @for Exports
   * @param thing {any object}
   * @return {Boolean}
   */
  this.notArray = function notArray (thing) {             return !isArray (thing)        }

  /**
   * @method notNull
   * @for Exports
   * @param thing {any object}
   * @return {Boolean}
   */
  this.notNull = function notNull (thing) {               return !isNull (thing)         }

  /**
   * @method notNull
   * @for Exports
   * @param thing {any object}
   * @return {Boolean}
   */
  this.notNumber = function notNumber (thing) {           return !isNumber (thing)       }


  /**
   * @method standardizePath
   * @for Exports
   * @param path {any object} thing
   * @return {Boolean}
   */
  this.standardizePath = function standardizePath (path)
  {
    if (path.length > 1) {
      path = path.replace(/\/{2,}/g, '/')
      path = path.replace(/^\//, '') // Remove potential leading slash.
      if (/[^\/]$/.test( path )) path += '/'; // Include trailing slash.
    }
    else if ( notValidPath(path) ) {
      failWhen(true, 'Path string is invalid.', 1)
      return false
    }

    return path
  }

  /**
   * @method isValidPath
   * @for Exports
   * @param path {String}
   * @return {Boolean}
   */
  this.isValidPath = function isValidPath (path)
  {
    if (isString(path))
      return ( /^[\w\d._~:\-\/?#@!$&'\[\]()*+,;=%]+$/g.test(path) )//&& !/\/{2,}/g.test(path) )
    else
      return false
  }

  /**
   * @method notValidPath
   * @for Exports
   * @param path {String}
   * @return {Boolean}
   */
  this.notValidPath = function notValidPath (path) {       return ! isValidPath(path)    }

  /**
   * @method urlParser
   * @for Exports
   * @param regex {Regex}
   * @param url {String}
   * @param vars {Array}
   */
  this.urlParser = function urlParser (regex, url, vars)
  {
    failWhen( notRegex(regex) || notValidPath(url), 'urlParser() received invalid arguments.', 1 )
    
    var args
    args = regex.exec(url)
    args = (args) ? args.slice(1) : []

    if ( isArray(vars) ) {
      var obj = {}
      
      if (vars.length === args.length) {
        for (var i in vars)
          obj[vars[i]] = args[i]

        return obj
      }
    }

    return args
  }


  var fs = require('fs')
  var pth = require('path')

  // Prettier function names.
  /**
   * @method isFolder
   * @for Exports
   * @param path {String}
   * @return {Boolean}
   */
  this.isFolder  = function isFolder(path){        return fs.lstatSync( path ).isDirectory()           }

  /**
   * @method isFile
   * @for Exports
   * @param path {String}
   * @return {Boolean}
   */
  this.isFile    = function isFile(path){          return fs.lstatSync( path ).isFile()                }
  /**
   * @method filesHere
   * @for Exports
   * @param path {String}
   * @return {Array}
   */
  this.filesHere = function filesHere(path){       return fs.readdirSync( path )                       }

  /**
   * @method formPath
   * @for Exports
   * @param path {String}
   * @param file {String}
   * @return {String}
   */
  this.formPath  = function formPath(path, file){  return pth.join( path, file )                       }

  /**
   * @method fileName
   * @for Exports
   * @param path {String}
   * @return {String}
   */
  this.fileName  = function fileName(path){        return pth.basename(path.replace(/\.\w*?$/g, ''))   }

  /**
   * @method fullPath
   * @for Exports
   * @param path {String}
   * @return {String}
   */
  this.fullPath  = function fullPath(path){        return pth.resolve(path)                            }

  /**
   * @method fileName
   * @for Exports
   * @param path {String}
   * @return {String}
   */
  this.loadFile  = function loadFile(file, encoding)
  {
    var encode = (isString(encoding)) ? encoding : 'utf8'
    if (isFile(file))
      return fs.readFileSync(file, encoding)
    else
      return null
  }

  /**
   * @method findProperty
   * @for Exports
   * @param obj {Object}
   * @param chain {String}
   */
  this.findProperty = function findProperty(obj, chain)
  {
    var found = obj
    var props = chain.split('.')

    for (var i in props) {
      var before = found

      for (var e in found) {
        if (e === props[i])
          var found = found[props[i]]
      }

      if (before === found)
        return false
    }

    return found
  }



  return this
}