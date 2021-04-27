import React, { Component } from 'react'
// import RepositoryCardFool from '../RepositoryCardFool/RepositoryCardFool'
import RepositoryCardShort from '../RepositoryCardShort/RepositoryCardShort'
import getRepositories from '../api'

class RepositoriesList extends Component{

	state = {
		repositories: []
	}

	// repositoryStars:,
	// lastCommit:,
	// gitHubLink: item.html_url

	componentDidMount(){
		getRepositories()
			.then(res => {
				const repositoriesArr = res.map(item => ({
					repositoryName: item.name,
					repositoryStars: item.stargazers_count,
					lastCommit: item.updated_at,
					gitHubLink: item.html_url,
					// avatarOwner: item.owner.avatar_url,
					// nickName: 'jfhffjf',
					// ownerLink: 'kfnffhff',
					// languages: item.languages_url,
					// description: item.description,
					// contributors: item.contributors_url
				}))

				this.setState({repositories: repositoriesArr})
			})
	}

	render(){
		return (
			<div>
				{this.state.repositories.map(item => {
					return (
						<RepositoryCardShort 
							key={item.repositoryName}
							repositoryName={item.repositoryName}
							repositoryStars={item.repositoryStars}
							lastCommit={item.lastCommit}
							gitHubLink={item.gitHubLink}
						/>
					)
				})}
			</div>
		)
	}
}

export default RepositoriesList