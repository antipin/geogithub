import React from 'react'
import 'normalize.css'
import styles from './base-layout.css'

export default (props) => (
    <div className={styles.root}>
        {props.children}
    </div>
)
