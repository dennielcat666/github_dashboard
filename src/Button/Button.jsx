import React, { Component } from 'react'
import cn from 'classnames'

import styles from './Button.module.css';

class Button extends Component{

	render(){
		const {children, className} = this.props
		return (
			<button className={cn(styles.btn, className)}>{children}</button>
		)
	}
}

export default Button