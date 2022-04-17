import 'core-js/stable'
import 'cross-fetch/polyfill'
import 'regenerator-runtime/runtime'
import './plugins'

import React from 'react'
import ReactDOM from 'react-dom'

import { App } from './App'

const render = module.hot ? ReactDOM.render : ReactDOM.hydrate
render(<App />, document.getElementById('root'))
