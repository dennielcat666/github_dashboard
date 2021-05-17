import React, { Component } from 'react'
import Oops from '../Oops/Oops'
import {Link} from "react-router-dom";
import {getUser} from '../api'
import {checkValue} from './helpers'

class OwnerCard extends Component {
	state = {
		ownerName: "", /* name */
		ownerLogin: "",  /* login */
		avatarOwner: "", /* avatar_url */
		ownerGitHubLink: "", /* html_url */
		ownerRepositories: [], /* repos_url */
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
				console.log('res res', res);
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
			? <a a target='_blank' href={this.state.ownerBlog}>{this.state.ownerBlog}</a>
			: 'Не указано'

		return(
			<div>
				<div>
					{/* Профиль */}
					<div>
						<img src={this.state.avatarOwner}/>
						<h1>{this.state.ownerName}</h1>
						<div><a target='_blank' href={this.state.ownerGitHubLink}>{this.state.ownerLogin}</a></div>
						<div>Профиль создан: {this.state.createProfile}</div>
						<div>Город: {checkValue(this.state.ownerLocation)}</div>
						<div>Компания: {checkValue(this.state.ownerCompany)}</div>
						<div>Блог: {blog}</div>
						<div>
							<div>Followers: {this.state.counterFollowers}</div>
							<div>Following: {this.state.counterFollowing}</div>
						</div>
					</div>
					{/* репозиторий */}
					<div>
						<ul>
							{this.state.ownerRepositories.map(item => {
								return(
									<li key={item.id}>
										<Link to={item.full_name}>{item.name}</Link>
									</li>
								)
							})}
						</ul>
					</div>
				</div>
				{/* фоловеры */}
				<div>
					<ul>
						{this.state.followers.map(item => {
							return(
								<li key={item.id}>
									<Link to={`/${item.login}`}>{item.login}</Link>
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