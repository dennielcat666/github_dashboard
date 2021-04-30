import React, { Component } from 'react'
import {Link} from "react-router-dom";
import RepositoryCardShort from '../RepositoryCardShort/RepositoryCardShort'
import Button from '../Button/Button'
import {getRepositoriesList} from '../api'

import styles from './RepositoriesList.module.css';

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
				<Link to={'/search'}><Button className={styles.searchLink}>Поиск</Button></Link>
				<div className={styles.reposList}>
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
			</div>
			
		)
	}
}

export default RepositoriesList