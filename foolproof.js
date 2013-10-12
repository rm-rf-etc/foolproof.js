
/**
 * @module Bulletproof
 * @class Exports
 */
module.exports = function(){


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
   */
  //this.isUndefined = function isUndefined (thing) {   return (typeOf(thing) === 'undefined')  }

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
  this.isTruthy = function isTruthy (thing) {         return !!thing                          }

  /**
   * @method isFalsey
   * @param {any object} thing
   * @return {Boolean}
   */
  this.isFalsey = function isFalsey (thing) {         return !thing                           }

  /**
   * @method notType
   * @param {any object} thing
   * @param {String} type
   * @return {Boolean}
   */
  this.notType = function notType (thing, type) {         return !isType (thing, type)   }

  /**
   */
  // this.notUndefined = function notUndefined (thing) {     return !isUndefined (thing)    }

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


  return this
}