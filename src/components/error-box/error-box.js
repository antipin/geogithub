import React from 'react'
import style from './error-box.css'

export default ({ title = 'Oops...', children }) => (
    <div className={style.root}>
        <div className={style.dialog}>
            <h2 className={style.dialogTitle}>
                { title }
            </h2>
            <div className={style.dialogBody}>
                { children }
            </div>
        </div>
    </div>
)
