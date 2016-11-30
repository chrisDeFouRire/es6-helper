const helper = require('./index.js')
const should = require('should')

describe('es6-helper test suite', function() {

	describe('Map', function() {

		it('should convert to json object', function() {
			const map = new Map()
			map.set("a", 1)
			should(JSON.stringify(map)).eql('{"a":1}')
		})

		it("shouldn't stringify key if a map key is an object", function() {
			const map = new Map()
			map.set({a:1}, 1)
			should.throws( ()=> JSON.stringify(map))
		})

		it('should revive as a Map at only one level', function() {
			const string = JSON.stringify({a:1, b: 2, c:{ d:4, e:5}})
			const map = JSON.parse(string, helper.reviver())
			should(map.get("a")).eql(1)
			should(map.get("b")).eql(2)
			should(map.get("c")).deepEqual({ d:4, e:5})
		})

		it('should revive as Maps only', function() {
			const string = JSON.stringify({a:1, b: 2, c:{ d:4, e:5}})
			const map = JSON.parse(string, helper.reviver(helper.MAP_ALL))
			should(map.get("a")).eql(1)
			should(map.get("b")).eql(2)
			should(map.get("c").get("d")).eql(4)
			should(map.get("c").get("e")).eql(5)
		})

		it('should revive as Maps only and not fail on arrays', function() {
			const string = JSON.stringify({a:1, b: 2, c:[4,5]})
			const map = JSON.parse(string, helper.reviver(helper.MAP_ALL))
			should(map.get("a")).eql(1)
			should(map.get("b")).eql(2)
			should(map.get("c")).deepEqual([4,5])
		})

	})

	describe('Set', function() {

		it ('should convert to json array', function() {
			const s = new Set()
			s.add("hello");
			s.add("world");
			should(JSON.stringify(s)).deepEqual('["hello","world"]')
		})

		it ('should revive to Set', function() {
			const json = '["hello","world"]'
			const set = JSON.parse(json, helper.reviver())
			should(set.has('hello'))
			should(set.has('world'))
		})

		it ('should revive to a Set of arrays', function() {
			const json = '[["array"]]'
			const set = JSON.parse(json, helper.reviver())
			should(set.has(["array"]))
		})

		it ('should revive to all sets', function() {
			const json = '[["a", "set"], ["this", "too"]]'
			const set = JSON.parse(json, helper.reviver(helper.SET_ALL))
			should(set.size).eql(2)
			for (let eachSet of set) {
				should(eachSet.size).eql(2)
			}
		})

		it ('should revive to map of sets', function() {
			const json = '{"a":["a", "set"],"b":["this", "too"]}'
			const map = JSON.parse(json, helper.reviver(helper.SET_ALL))
			should(map.size).eql(2)
			for (let [key,eachSet] of map) {
				should(eachSet.size).eql(2)
			}
		})

		it ('should revive to map of arrays', function() {
			const json = '{"a":["a", "set"],"b":["this", "too"]}'
			const map = JSON.parse(json, helper.reviver())
			should(map.size).eql(2)
			for (let [key,eachArray] of map) {
				should(eachArray.length).eql(2)
			}
		})
	})

})