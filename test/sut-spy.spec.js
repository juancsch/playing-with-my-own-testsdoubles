const Sut = require('../src/sut')

describe('My own spy', function () {

	test('should can spying calls to methods', () => {

		// Given
		const collaboratorSpy = {
			called: false,
			doSomethinImportant () {
				this.called = true
			}
		}
		const sut = Sut(collaboratorSpy)

		// When
		sut.neededAcollaboratorMethod()

		// Then
		expect(collaboratorSpy.called).toBeTruthy()
	})
})

function spy (obj, methodName) {

	obj[methodName] = () => {
		this.called = true
	}

	const mySpy = {
		called: false,
		hasBeenCalled: function () {
			return this.called
		}
	}

	return { ...obj, ...mySpy }
}
