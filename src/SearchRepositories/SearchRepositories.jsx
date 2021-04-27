import React, { Component } from 'react'

class SearchRepositories extends Component{
	render(){
		const {value, onChange} = this.props
		return (
			<input type="text" value={value} onChange={onChange}/>
		)
	}
}

export default SearchRepositories