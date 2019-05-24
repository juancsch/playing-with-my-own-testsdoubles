const Sut = require('../src/sut')

describe('My own stub', function () {

	test('should return a premade answer', () => {

		// Given
		const collaboratorStub = {
			valueStubed: true,
			doSomethinImportant () {
				return this.valueStubed
			}
		}
		const sut = Sut(collaboratorStub)

		// When
		const actual = sut.neededAcollaboratorMethod()

		// Then
		expect(actual).toBeTruthy()
	})

	test('should ...', () => {

		// Given
		const stubbedValue = 5
		function collaboratorStub () {
			return stubbedValue
		}
		const sut = Sut(collaboratorStub)

		// When
		const actual = sut.neededAcollaboratorMethod()

		// Then
		expect(actual).toBe(stubbedValue)
	})
})
