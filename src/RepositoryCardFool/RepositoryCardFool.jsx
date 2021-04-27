import React, { Component } from 'react'
import {getRepository} from '../api'

class RepositoryCardFool extends Component{

	state = {
		repositoryName: "Заголовок",
		repositoryStars: "Звездячки",
		lastCommit: "Дата последнего коммита",
		avatarOwner: "Фото владельца репозитория, если есть",
		nickName: "Nickname владельца репозитория с ссылкой на него",
		ownerLink: "ссылка",
		languages: "Список используемых языков в репозитории",
		description: "Краткое описание репозитория",
		contributors: "10 наиболее активных контрибьютеров",
	}

	componentDidMount(){
		const {owner, name} = this.props.match.params
		getRepository(owner, name)
			.then(res => {
				this.setState({
					repositoryName: res.name,
					repositoryStars: res.stargazers_count,
					lastCommit: res.updated_at,
					avatarOwner: res.owner.avatar_url,
					nickName: res.owner.login,
					ownerLink: res.owner.html_url,
					// languages: "Список используемых языков в репозитории",
					description: res.description,
					// contributors: "10 наиболее активных контрибьютеров",
				})
			})
	}

	render(){
		console.log('props', this.props);
		return (
			<div>
				<h2>{this.state.repositoryName}</h2>
				<div>{this.state.repositoryStars}</div>
				<div>{this.state.lastCommit}</div>
				<img src={this.state.avatarOwner} />
				<a target='_blank' href={this.state.ownerLink}>{this.state.nickName}</a>
				<ul>
					<li>Список используемых языков в репозитории</li>
				</ul>
				<div>{this.state.description}</div>
				<ul>
					<li>10 наиболее активных контрибьютеров</li>
				</ul>
			</div>
		)
	}
}

export default RepositoryCardFool