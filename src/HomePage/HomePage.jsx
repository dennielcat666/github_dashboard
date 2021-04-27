import React, { Component } from 'react'
import SearchRepositories from '../SearchRepositories/SearchRepositories'
import Button from '../Button/Button'
// import RepCard from '../RepCard/RepCard'
import RepositoriesList from '../RepositoriesList/RepositoriesList'

class HomePage extends Component{
	state = {
		search: ''
	}

	handleChange = (e) => {
		this.setState({search: e.target.value})
	}

	render(){
		return (
			<div>
				<SearchRepositories value={this.state.search} onChange={this.handleChange}/>
				<Button>Поиск</Button>
				<RepositoriesList/>
			</div>
		)
	}
}

export default HomePage