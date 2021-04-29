import React, { Component } from 'react'
import {getRepository} from '../api'

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
		// console.log('props', this.props);
		if(this.state.isError){
			return (
				<div>Упс {'>_<'}</div>
			)
		}
		return (
			<div>
				<h2>{this.state.repositoryName}</h2>
				<div>{this.state.repositoryStars}</div>
				<div>{this.state.lastCommit}</div>
				<img src={this.state.avatarOwner} />
				<a target='_blank' href={this.state.ownerLink}>{this.state.nickName}</a>
				<ul>
					{Object.entries(this.state.languages).map(([key, value]) => {
						return <li key={key}>{key}: {value}</li>
					})}
				</ul>
				<div>{this.state.description}</div>
				<ul>
					{this.state.contributors.map(item => {
						return <li key={item.id}><a target='_blank' href={item.html_url}><img src={item.avatar_url} />{item.login}</a></li>
					})}
				</ul>
			</div>
		)
	}
}

export default RepositoryCardFool