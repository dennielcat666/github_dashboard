import React, { Component } from 'react'
// import RepositoryCardFool from '../RepositoryCardFool/RepositoryCardFool'
import RepositoryCardShort from '../RepositoryCardShort/RepositoryCardShort'
import {getRepositoriesList} from '../api'

class RepositoriesList extends Component{

	state = {
		repositories: [],
		isError: false
	}

	componentDidMount(){
		getRepositoriesList()
			.then(res => {
				const repositoriesArr = res.map(item => ({
					repositoryName: item.name,
					repositoryStars: item.stargazers_count,
					lastCommit: item.updated_at,
					gitHubLink: item.html_url,
					fullName: item.full_name,
				}))

				this.setState({repositories: repositoriesArr})
			})
			.catch(error => {
				console.error('Ошибка: ', error)
				this.setState({isError: true})
			})
	}

	render(){
		if(this.state.isError){
			return (
				<div>Упс {'>_<'}</div>
			)
		}
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
							fullName={item.fullName}
						/>
					)
				})}
			</div>
		)
	}
}

export default RepositoriesList