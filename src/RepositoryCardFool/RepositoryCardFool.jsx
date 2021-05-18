import React, { Component } from 'react'
import Oops from '../Oops/Oops'
import {Link} from "react-router-dom";
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
				console.log('aaaaaaaaaaa', res);
				this.setState({
					repositoryName: res.name,
					gitHubLink: res.html_url,
					repositoryStars: res.stargazers_count,
					lastCommit: res.pushed_at,
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

		const date = new Date(this.state.lastCommit)
		const lastCommit = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`

		return (
			<div className={styles.cardFool}>
				<h2 ><a className={styles.cardFoolName} target='_blank' href={this.state.gitHubLink}>{this.state.repositoryName}</a></h2>
				<div className={styles.cardOwner}>
					<img src={this.state.avatarOwner} className={styles.avatarOwner} />
					<a target='_blank' href={this.state.ownerLink} className={styles.ownerLink}>{this.state.nickName}</a>
				</div>
				<div className={styles.repositoryInfo}>Stars: <span className={styles.repositoryInfoValue}>{this.state.repositoryStars}</span></div>
				<div className={styles.repositoryInfo}>Update: <span className={styles.repositoryInfoValue}>{lastCommit}</span></div>
				<div className={styles.repositoryInfo}>Описание: <span className={styles.repositoryInfoValue}>{this.state.description}</span></div>
				<div className={styles.languagesBlok}>
					<p className={styles.headerList}>Используемые языки:</p>
					<ul>
						{this.state.languages.map(({name, value}) => {
							return <li key={name} className={styles.repositoryInfo}>{name}: <span className={styles.repositoryInfoValue}>{value}%</span></li>
						})}
					</ul>
				</div>
				<div>
					<p className={styles.headerList}>Активные контрибьютеры: </p>
					<ul className={styles.contributorsList}>
						{this.state.contributors.map(item => {
							return (
								<li key={item.id} className={styles.contributorsListItem}>
									<Link className={styles.avatarContributorsLink} to={`/${item.login}`}>
										<img className={styles.avatarContributors} src={item.avatar_url} />
										<div>{item.login}</div>
									</Link>
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