
var cookie = require('cookie');

function assert(expr) {
  if (!expr) throw new Error('assertion failed');
}

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