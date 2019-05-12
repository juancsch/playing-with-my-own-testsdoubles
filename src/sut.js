
module.exports = function factory (collaborator) {

	return {
		neededAcollaboratorMethod () {
			return collaborator.doSomethinImportant()
		},
		notNeededAcollaboratorMethod () {
			return true
		}
	}
}
