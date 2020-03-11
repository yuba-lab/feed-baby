import React from 'react'
import {render} from 'react-dom'
import './index.sass'
import App from './App'
import * as serviceWorker from './serviceWorker'

render(<App />, document.getElementById('root'))

serviceWorker.register()
