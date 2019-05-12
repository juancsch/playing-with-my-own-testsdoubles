const Sut = require('../src/sut')

describe('My own dummy', function () {

	test('should do not any thing', () => {

		const dummy = {}
		const sut = Sut(dummy)

		const actual = sut.notNeededAcollaboratorMethod()

		expect(actual).toBeTruthy()
	})
})
