import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Root } from '../../components'

function makeRenderer({ store }) {

    return () => {

        render(
            (
                <Provider store={store}>
                    <Root/>
                </Provider>
            ),
            document.getElementById('geogihub')
        )

    }

}

export default makeRenderer