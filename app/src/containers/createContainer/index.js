/**
 * Created by kee on 15/9/28.
 */
import React, { Component } from 'react'
import base from 'styles/app.css'
import styles from './styles/index.css'

class CreateContainer extends Component {
	render() {
		return (
			<div className={base.content}>
				<div className={styles.header}>
					<p className={styles.h1}>发布</p>
				</div>
				<div>
					<div>
						标题
						<div>
							<input />
						</div>
					</div>
					<div>
						内容
						<div>
							<textarea />
						</div>
					</div>
					<div>
						类型
						<div>
						// TUDO
						</div>
					</div>
				</div>
			</div>
		)
	}
}
export default CreateContainer
