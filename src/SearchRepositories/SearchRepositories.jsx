import React, { Component } from 'react'
import Button from '../Button/Button'

import styles from './SearchRepositories.module.css';

class SearchRepositories extends Component{
	state = {
		search: ''
	}

	handleChange = (e) => {
		this.setState({search: e.target.value})
	}

	render(){
		return (
			<div className={styles.searchForm}>
				<input type="text" value={this.state.search} onChange={this.handleChange}/>
				<Button>Поиск</Button>
			</div>
		)
	}
}

export default SearchRepositories