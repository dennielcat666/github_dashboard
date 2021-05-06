import React, { Component } from 'react'
import Oops from '../Oops/Oops'
import {getRepository} from '../api'

import styles from './RepositoryCardFool.module.css'

class RepositoryCardFool extends Component{

	state = {
		repositoryName: "",
		gitHubLink: "",
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
				const sumLanguages = Object.values(res.languages).reduce((acc, item) => (acc + item), 0)
				const interestLanguages = Object.entries(res.languages).reduce((acc, [key, value]) => ([
					...acc,
					{
						name: key,
						value: (value * 100 / sumLanguages).toFixed(2)
					}
				]), [])
				this.setState({
					repositoryName: res.name,
					gitHubLink: res.html_url,
					repositoryStars: res.stargazers_count,
					lastCommit: res.updated_at,
					avatarOwner: res.owner.avatar_url,
					nickName: res.owner.login,
					ownerLink: res.owner.html_url,
					languages: interestLanguages,
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
				<Oops/>
			)
		}
		return (
			<div className={styles.cardFool}>
				<h2 ><a className={styles.cardFoolName} target='_blank' href={this.state.gitHubLink}>{this.state.repositoryName}</a></h2>
				<div>Stars: {this.state.repositoryStars}</div>
				<div>{this.state.lastCommit}</div>
				<div className={styles.cardOwner}>
					<img src={this.state.avatarOwner} className={styles.avatarOwner} />
					<a target='_blank' href={this.state.ownerLink} className={styles.ownerLink}>{this.state.nickName}</a>
				</div>
				<div className={styles.languagesBlok}>
					<p className={styles.headerList}>Используемые языки:</p>
					<ul>
						{this.state.languages.map(({name, value}) => {
							return <li key={name}><span className={styles.spanBold}>{name}:</span> {value}%</li>
						})}
					</ul>
				</div>
				<div><span className={styles.spanBold}>Описание:</span> {this.state.description}</div>
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