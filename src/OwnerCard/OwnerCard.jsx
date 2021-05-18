import React, { Component } from 'react'
import Oops from '../Oops/Oops'
import {Link} from "react-router-dom";
import {getUser} from '../api'
import {checkValue} from './helpers'

import styles from './OwnerCard.module.css';

class OwnerCard extends Component {
	state = {
		ownerName: "", /* name */
		ownerLogin: "",  /* login */
		avatarOwner: "", /* avatar_url */
		ownerGitHubLink: "", /* html_url */
		ownerRepositories: [], /* repos_url */
		ownerRepositoriesCount: "",
		followers: [], /* followers_url */
		ownerCompany: "", /* company */
		ownerBlog: "", /* blog */
		ownerLocation: "", /* location */
		counterFollowers: "", /* followers */
		counterFollowing: "", /* following */
		createProfile: "", /* created_at */
		isError: false
	}

	getUserData = () => {
		const {login} = this.props.match.params
		getUser(login)
			.then(res => {
				console.log('log res', res);
				this.setState({
					ownerName: res.name,
					ownerLogin: res.login,
					avatarOwner: res.avatar_url,
					ownerGitHubLink: res.html_url,
					ownerCompany: res.company,
					ownerBlog: res.blog,
					ownerLocation: res.location,
					counterFollowers: res.followers,
					counterFollowing: res.following,
					createProfile: res.created_at, 
					followers: res.followersApi.slice(0, 10),
					ownerRepositories: res.reposApi.slice(0, 10),
					ownerRepositoriesCount: res.public_repos
				})
			})
			.catch(error => {
				console.error('Ошибка: ', error)
				this.setState({isError: true})
			})
		
	}

	componentDidMount(){
		this.getUserData()
	}

	componentDidUpdate(prevProps){
		const {login} = this.props.match.params
		if (prevProps.match.params.login !== login) {
			this.getUserData()
		}
	}

	render() {
		console.log('login', this.props);
		if(this.state.isError){
			return (
				<Oops/>
			)
		}

		const blog = this.state.ownerBlog 
			? <a a target='_blank' href={this.state.ownerBlog} className={styles.ownerInfoValueLink}>{this.state.ownerBlog}</a>
			: 'Не указано'


		const date = new Date(this.state.createProfile)
		const createProfile = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`

		return(
			<div className={styles.ownerCard}>
				<div className={styles.ownerCardProfile}>
					{/* Профиль */}
					<div className={styles.ownerProfile}>
						<img src={this.state.avatarOwner} className={styles.avatarOwner}/>
						<h1 className={styles.ownerName}>{checkValue(this.state.ownerName)}</h1>
						<div><a target='_blank' href={this.state.ownerGitHubLink} className={styles.ownerLogin}>{this.state.ownerLogin}</a></div>
						<div className={styles.ownerInfo}>Профиль создан: <span className={styles.ownerInfoValue}>{createProfile}</span></div>
						<div className={styles.ownerInfo}>Город: <span className={styles.ownerInfoValue}>{checkValue(this.state.ownerLocation)}</span></div>
						<div className={styles.ownerInfo}>Компания: <span className={styles.ownerInfoValue}>{checkValue(this.state.ownerCompany)}</span> </div>
						<div className={styles.ownerInfo}>Блог: {blog}</div>
						<div className={styles.ownerInfo}>Repositories: <a target='_blank' href={`https://github.com/${this.state.ownerLogin}?tab=repositories`} className={styles.ownerInfoValueLink}>{this.state.ownerRepositoriesCount}</a></div>
						<div className={styles.ownerInfo}>Followers: <a target='_blank' href={`https://github.com/${this.state.ownerLogin}?tab=followers`} className={styles.ownerInfoValueLink}>{this.state.counterFollowers}</a></div>
						<div className={styles.ownerInfo}>Following: <a target='_blank' href={`https://github.com/${this.state.ownerLogin}?tab=following`} className={styles.ownerInfoValueLink}>{this.state.counterFollowing}</a></div>
					</div>
					{/* репозиторий */}
					<div className={styles.ownerRepositoriesBlock}>
						<ul className={styles.ownerRepositoriesList}>
							{this.state.ownerRepositories.map(item => {
								console.log("item", item);
								return(
									<li key={item.id} className={styles.ownerRepositoryItem}>
										<Link to={item.full_name} className={styles.ownerRepositoryName}>{item.name}</Link>
										<div className={styles.ownerRepositoryDescription}>{item.description}</div>
										<div className={styles.ownerRepositoryInfo}>
											<div className={styles.ownerRepositoryLanguage}><span className={styles.ownerInfo}>Language:</span> {item.language}</div>
											<div className={styles.ownerRepositoryStars}><span className={styles.ownerInfo}>Stars:</span> {item.stargazers_count}</div>
										</div>
										
									</li>
								)
							})}
						</ul>
					</div>
				</div>
				{/* фоловеры */}
				<div className={styles.ownerFollowersBlock}>
					<div className={styles.ownerFollowersBlockName}>FOLLOWERS</div>
					<ul className={styles.ownerFollowersList}>
						{this.state.followers.map(item => {
							return(
								<li className={styles.ownerFollowersItem} key={item.id}>
									<Link to={`/${item.login}`}><img src={item.avatar_url} className={styles.avatarFollower}/><div className={styles.followerLogin}>{item.login}</div></Link>
								</li>
							)
						})}
					</ul>
				</div>
				
			</div>
		)
	}
}

export default OwnerCard