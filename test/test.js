
var expect = require('expect.js')
var check = its = it

function Thing (){ return this }
var newThing = new Thing()


;(function(){
  require('../foolproof').apply(this)



  /**
   *
   */
  describe('Helpers',function(){
    it('Created expected methods in this context.',function(){

      expect( SystemLogger ).to.be.an( 'object' )

      expect( ƒ ).to.be.a( 'function' )
      expect( E ).to.be.a( 'function' )
      expect( failWhen ).to.be.a( 'function' )

      expect( inArray ).to.be.a( 'function' )
      expect( typeOf ).to.be.a( 'function' )
      expect( isType ).to.be.a( 'function' )

      expect( isFunction ).to.be.a( 'function' )
      expect( isObject ).to.be.a( 'function' )
      expect( isString ).to.be.a( 'function' )
      expect( isRegex ).to.be.a( 'function' )
      expect( isArray ).to.be.a( 'function' )
      expect( isNull ).to.be.a( 'function' )
      expect( isTruthy ).to.be.a( 'function' )
      expect( isFalsey ).to.be.a( 'function' )

      expect( notFunction ).to.be.a( 'function' )
      expect( notObject ).to.be.a( 'function' )
      expect( notString ).to.be.a( 'function' )
      expect( notRegex ).to.be.a( 'function' )
      expect( notArray ).to.be.a( 'function' )
      expect( notNull ).to.be.a( 'function' )

      expect( standardizePath ).to.be.a( 'function' )
      expect( isValidPath ).to.be.a( 'function' )
      expect( saveThese ).to.be.a( 'function' )
      expect( urlParser ).to.be.a( 'function' )
      expect( isFolder ).to.be.a( 'function' )
      expect( isFile ).to.be.a( 'function' )
      expect( filesHere ).to.be.a( 'function' )
      expect( formPath ).to.be.a( 'function' )
      expect( fileName ).to.be.a( 'function' )
      /*
      */
    })
  })

  describe('SystemLogger',function(){
    it('Exists as an object.',function(){
      expect( SystemLogger ).to.be.an('object')
    })
    it('Has expected methods, Use() and EpicFail().',function(){
      expect( SystemLogger ).to.have.property( 'Use' )
      expect( SystemLogger ).to.have.property( 'EpicFail' )
    })
  })



  /**
   *
   */
  describe('ƒ(typeof var), a fail-fast method',function(){
    it('can properly detect, handle, and throw reference errors.',function(){

      SystemLogger.Use(function(){
        throw new ReferenceError()
      })

      expect(function(){ ƒ(typeof whatever) }).to.throwError(function(e){
        expect( e ).to.be.a(ReferenceError)
        expect( e ).to.not.be.a(SyntaxError)
      })
      expect(function(){ ƒ(typeof undefined) }).to.throwError()
      expect(function(){ ƒ('undefined') }).to.throwError()
    })


    it('invokes the predefined error handler.',function(done){
      var msg = 'Send this out, expect() to get it back.'

      function customErrorHandler (err) {
        console.log('\nLevel: '+err.lvl, '\n'+err.stack)
        expect( err ).to.be.a( ReferenceError )
        expect( err.message ).to.be( msg )

        done()
      }

      SystemLogger.Use(customErrorHandler)
      expect( ƒ(typeof whatever, msg) ).to.be( false )
    })
  })



  /**
   *
   */
  describe('E(typeof var), the existential method.',function(){
    it('Evaluates to true when expected.',function(){
      expect( E(typeof whatever) ).to.be( true )
      expect( E(typeof undefined) ).to.be( true )
      expect( E(typeof void 0) ).to.be( true )
      expect( E('undefined') ).to.be( true )
    })
    it('Evaluates to false when expected.',function(){
      expect( E(typeof SystemLogger) ).to.be( false )
      expect( E(typeof new RegExp('')) ).to.be( false )
      expect( E(typeof /^.$/g) ).to.be( false )
      expect( E(typeof E) ).to.be( false )
      expect( E(typeof {}) ).to.be( false )
      expect( E(typeof []) ).to.be( false )
      expect( E(typeof NaN) ).to.be( false )
      expect( E(typeof 1) ).to.be( false )
      expect( E(typeof 0) ).to.be( false )
      expect( E(typeof '') ).to.be( false )
    })
  })



  /**
   *
   */
  describe.only('failWhen(), a fail-fast method.',function(){
    it('Properly detect, handle, and throw reference errors.',function(){

      SystemLogger.Use(function(){
        throw new ReferenceError()
      })

      expect(function(){
        failWhen( E(typeof whatever) )
      }).to.throwError(function(e){
        expect( e ).to.be.a(ReferenceError)
        expect( e ).to.not.be.a(SyntaxError)
      })


      expect(function(){
        failWhen( E(typeof undefined) )
      }).to.throwError()


      expect(function(){
        failWhen( E('undefined') )
      }).to.throwError()
    })


    it('Invokes the predefined error handler.',function(done){
      var msg = 'Send this out, expect() to get it back.'

      function customErrorHandler (err) {
        console.log('\nLevel: '+err.lvl, '\n'+err.stack)
        expect( err ).to.be.a( ReferenceError )
        expect( err.message ).to.be( msg )

        done()
      }

      SystemLogger.Use(customErrorHandler)
      expect( failWhen( E(typeof whatever), msg) ).to.be( false )
    })

    var msg = 'Send this out, expect() to get it back.'

    it('Throws whatever error object it is given.',function(done){
      SystemLogger.Use(function (err) {
        expect( err ).to.be.a( ReferenceError )
        expect( err.lvl ).to.be( 1 )
        go2()
      })
      expect( failWhen( E(typeof whatever), msg, 1, ReferenceError) ).to.be( false )

      function go2(){
        SystemLogger.Use(function (err) {
          expect( err ).to.be.a( SyntaxError )
          expect( err.lvl ).to.be( 1 )
          go3()
        })
        expect( failWhen( E(typeof whatever), msg, 1, SyntaxError) ).to.be( false )
      }

      function go3(){
        SystemLogger.Use(function (err) {
          expect( err ).to.be.a( EvalError )
          expect( err.lvl ).to.be( 1 )
          go4()
        })
        expect( failWhen( E(typeof whatever), msg, 1, EvalError) ).to.be( false )
      }
      function go4(){
        SystemLogger.Use(function (err) {
          expect( err ).to.be.a( RangeError )
          expect( err.lvl ).to.be( 1 )
          go5()
        })
        expect( failWhen( E(typeof whatever), msg, 1, RangeError) ).to.be( false )
      }
      function go5(){
        SystemLogger.Use(function (err) {
          expect( err ).to.be.a( TypeError )
          expect( err.lvl ).to.be( 1 )
          go6()
        })
        expect( failWhen( E(typeof whatever), msg, 1, TypeError) ).to.be( false )
      }
      function go6(){
        SystemLogger.Use(function (err) {
          expect( err ).to.be.a( URIError )
          expect( err.lvl ).to.be( 1 )
          done()
        })
        expect( failWhen( E(typeof whatever), msg, 1, URIError) ).to.be( false )
      }
    })
  })

  

  /**
   *
   */
  describe.skip('type checkers,',function(){
    check('typeOf returns true or false',function(){
      expect( typeOf('stuff') ).to.be('string')
      expect( typeOf('') ).to.be('string')
      expect( typeOf({}) ).to.be('object')
      expect( typeOf(newThing) ).to.be('object')
      expect( typeOf(NaN) ).to.be('NaN')
      expect( typeOf(function(){}) ).to.be('function')
      expect( typeOf([]) ).to.be('array')
      expect( typeOf(0) ).to.be('number')
      expect( typeOf(null) ).to.be('null')
      expect( typeOf(/$./g) ).to.be('regex')
      expect( typeOf(new RegExp('ab')) ).to.be('regex')
    })
    check('isString returns true or false',function(){
      expect( isString( 'stuff' ) ).to.be(true)
      expect( isString( '' ) ).to.be(true)
      expect( isString({}) ).to.be(false)
      expect( isString(newThing) ).to.be(false)
      expect( isString(NaN) ).to.be(false)
      expect( isString(function(){}) ).to.be(false)
      expect( isString([]) ).to.be(false)
      expect( isString(-0) ).to.be(false)
      expect( isString(0) ).to.be(false)
      expect( isString(1) ).to.be(false)
      expect( isString(5) ).to.be(false)
      expect( isString(null) ).to.be(false)
      expect( isString(/$./g) ).to.be(false)
      expect( isString(new RegExp('ab')) ).to.be(false)
    })
    check('isType returns true or false',function(){
      expect( isType({}, 'object') ).to.be(true)
      expect( isType(newThing, 'object') ).to.be(true)
      expect( isType('', 'string') ).to.be(true)
      expect( isType('4', 'string') ).to.be(true)
      expect( isType(function(){}, 'function') ).to.be(true)
      expect( isType([], 'array') ).to.be(true)
      expect( isType(3, 'number') ).to.be(true)
      expect( isType(NaN, 'NaN') ).to.be(true)
      expect( isType(null, 'null') ).to.be(true)
      expect( isType(undefined, 'undefined') ).to.be(true)
      expect( isType(void 0, 'undefined') ).to.be(true)
      expect( isType(/$./g, 'regex') ).to.be(true)
      expect( isType(new RegExp('ab'), 'regex') ).to.be(true)

      expect( isType({}, null) ).to.be(false)
      expect( isType(newThing, null) ).to.be(false)
      expect( isType(function(){}, 'object') ).to.be(false)
      expect( isType([], '') ).to.be(false)
      expect( isType(3, 'string') ).to.be(false)
      expect( isType(NaN, undefined) ).to.be(false)
      expect( isType(null, null) ).to.be(false)
      expect( isType(undefined, null) ).to.be(false)
      expect( isType(void 0, NaN) ).to.be(false)
      expect( isType(/$./g, undefined) ).to.be(false)
      expect( isType(new RegExp('ab'), 'object') ).to.be(false)

      expect( isType('', {}) ).to.be(false)
      expect( isType('', newThing) ).to.be(false)
      expect( isType('',function(){}) ).to.be(false)
      expect( isType('', []) ).to.be(false)
      expect( isType('', 3) ).to.be(false)
      expect( isType('', NaN) ).to.be(false)
      expect( isType('', null) ).to.be(false)
      expect( isType('', undefined) ).to.be(false)
      expect( isType('', void 0) ).to.be(false)
      expect( isType('', /$./g) ).to.be(false)
      expect( isType('', new RegExp('ab')) ).to.be(false)
    })
    // check('isUndefined returns true or false',function(){
    //   expect( isUndefined(undefined) ).to.be(true)
    //   expect( isUndefined(void 0) ).to.be(true)
    //   expect( isUndefined((void 0)) ).to.be(true)

    //   expect( isUndefined(0) ).to.be(false)
    //   expect( isUndefined('') ).to.be(false)
    //   expect( isUndefined('4') ).to.be(false)
    //   expect( isUndefined({}) ).to.be(false)
    //   expect( isUndefined(newThing) ).to.be(false)
    //   expect( isUndefined(function(){}) ).to.be(false)
    //   expect( isUndefined([]) ).to.be(false)
    //   expect( isUndefined(3) ).to.be(false)
    //   expect( isUndefined(NaN) ).to.be(false)
    //   expect( isUndefined(null) ).to.be(false)
    //   expect( isUndefined(/$./g) ).to.be(false)
    //   expect( isUndefined(new RegExp('ab')) ).to.be(false)
    // })
    check('isFunction returns true or false',function(){
      expect( isFunction(function(){}) ).to.be(true)

      expect( isFunction('') ).to.be(false)
      expect( isFunction('4') ).to.be(false)
      expect( isFunction(undefined) ).to.be(false)
      expect( isFunction(void 0) ).to.be(false)
      expect( isFunction((void 0)) ).to.be(false)
      expect( isFunction(0) ).to.be(false)
      expect( isFunction({}) ).to.be(false)
      expect( isFunction(newThing) ).to.be(false)
      expect( isFunction([]) ).to.be(false)
      expect( isFunction(3) ).to.be(false)
      expect( isFunction(NaN) ).to.be(false)
      expect( isFunction(null) ).to.be(false)
      expect( isFunction(/$./g) ).to.be(false)
      expect( isFunction(new RegExp('ab')) ).to.be(false)
    })
    check('isObject returns true or false',function(){
      expect( isObject( {} ) ).to.be(true)
      expect( isObject(newThing) ).to.be(true)

      expect( isObject('') ).to.be(false)
      expect( isObject('4') ).to.be(false)
      expect( isObject(undefined) ).to.be(false)
      expect( isObject(void 0) ).to.be(false)
      expect( isObject((void 0)) ).to.be(false)
      expect( isObject(0) ).to.be(false)
      expect( isObject(function(){}) ).to.be(false)
      expect( isObject([]) ).to.be(false)
      expect( isObject(3) ).to.be(false)
      expect( isObject(NaN) ).to.be(false)
      expect( isObject(null) ).to.be(false)
      expect( isObject(/$./g) ).to.be(false)
      expect( isObject(new RegExp('ab')) ).to.be(false)
    })
    check('isRegex returns true or false',function(){
      expect( isRegex(/$./g) ).to.be(true)
      expect( isRegex(new RegExp('ab')) ).to.be(true)

      expect( isRegex( '' ) ).to.be(false)
      expect( isRegex( '4' ) ).to.be(false)
      expect( isRegex( {} ) ).to.be(false)
      expect( isRegex(newThing) ).to.be(false)
      expect( isRegex(undefined) ).to.be(false)
      expect( isRegex(void 0) ).to.be(false)
      expect( isRegex((void 0)) ).to.be(false)
      expect( isRegex(0) ).to.be(false)
      expect( isRegex(function(){}) ).to.be(false)
      expect( isRegex([]) ).to.be(false)
      expect( isRegex(3) ).to.be(false)
      expect( isRegex(NaN) ).to.be(false)
      expect( isRegex(null) ).to.be(false)
    })
    check('isArray returns true or false',function(){
      expect( isArray([]) ).to.be(true)

      expect( isArray('') ).to.be(false)
      expect( isArray('4') ).to.be(false)
      expect( isArray(/$./g) ).to.be(false)
      expect( isArray(new RegExp('ab')) ).to.be(false)
      expect( isArray( {} ) ).to.be(false)
      expect( isArray(newThing) ).to.be(false)
      expect( isArray(undefined) ).to.be(false)
      expect( isArray(void 0) ).to.be(false)
      expect( isArray((void 0)) ).to.be(false)
      expect( isArray(0) ).to.be(false)
      expect( isArray(function(){}) ).to.be(false)
      expect( isArray(3) ).to.be(false)
      expect( isArray(NaN) ).to.be(false)
      expect( isArray(null) ).to.be(false)
    })
    check('isNull returns true or false',function(){
      expect( isNull(null) ).to.be(true)

      expect( isNull('') ).to.be(false)
      expect( isNull('4') ).to.be(false)
      expect( isNull(/$./g) ).to.be(false)
      expect( isNull(new RegExp('ab')) ).to.be(false)
      expect( isNull( {} ) ).to.be(false)
      expect( isNull(newThing) ).to.be(false)
      expect( isNull(undefined) ).to.be(false)
      expect( isNull(void 0) ).to.be(false)
      expect( isNull((void 0)) ).to.be(false)
      expect( isNull(0) ).to.be(false)
      expect( isNull(function(){}) ).to.be(false)
      expect( isNull([]) ).to.be(false)
      expect( isNull(3) ).to.be(false)
      expect( isNull(NaN) ).to.be(false)
    })
    check('isTruthy returns true or false',function(){
      expect( isTruthy('4') ).to.be(true)
      expect( isTruthy(/$./g) ).to.be(true)
      expect( isTruthy(new RegExp('ab')) ).to.be(true)
      expect( isTruthy( {} ) ).to.be(true)
      expect( isTruthy( newThing ) ).to.be(true)
      expect( isTruthy(function(){}) ).to.be(true)
      expect( isTruthy([]) ).to.be(true)
      expect( isTruthy(3) ).to.be(true)
      
      expect( isTruthy('') ).to.be(false)
      expect( isTruthy(undefined) ).to.be(false)
      expect( isTruthy(void 0) ).to.be(false)
      expect( isTruthy((void 0)) ).to.be(false)
      expect( isTruthy(0) ).to.be(false)
      expect( isTruthy(NaN) ).to.be(false)
      expect( isTruthy(null) ).to.be(false)
      expect( isTruthy(0) ).to.be(false)
      expect( isTruthy(-0) ).to.be(false)
    })
    check('isFalsey returns true or false',function(){
      expect( isFalsey('') ).to.be(true)
      expect( isFalsey(undefined) ).to.be(true)
      expect( isFalsey(void 0) ).to.be(true)
      expect( isFalsey((void 0)) ).to.be(true)
      expect( isFalsey(0) ).to.be(true)
      expect( isFalsey(NaN) ).to.be(true)
      expect( isFalsey(null) ).to.be(true)
      
      expect( isFalsey('4') ).to.be(false)
      expect( isFalsey(/$./g) ).to.be(false)
      expect( isFalsey(new RegExp('ab')) ).to.be(false)
      expect( isFalsey( {} ) ).to.be(false)
      expect( isFalsey( newThing ) ).to.be(false)
      expect( isFalsey(function(){}) ).to.be(false)
      expect( isFalsey([]) ).to.be(false)
      expect( isFalsey(3) ).to.be(false)
    })
    // check('notUndefined returns true or false',function(){
    //   expect( notUndefined(undefined) ).to.be(false)
    //   expect( notUndefined(void 0) ).to.be(false)
    //   expect( notUndefined((void 0)) ).to.be(false)

    //   expect( notUndefined(0) ).to.be(true)
    //   expect( notUndefined('') ).to.be(true)
    //   expect( notUndefined('4') ).to.be(true)
    //   expect( notUndefined(/$./g) ).to.be(true)
    //   expect( notUndefined(new RegExp('ab')) ).to.be(true)
    //   expect( notUndefined( {} ) ).to.be(true)
    //   expect( notUndefined( newThing ) ).to.be(true)
    //   expect( notUndefined(function(){}) ).to.be(true)
    //   expect( notUndefined([]) ).to.be(true)
    //   expect( notUndefined(3) ).to.be(true)
    //   expect( notUndefined(NaN) ).to.be(true)
    //   expect( notUndefined(null) ).to.be(true)
    // })
    check('notFunction returns true or false',function(){
      expect( notFunction(function(){}) ).to.be(false)

      expect( notFunction('') ).to.be(true)
      expect( notFunction('4') ).to.be(true)
      expect( notFunction(/$./g) ).to.be(true)
      expect( notFunction(new RegExp('ab')) ).to.be(true)
      expect( notFunction( {} ) ).to.be(true)
      expect( notFunction( newThing ) ).to.be(true)
      expect( notFunction(undefined) ).to.be(true)
      expect( notFunction(void 0) ).to.be(true)
      expect( notFunction((void 0)) ).to.be(true)
      expect( notFunction(0) ).to.be(true)
      expect( notFunction([]) ).to.be(true)
      expect( notFunction(3) ).to.be(true)
      expect( notFunction(NaN) ).to.be(true)
      expect( notFunction(null) ).to.be(true)
    })
    check('notObject returns true or false',function(){
      expect( notObject( {} ) ).to.be(false)
      expect( notObject( newThing ) ).to.be(false)

      expect( notObject('') ).to.be(true)
      expect( notObject('4') ).to.be(true)
      expect( notObject(/$./g) ).to.be(true)
      expect( notObject(new RegExp('ab')) ).to.be(true)
      expect( notObject(undefined) ).to.be(true)
      expect( notObject(void 0) ).to.be(true)
      expect( notObject((void 0)) ).to.be(true)
      expect( notObject(0) ).to.be(true)
      expect( notObject(function(){}) ).to.be(true)
      expect( notObject([]) ).to.be(true)
      expect( notObject(3) ).to.be(true)
      expect( notObject(NaN) ).to.be(true)
      expect( notObject(null) ).to.be(true)
    })
    check('notString returns true or false',function(){
      expect( notString('4') ).to.be(false)
      expect( notString('') ).to.be(false)

      expect( notString(/$./g) ).to.be(true)
      expect( notString(new RegExp('ab')) ).to.be(true)
      expect( notString( {} ) ).to.be(true)
      expect( notString( newThing ) ).to.be(true)
      expect( notString(undefined) ).to.be(true)
      expect( notString(void 0) ).to.be(true)
      expect( notString((void 0)) ).to.be(true)
      expect( notString(0) ).to.be(true)
      expect( notString(function(){}) ).to.be(true)
      expect( notString([]) ).to.be(true)
      expect( notString(3) ).to.be(true)
      expect( notString(NaN) ).to.be(true)
      expect( notString(null) ).to.be(true)
    })
    check('notRegex returns true or false',function(){
      expect( notRegex(/$./g) ).to.be(false)
      expect( notRegex(new RegExp('ab')) ).to.be(false)

      expect( notRegex( '' ) ).to.be(true)
      expect( notRegex( '4' ) ).to.be(true)
      expect( notRegex( {} ) ).to.be(true)
      expect( notRegex( newThing ) ).to.be(true)
      expect( notRegex(undefined) ).to.be(true)
      expect( notRegex(void 0) ).to.be(true)
      expect( notRegex((void 0)) ).to.be(true)
      expect( notRegex(0) ).to.be(true)
      expect( notRegex(function(){}) ).to.be(true)
      expect( notRegex([]) ).to.be(true)
      expect( notRegex(3) ).to.be(true)
      expect( notRegex(NaN) ).to.be(true)
      expect( notRegex(null) ).to.be(true)
    })
    check('notArray returns true or false',function(){
      expect( notArray([]) ).to.be(false)

      expect( notArray('') ).to.be(true)
      expect( notArray('4') ).to.be(true)
      expect( notArray(/$./g) ).to.be(true)
      expect( notArray(new RegExp('ab')) ).to.be(true)
      expect( notArray( {} ) ).to.be(true)
      expect( notArray( newThing ) ).to.be(true)
      expect( notArray(undefined) ).to.be(true)
      expect( notArray(void 0) ).to.be(true)
      expect( notArray((void 0)) ).to.be(true)
      expect( notArray(0) ).to.be(true)
      expect( notArray(function(){}) ).to.be(true)
      expect( notArray(3) ).to.be(true)
      expect( notArray(NaN) ).to.be(true)
      expect( notArray(null) ).to.be(true)
    })
    check('notNull returns true or false',function(){
      expect( notNull(null) ).to.be(false)

      expect( notNull(/$./g) ).to.be(true)
      expect( notNull(new RegExp('ab')) ).to.be(true)
      expect( notNull( {} ) ).to.be(true)
      expect( notNull( newThing ) ).to.be(true)
      expect( notNull(undefined) ).to.be(true)
      expect( notNull(void 0) ).to.be(true)
      expect( notNull((void 0)) ).to.be(true)
      expect( notNull(0) ).to.be(true)
      expect( notNull(function(){}) ).to.be(true)
      expect( notNull([]) ).to.be(true)
      expect( notNull(3) ).to.be(true)
      expect( notNull(NaN) ).to.be(true)
    })
    check('notType returns true or false',function(){
      expect( notType( /$./g,              null ) ).to.be(true)
      expect( notType( new RegExp('ab'),   null ) ).to.be(true)
      expect( notType( {},                 null ) ).to.be(true)
      expect( notType( newThing,           null ) ).to.be(true)
      expect( notType( undefined,          null ) ).to.be(true)
      expect( notType( 0,                  null ) ).to.be(true)
      expect( notType( void 0,             null ) ).to.be(true)
      expect( notType( (void 0),           null ) ).to.be(true)
      expect( notType( function(){},       null ) ).to.be(true)
      expect( notType( [],                 null ) ).to.be(true)
      expect( notType( 3,                  null ) ).to.be(true)
      expect( notType( NaN,                null ) ).to.be(true)
      expect( notType( null,             void 0 ) ).to.be(true)
    })
    check('nameOf matches expected output with case sensativity',function(){
      expect( nameOf(/$./g) ).to.not.be('regexp')
      expect( nameOf(new RegExp('ab')) ).to.not.be('regexp')
      expect( nameOf(newThing) ).to.not.be('thing')
      expect( nameOf({}) ).to.not.be('object')
      expect( nameOf(1) ).to.not.be('number')
      expect( nameOf(0) ).to.not.be('number')
      expect( nameOf(NaN) ).to.not.be('number')
      expect( nameOf('') ).to.not.be('string')
      expect( nameOf('whatever') ).to.not.be('string')
      expect( nameOf(function(){}) ).to.not.be('function')
      expect( nameOf([]) ).to.not.be('array')
      expect( nameOf(null) ).to.not.be('null')
      expect( nameOf(void 0) ).to.not.be('undefined')
      expect( nameOf(undefined) ).to.not.be('undefined')

      expect( nameOf(/$./g) ).to.be('RegExp')
      expect( nameOf(new RegExp('ab')) ).to.be('RegExp')
      expect( nameOf(newThing) ).to.be('Thing')
      expect( nameOf({}) ).to.be('Object')
      expect( nameOf(1) ).to.be('Number')
      expect( nameOf(0) ).to.be('Number')
      expect( nameOf(NaN) ).to.be('Number')
      expect( nameOf('') ).to.be('String')
      expect( nameOf('whatever') ).to.be('String')
      expect( nameOf(function(){}) ).to.be('Function')
      expect( nameOf([]) ).to.be('Array')
      expect( nameOf(null) ).to.be('Null')
      expect( nameOf(void 0) ).to.be('Undefined')
      expect( nameOf(undefined) ).to.be('Undefined')
    })
  })

/*
  var array = [0,1,'20',{},[],null,undefined,NaN,false]


  describe('inArray',function(){
    it('should return true',function(){
      expect( inArray(1, array) ).to.be(true)
      expect( inArray(0, array) ).to.be(true)
      expect( inArray('20', array) ).to.be(true)
      expect( inArray(null, array) ).to.be(true)
      expect( inArray(undefined, array) ).to.be(true)
      expect( inArray(false, array) ).to.be(true)
    })
    it('should return false',function(){
      expect( inArray('', array) ).to.be(false)
      expect( inArray({}, array) ).to.be(false)
      expect( inArray([], array) ).to.be(false)
      expect( inArray(NaN, array) ).to.be(false)
    })
  })



  describe('standardizePath',function(){
    it('should produce path of form a/b/c/, or throw error',function(){
      expect( standardizePath('/stuff//places/things/') ).to.be('stuff/places/things/')
      expect( standardizePath('/stuff//places/things') ).to.be('stuff/places/things/')
      expect( standardizePath('/stuff///places/things') ).to.be('stuff/places/things/')
      expect( standardizePath('///stuff///places//////things///') ).to.be('stuff/places/things/')

      expect( function(){ standardizePath('') } ).to.throwError(/^Path specified is invalid$/g)
    })
  })
  describe('isValidPath',function(){
    it('returns true or false, or throws error.',function(){
      expect( isValidPath('/stuff/places/things/') ).to.be(true)

      expect( isValidPath('/stuff/ places/things/') ).to.be(false)
      expect( isValidPath('/stuff//places/things/') ).to.be(false)
    })
  })
  describe('saveAsLocal',function(){
    //
  })
  describe('urlParser',function(){
    //
  })
  describe('isFolder',function(){
    //
  })
  describe('isFile',function(){
    //
  })
  describe('filesHere',function(){
    //
  })
  describe('formPath',function(){
    //
  })
  describe('fileName',function(){
    //
  })

*/
  return this
})()
