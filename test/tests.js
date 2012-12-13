
var cookie = require('cookie');

function assert(expr) {
  if (!expr) throw new Error('assertion failed');
}

afterEach(function(){
  cookie('name', null);
  cookie('species', null);
  cookie('full name', null);
  cookie('type', null);
});

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

  it('should return no cookies', function(){
    var obj = cookie();
    var len = Object.keys(obj).length;
    assert(len === 0);
  })
})