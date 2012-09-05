
# cookie

  Cookie component.

## Installation

    $ component install component/cookie

## Example

```js
// set
cookie('name', 'tobi')
cookie('name', 'tobi', { path: '/' })
cookie('name', 'tobi', { maxage: 60000 })

// get
var name = cookie('name')

// clear
cookie('name', null)
```

## License

  MIT
