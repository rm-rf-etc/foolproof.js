
var fs = require('fs')
var pth = require('path')



/**
 * Allows custom error handling.
 * @class systemLogger
 * @for Exports
 */
var systemLogger = function(){

    /*`'~.,.~'`*\
       private
    \*,.~'`'~.,*/
    var func = caughtOnCamera

    function caughtOnCamera (err) {
        console.log('Level: '+err.lvl, err, err.stack)
        throw err
    }

    /*`'~.,.~'`*\
        public
    \*,.~'`'~.,*/

    /**
     * Call this when everything goes really wrong.
     * @method epicFail
     * @for systemLogger
     * @param msg {String} text that will go into the error.
     * @param lvl {Number} level value that will go into the error.
     * @param typ {Error} optional, include if you don't want a ReferenceError.
     * @param req {Error} optional, for future integration with node server.
     */
    function epicFail (msg, lvl, typ, req) {
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
     * @method use
     * @for systemLogger
     * @param alternate {Function} Set a custom error handler. Will receive an Error object (pass Null to reset).
     */
    function use (alternate) {
        if ( isFunction(alternate) )
            func = alternate
        else if ( isFalsey(alternate) )
            func = caughtOnCamera
    }

    return {
        epicFail: epicFail,
        use: use
    }
}()



/**
 * Die and dump.
 * @method dd
 * @for Exports
 * @param arguments {Arguments}
 */
function dd () { console.log.apply(null, arguments); process.exit() }



/**
 * Just a shorthand for (typeof x === 'undefined').
 *
 * @method E(typeof var)
 * @for Exports
 * @param thing {Variable}
 * @return {Boolean}
 */
function U (/*typeof*/ thing) { return (thing === 'undefined') }
function E (/*typeof*/ thing) { return (thing !== 'undefined') }


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
function ƒ (/*typeof*/ enemy, msg, lvl, typ, req)
{
    var msg = msg || undefined
    var lvl = lvl || undefined
    var typ = typ || undefined

    if (enemy === 'undefined') {
        systemLogger.epicFail(msg, lvl, typ)
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
function failWhen (condition, msg, lvl, typ, req)
{
    var msg = msg || undefined
    var lvl = lvl || undefined
    var typ = typ || undefined

    if ( condition ) {
        systemLogger.epicFail(msg, lvl, typ)
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
function inArray (needle, haystack)
{
    for (var key in haystack)
        if (haystack[key] === needle) return true

    return false
}


/**
 * concatUnique(existing, additional)
 * @method concatUnique
 * @for Exports
 * @param existing {Array}
 * @param additional {Array}
 * @return {Array}
 */
function concatUnique (existing, additional)
{
    if (isArray(additional))
        if (additional.length < 1) return

    if (isArray(existing)) {
        additional = [].concat(additional)
        additional.map(function(each){
        if (!inArray(each,existing))
            existing = existing.concat(each)
        })
    }
    return existing
}


/**
 * findUnique(existing, needles)
 * @method findUnique
 * @for Exports
 * @param needles {Array}
 * @param haystack {Array}
 * @return {Array or Null}
 */
function findUnique (haystack, needles)
{
    if (isArray(needles))
        if (needles.length < 1) return

    if (isArray(haystack)) {
        if (haystack.length < 1) return

        var result = []
        needles = [].concat(needles)
        
        needles.map(function(each){
        if (!inArray(each,haystack))
            result = result.concat(each)
        })
        return (result.length < 1) ? null : result
    }
    return null
}


/**
 * @method removeItem
 * @for Exports
 * @param string {String}
 * @param array {Array}
 * @return {Array or False}
 */
function removeItem (string, array)
{
    if ( inArray(string, array) ) {
        var i = array.indexOf(string)

        if (i !== -1) {
            var result = array
            result.splice(i,1)
            return result
        }
    }
    return array
}


/**
 * @method nameOf
 * @for Exports
 * @param thing {String}
 * @return name {String} of thing
 */
function nameOf (thing)
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
function typeOf (thing)
{
    switch (typeof thing) {
        case 'undefined':
            return 'undefined'
        case 'number':
            if (isNaN(thing)) return 'NaN'
            else return 'number'
        case 'function': return 'function'
        case 'string': return 'string'
        case 'boolean': return 'boolean'
        case 'date': return 'date'
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
function isType (thing, type)
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
function isFunction (thing) { return (typeOf(thing) === 'function') }

/**
 * @method isObject
 * @for Exports
 * @param thing {any object}
 * @return {Boolean}
 */
function isObject (thing) { return (typeOf(thing) === 'object') }

/**
 * @method isBoolean
 * @for Exports
 * @param thing {any object}
 * @return {Boolean}
 */
function isBoolean (thing) { return (typeOf(thing) === 'boolean') }

/**
 * @method isString
 * @for Exports
 * @param thing {any object}
 * @return {Boolean}
 */
function isString (thing) { return (typeOf(thing) === 'string') }

/**
 * @method isRegex
 * @for Exports
 * @param thing {any object}
 * @return {Boolean}
 */
function isRegex (thing) { return (typeOf(thing) === 'regex') }

/**
 * @method isArray
 * @for Exports
 * @param thing {any object}
 * @return {Boolean}
 */
var isArray = Array.isArray

/**
 * @method isNull
 * @for Exports
 * @param thing {any object}
 * @return {Boolean}
 */
function isNull (thing) { return (typeOf(thing) === 'null') }

/**
 * @method isNumber
 * @for Exports
 * @param thing {any object}
 * @return {Boolean}
 */
function isNumber (thing) { return (typeOf(thing) === 'number') }

/**
 * Credit goes to: http://stackoverflow.com/questions/18082/validate-numbers-in-javascript-isnumeric
 * @method isNumeric
 * @for Exports
 * @param thing {any object}
 * @return {Boolean}
 */
function isNumeric (thing) { return !isNaN(parseFloat(thing)) && isFinite(thing) }

/**
 * @method isTruthy
 * @for Exports
 * @param thing {any object}
 * @return {Boolean}
 */
function isTruthy (thing) { return (!isFalsey(thing)) }

/**
 * @method isFalsey
 * @for Exports
 * @param thing {any object}
 * @return {Boolean}
 */
function isFalsey (thing) { return !thing }

/**
 * @method notType
 * @for Exports
 * @param thing {any object}
 * @param type {String}
 * @return {Boolean}
 */
function notType (thing, type) { return !isType (thing, type) }

/**
 * @method notFunction
 * @for Exports
 * @param thing {any object}
 * @return {Boolean}
 */
function notFunction (thing) { return !isFunction (thing) }

/**
 * @method notObject
 * @for Exports
 * @param thing {any object}
 * @return {Boolean}
 */
function notObject (thing) { return !isObject (thing) }

/**
 * @method notBoolean
 * @for Exports
 * @param thing {any object}
 * @return {Boolean}
 */
function notBoolean (thing) { return !isBoolean (thing) }

/**
 * @method notString
 * @for Exports
 * @param thing {any object}
 * @return {Boolean}
 */
function notString (thing) { return !isString (thing) }

/**
 * @method notRegex
 * @for Exports
 * @param thing {any object}
 * @return {Boolean}
 */
function notRegex (thing) { return !isRegex (thing) }

/**
 * @method notArray
 * @for Exports
 * @param thing {any object}
 * @return {Boolean}
 */
function notArray (thing) { return !isArray (thing) }

/**
 * @method notNull
 * @for Exports
 * @param thing {any object}
 * @return {Boolean}
 */
function notNull (thing) { return !isNull (thing) }

/**
 * @method notNull
 * @for Exports
 * @param thing {any object}
 * @return {Boolean}
 */
function notNumber (thing) { return !isNumber (thing) }


/**
 * @method standardizePath
 * @for Exports
 * @param path {any object} thing
 * @return {Boolean}
 */
function standardizePath (path)
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
function isValidPath (path)
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
function notValidPath (path) { return ! isValidPath(path) }

/**
 * @method urlParse
 * @for Exports
 * @param regex {Regex}
 * @param url {String}
 * @param vars {Array}
 */
function urlParse (regex, url, vars)
{
    failWhen( notRegex(regex) || notValidPath(url), 'urlParse() received invalid arguments.', 1 )
    
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

/**
 * @method isFolderSync
 * @for Exports
 * @param path {String}
 * @return {Boolean}
 */
function isFolderSync (path) { return fs.lstatSync( path ).isDirectory() }

/**
 * @method isFileSync
 * @for Exports
 * @param path {String}
 * @return {Boolean}
 */
function isFileSync (path) { return fs.lstatSync( path ).isFile() }
/**
 * @method filesHereSync
 * @for Exports
 * @param path {String}
 * @return {Array}
 */
function filesHereSync (path) { return fs.readdirSync( path ) }

/**
 * @method formPath
 * @for Exports
 * @param path {String}
 * @param file {String}
 * @return {String}
 */
function formPath (path, file) { return pth.join( path, file ) }

/**
 * @method fileName
 * @for Exports
 * @param path {String}
 * @return {String}
 */
function fileName (path) { return pth.basename(path.replace(/\.\w*?$/g, '')) }

/**
 * @method fullPath
 * @for Exports
 * @param path {String}
 * @return {String}
 */
function fullPath (path) { return pth.resolve(path) }

/**
 * @method parentFolder
 * @for Exports
 * @param file {String}
 * @return {String}
 */
function parentFolder (file) { return /\/([^\/]+)\/[^\/]+$/g.exec(fullPath(file)) }

/**
 * @method loadFileSync
 * @for Exports
 * @param file {String}
 * @param encoding {String}
 * @return {String}
 */
function loadFileSync (file, encoding)
{
    var encode = (isString(encoding)) ? encoding : 'utf8'
    if (isFileSync(file))
        return fs.readFileSync(file, encoding)
    else
        return null
}

/**
 * @method loadFile
 * @for Exports
 * @param file {String}
 * @param encoding {String}
 * @return {String}
 */
var loadFile = fs.readFile

/**
 * @method findProperty
 * @for Exports
 * @param obj {Object}
 * @param chain {String}
 */
function findProperty (obj, chain)
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

/**
 * Reimplementation of jQuery's extend method. Only change was to remove support
 * for extending the host object (jQuery) when receiving only a single argument.
 * @method objExtend
 * @for Exports
 * @param obj1 {Object}
 * @param obj2 {Object}
 */
function objExtend (obj1, obj2)
{
    var options, name, src, copy, copyIsArray, clone, target, length, deep

    target = arguments[0] || {}
    i = 1
    deep = false

    // Handle a deep copy situation
    if ( isBoolean(target) ) {
        deep = target

        // skip the boolean and the target
        target = arguments[ i ] || {}
        i++
    }

    // Handle case when target is a string or something (possible in deep copy)
    if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
        target = {}
    }


    if ( arguments.length > 1 ) {

        for ( ; i < arguments.length; i++ ) {
            // Only deal with non-null/undefined values
            if ( (options = arguments[ i ]) != null ) {
                // Extend the base object
                for ( name in options ) {
                    src = target[ name ]
                    copy = options[ name ]

                    // Prevent never-ending loop
                    if ( target === copy ) {
                        continue
                    }

                    // Recurse if we're merging plain objects or arrays
                    if ( deep && copy && ( isObject(copy) || (copyIsArray = isArray(copy)) ) ) {
                        if ( copyIsArray ) {
                            copyIsArray = false
                            clone = src && isArray(src) ? src : []
                        }
                        else
                            clone = src && isObject(src) ? src : {}

                        // Never move original objects, clone them
                        target[ name ] = extend( deep, clone, copy )

                    // Don't bring in undefined values
                    }
                    else if ( copy !== undefined )
                        target[ name ] = copy
                }
            }
        }
    }
    // Return the modified object
    return target
}

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

function attachMethod (object, name, method)
{
    Object.defineProperty(object, name, {
        value: method,
        writable: false,
        enumerable: false,
        configurable: false
    })
}


/**
 * @module foolproof
 * @class Exports
 */
exports.extend = function (mutable, object) {

    if (typeof object === 'undefined')
        object = mutable

    mutable = (typeof mutable === 'boolean') ? mutable : false

    object = (typeof root === 'undefined')
        ? object || new Object
        : root

    if (mutable)
        for (var name in methods) object[name] = methods[name]
    else
        for (var name in methods) attachMethod(object, name, methods[name], mutable)

    // Level 0 is the worst possible error level. 1 is default for really bad.
    ReferenceError.prototype.lvl = 1

    return object
}