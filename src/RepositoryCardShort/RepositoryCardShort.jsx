import React, { Component } from 'react'

class RepositoryCardShort extends Component{

	render(){
		const {repositoryName, repositoryStars, lastCommit, gitHubLink} = this.props
		return (
			<div>
				<div>{repositoryName}</div>
				<div>{repositoryStars}</div>
				<div>{lastCommit}</div>
				<div>{gitHubLink}</div>
			</div>
		)
	}
}

export default RepositoryCardShort