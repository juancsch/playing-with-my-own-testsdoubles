
module.exports = function factory (collaborator = { doSomethinImportant () {} }) {

	return {
		neededAcollaboratorMethod () {
			return collaborator.doSomethinImportant()
		},
		notNeededAcollaboratorMethod () {
			return true
		}
	}
}
