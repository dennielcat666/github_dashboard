const apiRepositories = "https://api.github.com/orgs/facebook/repos"

export function getRepositoriesList() {
	return fetch(apiRepositories)
			.then(res => res.json())
}

const apiRepository = "https://api.github.com/repos/"

export function getRepository(owner, name) {
	return Promise.all([
		fetch(`${apiRepository}${owner}/${name}`),
		fetch(`${apiRepository}${owner}/${name}/languages`),
		fetch(`${apiRepository}${owner}/${name}/contributors`)
	])
	.then(res => Promise.all(res.map(item => item.json())))
	.then(res => ({
		...res[0],
		languages: res[1],
		contributors: res[2]
	}))
}

const apiForSearch = "https://api.github.com/search/repositories"

export function searchRepository(q, page = 1, perPage = 10) {
	return fetch(`${apiForSearch}?q=${q}&page=${page}&per_page=${perPage}`)
		.then(res => res.json())
}

