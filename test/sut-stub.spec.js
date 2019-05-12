const Sut = require('../src/sut')

describe('My own stub', function () {

	test('should return a premade answer', () => {

		const valueStubed = true
		const collaboratorStub = {
			doSomethinImportant () {
				return valueStubed
			}
		}
		const sut = Sut(collaboratorStub)

		const actual = sut.neededAcollaboratorMethod()

		expect(actual).toBeTruthy()
	})
})
