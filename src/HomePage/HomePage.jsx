import React, { Component } from 'react'
import SearchRep from '../SearchRep/SearchRep'
import Button from '../Button/Button'
// import RepCard from '../RepCard/RepCard'
import RepList from '../RepList/RepList'

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
				<SearchRep value={this.state.search} onChange={this.handleChange}/>
				<Button>Поиск</Button>
				{/* <RepCard/> */}
				<RepList/>
			</div>
		)
	}
}

export default HomePage