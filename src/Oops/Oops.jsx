import React, { Component } from 'react'

import styles from './Oops.module.css';

class Oops extends Component{

	render(){
		return (
			<div className={styles.oops}>Упс... {'>_<'}</div>
		)
	}
}

export default Oops