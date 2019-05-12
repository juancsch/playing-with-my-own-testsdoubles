const Sut = require('../src/sut')

describe('My own spy', function () {

	test('should can spying calls to methods', () => {

		const collaboratorSpy = {
			called: false,
			doSomethinImportant () {
				this.called = true
			}
		}
		const sut = Sut(collaboratorSpy)

		sut.neededAcollaboratorMethod()

		expect(collaboratorSpy.called).toBeTruthy()
	})
})
