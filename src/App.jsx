import React, { Component } from 'react'
import HomePage from './HomePage/HomePage'
import SearchRepositories from './SearchRepositories/SearchRepositories'
import RepositoryCardFool from './RepositoryCardFool/RepositoryCardFool'
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

import './App.css'

export default class App extends Component {
	render(){
		return (
			<Router>
				<Switch>
					<Route path="/:owner/:name" component={RepositoryCardFool}/>
					<Route path="/search" component={SearchRepositories}/>
					<Route path="/" component={HomePage} exact/>
				</Switch>
			</Router>
		)
	}
}