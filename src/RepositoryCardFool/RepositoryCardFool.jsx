import React, { Component } from 'react'

class RepositoryCardFool extends Component{

	render(){
		return (
			<div>
				<h2>Заголовок</h2>
				<div>Звездячки</div>
				<div>Дата последнего коммита</div>
				<div>Фото владельца репозитория, если есть</div>
				<a>Nickname владельца репозитория с ссылкой на него</a>
				<ul>
					<li>Список используемых языков в репозитории</li>
				</ul>
				<div>Краткое описание репозитория</div>
				<ul>
					<li>10 наиболее активных контрибьютеров</li>
				</ul>
			</div>
		)
	}
}

export default RepositoryCardFool