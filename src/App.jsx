import React, { Component } from 'react'
import HomePage from './HomePage/HomePage'
import RepositoryCardFool from './RepositoryCardFool/RepositoryCardFool'
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

export default class App extends Component {
	render(){
		return (
			<Router>
				<Switch>
					<Route path="/:owner/:name" component={RepositoryCardFool}/>
					<Route path="/" component={HomePage} exact/>
				</Switch>
			</Router>
		)
	}
}