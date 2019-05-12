const Sut = require('../src/sut')
const Collaborator = require('../src/collaborator')

describe('My own mock', function () {

	test('should can verify calls to methods', () => {

		const collaboratorMock = {
			called: false,
			doSomethinImportant() {
				this.called = true;
				return true;
			},
			verify () {
				return this.called
			}
		}
		const sut = Sut(collaboratorMock)

		sut.neededAcollaboratorMethod()

		expect(collaboratorMock.verify()).toBeTruthy()
	})
})
