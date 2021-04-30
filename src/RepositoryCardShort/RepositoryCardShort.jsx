import React, { Component } from 'react'
import {Link} from "react-router-dom";

import styles from './RepositoryCardShort.module.css'

class RepositoryCardShort extends Component{

	render(){
		const {repositoryName, repositoryStars, lastCommit, gitHubLink, fullName} = this.props
		return (
			<div className={styles.cardShort}>
				<Link className={styles.nameLink} to={fullName}>{repositoryName}</Link>
				<div>Stars: {repositoryStars}</div>
				<div>{lastCommit}</div>
				<a target='_blank' href={gitHubLink} className={styles.gitHubLink}>GitHub</a>
			</div>
		)
	}
}

export default RepositoryCardShort