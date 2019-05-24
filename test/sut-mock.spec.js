const Sut = require('../src/sut')

describe('My own mock', function () {

	test('should can verify calls to methods', () => {

		// Given
		const collaboratorMock = {
			called: false,
			doSomethinImportant () {
				this.called = true
				return true
			},
			verify () {
				return this.called
			}
		}
		const sut = Sut(collaboratorMock)

		// When
		sut.neededAcollaboratorMethod()

		// When
		expect(collaboratorMock.verify()).toBeTruthy()
	})
})
