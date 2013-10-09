
/**
 * @module Bulletproof
 * @class Exports
 */
module.exports = function(){

  /**
   * @method failWhen
   * @param {Boolean} condition
   * @param {Array} args
   * @param {String} msg
   * @param {String} level
   */
   // @throws {Error}
  this.failWhen = function failWhen (condition, args, msg, level) {
    if (isTruthy(condition)) {
      var msg = (isString(msg)) ? msg : 'Helper received invalid arguments.'
      var level = (isString(level)) ? level : 'warn'
      // log(msg, args, level)
      throw new Error(msg, args)
    }
  }

  /**
   * @method inArray
   * @param {String}
   * @return {Boolean}
   */
  this.inArray = function inArray (needle, haystack) {
    for (var key in haystack)
      if (haystack[key] === needle) return true

    return false
  }

  /**
   * @method typeOf
   * @param {String} thing
   * @return {String} type Lower case only.
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
   * @param {any object} thing
   * @param {String} type
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
   * @param {any object} thing
   * @return {Boolean}
   */
  this.isUndefined = function isUndefined (thing) {   return (typeOf(thing) === 'undefined')  }

  /**
   * @method isFunction
   * @param {any object} thing
   * @return {Boolean}
   */
  this.isFunction = function isFunction (thing) {     return (typeOf(thing) === 'function')   }

  /**
   * @method isObject
   * @param {any object} thing
   * @return {Boolean}
   */
  this.isObject = function isObject (thing) {         return (typeOf(thing) === 'object')     }

  /**
   * @method isString
   * @param {any object} thing
   * @return {Boolean}
   */
  this.isString = function isString (thing) {         return (typeOf(thing) === 'string')     }

  /**
   * @method isRegex
   * @param {any object} thing
   * @return {Boolean}
   */
  this.isRegex = function isRegex (thing) {           return (typeOf(thing) === 'regex')      }

  /**
   * @method isArray
   * @param {any object} thing
   * @return {Boolean}
   */
  this.isArray = function isArray (thing) {           return (typeOf(thing) === 'array')      }

  /**
   * @method isNull
   * @param {any object} thing
   * @return {Boolean}
   */
  this.isNull = function isNull (thing) {             return (typeOf(thing) === 'null')       }

  /**
   * @method isTruthy
   * @param {any object} thing
   * @return {Boolean}
   */
  this.isTruthy = function isTruthy (thing) {         return ( !isFalsey(thing) )             }

  /**
   * @method isFalsey
   * @param {any object} thing
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
   * @param {any object} thing
   * @param {String} type
   * @return {Boolean}
   */
  this.notType = function notType (thing, type) {         return !isType (thing, type)   }

  /**
   * @method notUndefined
   * @param {any object} thing
   * @return {Boolean}
   */
  this.notUndefined = function notUndefined (thing) {     return !isUndefined (thing)    }

  /**
   * @method notFunction
   * @param {any object} thing
   * @return {Boolean}
   */
  this.notFunction = function notFunction (thing) {       return !isFunction (thing)     }

  /**
   * @method notObject
   * @param {any object} thing
   * @return {Boolean}
   */
  this.notObject = function notObject (thing) {           return !isObject (thing)       }

  /**
   * @method notString
   * @param {any object} thing
   * @return {Boolean}
   */
  this.notString = function notString (thing) {           return !isString (thing)       }

  /**
   * @method notRegex
   * @param {any object} thing
   * @return {Boolean}
   */
  this.notRegex = function notRegex (thing) {             return !isRegex (thing)        }

  /**
   * @method notArray
   * @param {any object} thing
   * @return {Boolean}
   */
  this.notArray = function notArray (thing) {             return !isArray (thing)        }

  /**
   * @method notNull
   * @param {any object} thing
   * @return {Boolean}
   */
  this.notNull = function notNull (thing) {               return !isNull (thing)         }


  /**
   * @method standardizePath
   * @param {any object} thing path
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
   * @param {String} path
   * @return {Boolean}
   */
  this.isValidPath = function isValidPath (path) {
    failWhen( isFalsey(path), path )
    return ( /[A-Za-z0-9._~:\-\/?#@!$&'\[\]()*+,;=%]+/g.test(path) )// && /\/\/{0,1}/g.test(path) )
  }

  /**
   * @method saveAsLocal
   * @param {Array or String} args
   * @param {Array} params
   */
  this.saveAsLocal = function saveAsLocal (args, params) {
    failWhen( !isString(args) && !isObject(args) && !isArray(params), type, arguments )

    if ( isString(args) && isArray(params) )
      if (inArray(args, params))
        eval(arg+' = '+params)

    else if ( isObject(args) && isArray(params) )
      for (var arg in args)
        if (inArray(arg, params))
          eval(arg+' = args[arg]')
  }

  /**
   * @method urlParser
   * @param {Regex} regex
   * @param {String} url
   * @param {Array} vars
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
   * @param {String} path
   * @return {Boolean}
   */
  this.isFolder  = function isFolder(path){        return fs.lstatSync( path ).isDirectory()           }
  /**
   * @method isFile
   * @param {String} path
   * @return {Boolean}
   */
  this.isFile    = function isFile(path){          return fs.lstatSync( path ).isFile()                }
  /**
   * @method filesHere
   * @param {String} path
   * @return {Array}
   */
  this.filesHere = function filesHere(path){       return fs.readdirSync( path )                       }
  /**
   * @method formPath
   * @param {String} path
   * @param {String} file
   * @return {String}
   */
  this.formPath  = function formPath(path, file){  return pth.join( path, file )                       }
  /**
   * @method fileName
   * @param {String} path
   * @return {String}
   */
  this.fileName  = function fileName(path){        return pth.basename(path, type.replace(/^\b/,'.'))  }

  return this
}