
/**
 * @module Bulletproof
 * @class Exports
 */
module.exports = function(){

  // Level 0 is the worst possible error level. 1 is default for really bad.
  ReferenceError.prototype.level = 1
  var log = {
    takeAction: function(){ return false }
  }

  /**
   * Allows you to specify a default logger function which will be invoked on every new error.
   * @method useLogger
   * @param func {Function}
   */
  this.useLogger = function useLogger (func) {
    log.takeAction = func
  }

  /**
   * alt+f on mac, this is the fail-fast system protection method. Always use with typeof like this: ƒ(typeof [var])
   * @method ƒ
   * @param enemy {Variable}
   */
  this.ƒ = function ƒ (/*typeof*/ enemy) {
    
    if (enemy === 'undefined') {
      if (log.takeAction() === false) {
        throw new ReferenceError(msg).level = level
      }
    }
    else
      return enemy
  }

  /**
   * @method failWhen
   * @param condition {Boolean}
   * @param msg {String}
   * @param args {Array}
   * @param level {String}
   */
  // @throws {Error}
  this.failWhen = function failWhen (condition, msg, args, level) {
    if (isTruthy(condition)) {
      var msg = (isString(msg)) ? msg : 'Error occurred in '+nameOf(this)
      var level = (isString(level)) ? level.toLowerCase() : 'warn'
      // log(msg, args, level)
      throw new Error(msg, args)
    }
    return true
  }


  /**
   * @method inArray
   * @param needle {any object}
   * @param haystack {Array}
   * @return {Boolean}
   */
  this.inArray = function inArray (needle, haystack) {
    if (failWhen(notArray(haystack), 'inArray requires haystack be Array.', arguments))
      return false

    for (var key in haystack)
      if (haystack[key] === needle) return true

    return false
  }

  /**
   * @method nameOf
   * @param thing {String}
   * @return name {String} of thing
   */
  this.nameOf = function nameOf (thing) {

    if ( isFunction(thing) )
      return /^function\s(\w+?)\(\).*/g.exec( thing.toString() )[1]

    if ( notNull(thing) && notUndefined(thing) )
      return thing.constructor.name
    
    else
      return (isNull(thing)) ? 'Null' : 'Undefined'
  }

  /**
   * @method typeOf
   * @param thing {String}
   * @return type {String} Lower case only.
   */
  this.typeOf = function typeOf (thing) {
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
   * @param thing {any object}
   * @param type {String}
   * @return {Boolean}
   */
  this.isType = function isType (thing, type) {
    if (isString(type))
      return (typeOf(thing) === type)
    else
      return false //! Or throw error?
  }

  /**
   * @method isUndefined
   * @param thing {any object}
   * @return {Boolean}
   */
  this.isUndefined = function isUndefined (thing) {   return (typeOf(thing) === 'undefined')  }

  /**
   * @method isFunction
   * @param thing {any object}
   * @return {Boolean}
   */
  this.isFunction = function isFunction (thing) {     return (typeOf(thing) === 'function')   }

  /**
   * @method isObject
   * @param thing {any object}
   * @return {Boolean}
   */
  this.isObject = function isObject (thing) {         return (typeOf(thing) === 'object')     }

  /**
   * @method isString
   * @param thing {any object}
   * @return {Boolean}
   */
  this.isString = function isString (thing) {         return (typeOf(thing) === 'string')     }

  /**
   * @method isRegex
   * @param thing {any object}
   * @return {Boolean}
   */
  this.isRegex = function isRegex (thing) {           return (typeOf(thing) === 'regex')      }

  /**
   * @method isArray
   * @param thing {any object}
   * @return {Boolean}
   */
  this.isArray = function isArray (thing) {           return (typeOf(thing) === 'array')      }

  /**
   * @method isNull
   * @param thing {any object}
   * @return {Boolean}
   */
  this.isNull = function isNull (thing) {             return (typeOf(thing) === 'null')       }

  /**
   * @method isTruthy
   * @param thing {any object}
   * @return {Boolean}
   */
  this.isTruthy = function isTruthy (thing) {         return ( !isFalsey(thing) )             }

  /**
   * @method isFalsey
   * @param thing {any object}
   * @return {Boolean}
   */
  this.isFalsey = function isFalsey (thing) {
    if (isUndefined(thing))
      return true
    else
      return !thing
  }

  /**
   * @method notType
   * @param thing {any object}
   * @param type {String}
   * @return {Boolean}
   */
  this.notType = function notType (thing, type) {         return !isType (thing, type)   }

  /**
   * @method notUndefined
   * @param thing {any object}
   * @return {Boolean}
   */
  this.notUndefined = function notUndefined (thing) {     return !isUndefined (thing)    }

  /**
   * @method notFunction
   * @param thing {any object}
   * @return {Boolean}
   */
  this.notFunction = function notFunction (thing) {       return !isFunction (thing)     }

  /**
   * @method notObject
   * @param thing {any object}
   * @return {Boolean}
   */
  this.notObject = function notObject (thing) {           return !isObject (thing)       }

  /**
   * @method notString
   * @param thing {any object}
   * @return {Boolean}
   */
  this.notString = function notString (thing) {           return !isString (thing)       }

  /**
   * @method notRegex
   * @param thing {any object}
   * @return {Boolean}
   */
  this.notRegex = function notRegex (thing) {             return !isRegex (thing)        }

  /**
   * @method notArray
   * @param thing {any object}
   * @return {Boolean}
   */
  this.notArray = function notArray (thing) {             return !isArray (thing)        }

  /**
   * @method notNull
   * @param thing {any object}
   * @return {Boolean}
   */
  this.notNull = function notNull (thing) {               return !isNull (thing)         }


  /**
   * @method standardizePath
   * @param path {any object} thing
   * @return {Boolean}
   */
  this.standardizePath = function validPath (path) {
    if (path.length > 1) {
      path = path.replace(/\/{2,}/g, '/')
      path = path.replace(/^\//, '') // Remove potential leading slash.
      if (/[^\/]$/.test( path )) path += '/'; // Include trailing slash.
    }
    else if ( path !== '/' || /\/\//.test(path) )
      throw new Error('Path specified is invalid', arguments)

    return path
  }

  /**
   * @method isValidPath
   * @param path {String}
   * @return {Boolean}
   */
  this.isValidPath = function isValidPath (path) {
    failWhen( isFalsey(path), 'isValidPath() called with invalid arguments.', arguments, 1 )
    return ( /[A-Za-z0-9._~:\-\/?#@!$&'\[\]()*+,;=%]+/g.test(path) )// && /\/\/{0,1}/g.test(path) )
  }

  /**
   * Allows saving of external variables to local variables, by variable name.
   * @method saveThese
   * @param thing {Object or Array}
   * @param list {Array} Is always an array of variable names to permit overwriting.
   */
  this.saveThese = function saveThese (thing, list) {

    failWhen( (notObject(thing) && notArray(thing)) || notArray(list), 'saveThese() called with invalid arguments.', arguments, 3 )

    // Saves a list of values to the variables named in the list array.
    if ( isArray(thing) && isArray(list) ) {
      for (var each in list) {
        if ( isString(list[each]) ) // because each list item needs to be a string which should match a local variable name.
          eval(list[each]+' = thing[each]')
      }
    }

    // This is how we save many values to local variables, taken from the key/value pairs (properties) of thing.
    else if ( isObject(thing) && isArray(list) ) {
      for (var property in thing) {
        if (inArray(property, list))
          eval(property+' = thing[property]')
      }
    }
  }

  /**
   * @method urlParser
   * @param regex {Regex}
   * @param url {String}
   * @param vars {Array}
   */
  this.urlParser = function urlParser (regex, url, vars) {
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
   * @param path {String}
   * @return {Boolean}
   */
  this.isFolder  = function isFolder(path){        return fs.lstatSync( path ).isDirectory()           }

  /**
   * @method isFile
   * @param path {String}
   * @return {Boolean}
   */
  this.isFile = function isFile(path) {

    failWhen( notString(path), 'ifFile requires a string!', path )
    return fs.lstatSync( path ).isFile()
  }
  /**
   * @method filesHere
   * @param path {String}
   * @return {Array}
   */
  this.filesHere = function filesHere(path){       return fs.readdirSync( path )                       }

  /**
   * @method formPath
   * @param path {String}
   * @param file {String}
   * @return {String}
   */
  this.formPath  = function formPath(path, file){  return pth.join( path, file )                       }

  /**
   * @method fileName
   * @param path {String}
   * @return {String}
   */
  this.fileName  = function fileName(path){        return pth.basename(path, type.replace(/^\b/,'.'))  }

  /**
   * @method fileName
   * @param path {String}
   * @return {String}
   */
  this.loadFile  = function fileName(file, encoding) {
    var encode = (isString(encoding)) ? encoding : 'utf8'
    if (isFile(file))
      return fs.readFileSync(file, encoding)
    else
      return null
  }



  return this
}