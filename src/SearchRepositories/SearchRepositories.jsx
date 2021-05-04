import React, { Component } from 'react'
import Button from '../Button/Button'
import RepositoryCardShort from '../RepositoryCardShort/RepositoryCardShort'
import ReactPaginate from 'react-paginate'
import {searchRepository} from '../api'

import styles from './SearchRepositories.module.css';

const PER_PAGE = 10

class SearchRepositories extends Component{
	state = {
		repositories: [],
		search: '',
		isError: false,
		pageCount: 0
	}

	handleChange = (e) => {
		this.setState({search: e.target.value})
	}

	handleClick = (page) => {
		console.log('page', page);
		const {search} = this.state
		const pageCheck = page.selected ? page.selected : 0
		searchRepository(search, pageCheck, PER_PAGE)
		.then(res => {
			console.log('search', res);
			const repositoriesArr = res.items.map(item => ({
				repositoryID: item.id,
				repositoryName: item.name,
				repositoryStars: item.stargazers_count,
				lastCommit: item.updated_at,
				gitHubLink: item.html_url,
				fullName: item.full_name,
			}))
			this.setState({repositories: repositoriesArr, pageCount: Math.floor(res.total_count/PER_PAGE)});
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
				{(this.state.repositories.length >= 1) ? <ReactPaginate
												pageCount={this.state.pageCount}
												pageRangeDisplayed={9}
												marginPagesDisplayed={1}
												onPageChange={this.handleClick}
											/> : null}
			</div>
			
		)
	}
}

export default SearchRepositories