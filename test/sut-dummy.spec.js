const Sut = require('../src/sut')

describe('My own dummy', function () {

	test('should do not any thing', () => {

		// Given
		const dummy = {
			doSomethinImportant () {}
		}
		const sut = Sut(dummy)

		// Given
		const actual = sut.notNeededAcollaboratorMethod()

		// Then
		expect(actual).toBeTruthy()
	})
})
