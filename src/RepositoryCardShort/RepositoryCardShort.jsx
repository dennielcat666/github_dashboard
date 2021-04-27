import React, { Component } from 'react'
import {Link} from "react-router-dom";

class RepositoryCardShort extends Component{

	render(){
		const {repositoryName, repositoryStars, lastCommit, gitHubLink, fullName} = this.props
		return (
			<div>
				<Link to={fullName}>{repositoryName}</Link>
				<div>{repositoryStars}</div>
				<div>{lastCommit}</div>
				<div>{gitHubLink}</div>
			</div>
		)
	}
}

export default RepositoryCardShort