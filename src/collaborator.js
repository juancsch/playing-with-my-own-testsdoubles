
module.exports = function factory () {

	return {
		doSomethinImportant () {
			console.log(this.stuff())
			return true
		},
		stuff () {
			return 'very constly'
		}
	}
}
