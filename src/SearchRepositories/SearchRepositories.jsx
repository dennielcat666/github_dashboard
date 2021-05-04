import React, { Component } from 'react'
import Button from '../Button/Button'
import RepositoryCardShort from '../RepositoryCardShort/RepositoryCardShort'
import {searchRepository} from '../api'

import styles from './SearchRepositories.module.css';

class SearchRepositories extends Component{
	state = {
		repositories: [],
		search: '',
		isError: false
	}

	handleChange = (e) => {
		this.setState({search: e.target.value})
	}

	handleClick = () => {
		const {search} = this.state
		searchRepository(search)
		.then(res => {
			const repositoriesArr = res.items.map(item => ({
				repositoryID: item.id,
				repositoryName: item.name,
				repositoryStars: item.stargazers_count,
				lastCommit: item.updated_at,
				gitHubLink: item.html_url,
				fullName: item.full_name,
			}))
			this.setState({repositories: repositoriesArr});
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
				<div className={styles.searchForm}>
					<input type="text" value={this.state.search} onChange={this.handleChange}/>
					<Button onClick={this.handleClick}>Поиск</Button>
				</div>
				<div className={styles.searchList}>
					{this.state.repositories.map(item => {
						return (
							<RepositoryCardShort 
								key={item.repositoryID}
								repositoryName={item.repositoryName}
								repositoryStars={item.repositoryStars}
								lastCommit={item.lastCommit}
								gitHubLink={item.gitHubLink}
								fullName={item.fullName}
							/>
						)
					})}
				</div>
			</div>
			
		)
	}
}

export default SearchRepositories