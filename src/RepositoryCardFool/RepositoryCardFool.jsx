import React, { Component } from 'react'
import {getRepository} from '../api'

import styles from './RepositoryCardFool.module.css'

class RepositoryCardFool extends Component{

	state = {
		repositoryName: "",
		repositoryStars: "",
		lastCommit: "",
		avatarOwner: "",
		nickName: "",
		ownerLink: "",
		languages: [],
		description: "",
		contributors: [],
		isError: false
	}

	componentDidMount(){
		const {owner, name} = this.props.match.params
		getRepository(owner, name)
			.then(res => {
				console.log('res', res);
				this.setState({
					repositoryName: res.name,
					repositoryStars: res.stargazers_count,
					lastCommit: res.updated_at,
					avatarOwner: res.owner.avatar_url,
					nickName: res.owner.login,
					ownerLink: res.owner.html_url,
					languages: res.languages,
					description: res.description,
					contributors: res.contributors.slice(0, 10),
				})
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
			<div className={styles.cardFool}>
				<h2 className={styles.cardFoolName}>{this.state.repositoryName}</h2>
				<div>Stars: {this.state.repositoryStars}</div>
				<div>{this.state.lastCommit}</div>
				<div className={styles.cardOwner}>
					<img src={this.state.avatarOwner} className={styles.avatarOwner} />
					<a target='_blank' href={this.state.ownerLink} className={styles.ownerLink}>{this.state.nickName}</a>
				</div>
				<div>
					<p className={styles.headerList}>Используемые языки:</p>
					<ul>
						{Object.entries(this.state.languages).map(([key, value]) => {
							return <li key={key}>{key}: {value}</li>
						})}
					</ul>
				</div>
				<div>Описание: {this.state.description}</div>
				<div>
					<p className={styles.headerList}>10 наиболее активных контрибьютеров: </p>
					<ul className={styles.contributorsList}>
						{this.state.contributors.map(item => {
							return (
								<li key={item.id} className={styles.contributorsListItem}>
									<a target='_blank' href={item.html_url} className={styles.avatarContributorsLink}>
										<img className={styles.avatarContributors} src={item.avatar_url} />
										{item.login}
									</a>
								</li>
							)
						})}
					</ul>
				</div>
			</div>
		)
	}
}

export default RepositoryCardFool