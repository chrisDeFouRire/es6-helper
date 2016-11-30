if (Map.prototype.toJSON === undefined) {

	// allows using JSON.stringify on a Map
	// if a map key is an object, an Error is thrown
	Map.prototype.toJSON = function () {
		const obj = new Object(null)
		for (let [key, value] of this) {
			if (typeof key === 'object') {
				throw new Error("Can't stringify a Map if a key is an object")
			}
			obj[key] = value
		}
		return obj
	}

	Set.prototype.toJSON = function () {
		const obj = []
		for (let value of this) {
			obj.push(value)
		}
		return obj
	}

}

const self = module.exports = {
	reviver: function (options = 0) {
		return function (key, value) {
			if (Array.isArray(value)) {
				if ((key === '' && (options & self.SET_ALL) === 0)
					|| (typeof value === 'object' && (options & self.SET_ALL) !== 0)) {

					const set = new Set()
					for (let k in value) {
						set.add(value[k])
					}
					return set
				} //else
				return value
			}
			if ((key === '' && (options & self.MAP_ALL) === 0)
				|| (typeof value === 'object' && (options & self.MAP_ALL) !== 0)) {

				const map = new Map()
				for (let k in value) {
					map.set(k, value[k])
				}
				return map
			} //else
			return value
		}
	},
	MAP_ALL: 1,
	SET_ALL: 2
}
