// const apiRepositories = "https://api.github.com/repositories"

// function getRepositories() {
// 	return fetch(apiRepositories)
// 			.then(res => res.json())
// 			.catch(error => console.error(error))
// }

// export default getRepositories

const apiRepositories = "https://api.github.com/orgs/facebook/repos"

function getRepositories() {
	return fetch(apiRepositories)
			.then(res => res.json())
			.catch(error => console.error(error))
}

export default getRepositories