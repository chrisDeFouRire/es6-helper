## ES6 Helpers

This package tries to alleviate a few points with ES6 Map and Set types...

### Install

To install, use 

```
$ npm install es6-helper --save
```

and `const helper = require('es6-helper')`. The module modifies Map and Set prototypes.

### JSON.stringify(Map | Set)

Map and Set lack JSON serialization features... es6-helper helps!

```
const helper = require('es6-helper')

const map = new Map(); map.set("key", "value");
JSON.stringify(map)

const set = new Set(); set.add("hello"); set.add("world");
JSON.stringify(set)
```
now gives `'{"key":"value"}'` and `["hello", "world"]`. Maps of Maps also work fine, as do Sets of Sets and any mix you can think of.
However, Maps can use an object as the key of an entry, which doesn't translate to JSON, where keys must be strings. In this case, an exception
will be thrown.

### JSON.parse() to Maps and Sets

The opposite feature, parsing JSON to a Map or Set instead of an object or array, is also supported, through a so-called
reviver.

```
const helper = require('es6-helper')

const mapjson = '{"key":"value"}'
JSON.parse(mapjson, helper.reviver())

const setjson = '["hello","world"]'
JSON.parse(setjson, helper.reviver())
```
now gives you `Map { 'key' => 'value' }` and `Set { 'hello', 'world' }`.
By default, only the first level is revived to a Map or a Set, but you can choose to use Map or Set at any level instead of objects and arrays, 
by using `helper.reviver(helper.MAP_ALL | helper.SET_ALL)`


