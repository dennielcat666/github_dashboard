import React, { Component } from 'react'

class SearchRep extends Component{
	render(){
		const {value, onChange} = this.props
		return (
			<input type="text" value={value} onChange={onChange}/>
		)
	}
}

export default SearchRep