
var cookie = require('..');
var assert = require('assert');

describe('cookie(name, value)', function(){
  it('should set a cookie', function(){
    cookie('name', 'tobi');
    assert('tobi' == cookie('name'));

    cookie('species', 'ferret');
    assert('ferret' == cookie('species'));
  })

  it('should escape', function(){
    cookie('name', 'tobi ferret');
    assert(~document.cookie.indexOf('name=tobi%20ferret'));
  })

  it('should unescape', function(){
    cookie('full name', 'tobi ferret');
    assert('tobi ferret' == cookie('full name'));
  })

  it('should ignore URIError', function(){
    cookie('bad', '%');
    cookie('bad', null);
  });

  describe('when undefined', function(){
    it('should return undefined', function(){
      assert(undefined === cookie('whatever'));
    })
  })
})

describe('cookie(name, null)', function(){
  it('should clear the cookie', function(){
    cookie('type', 'ferret');
    cookie('type', null);
    assert(undefined === cookie('type'));
  })

  it('should not be returned in the cookie() object', function(){
    cookie('full name', null);
    cookie('mydb', null);
    cookie('species', null);
    cookie('name', '0');
    var obj = cookie();
    assert(1 == Object.keys(obj).length);
    assert('0' == obj.name);
  });

  it('should ignore URIError and return null', function(){
    document.cookie = 'bad=%';
    assert(null == cookie('bad'));
  });
})

describe('cookie()', function(){
  it('should return all cookies', function(){
    cookie('name', 'loki');
    cookie('species', 'ferret');
    var obj = cookie();
    assert(obj, 'object was not returned');
    assert('loki' == obj.name, '.name failed');
    assert('ferret' == obj.species, '.species failed');
  })

  it('should return all cookies and ignore URIErrors', function(){
    cookie('name', 'loki');
    cookie('species', 'ferret');
    document.cookie = 'bad=%';
    var obj = cookie();
    assert('loki' == obj.name, '.name failed');
    assert('ferret' == obj.species, '.species failed');
    assert(null == obj.bad);
  });
})
