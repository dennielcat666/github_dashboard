// const apiRepositories = "https://api.github.com/repositories"

// function getRepositories() {
// 	return fetch(apiRepositories)
// 			.then(res => res.json())
// 			.catch(error => console.error(error))
// }

// export default getRepositories

const apiRepositories = "https://api.github.com/orgs/facebook/repos"

export function getRepositoriesList() {
	return fetch(apiRepositories)
			.then(res => res.json())
			.catch(error => console.error(error))
}

const apiRepository = "https://api.github.com/repos/"

export function getRepository(owner, name) {
	return fetch(`${apiRepository}${owner}/${name}`)
		.then(res => res.json())
		.catch(error => console.error(error))
}