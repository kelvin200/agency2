import 'core-js/stable'
import 'cross-fetch/polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import 'regenerator-runtime/runtime'
import { App } from './App'
import './plugins'

const render = module.hot ? ReactDOM.render : ReactDOM.hydrate
render(<App />, document.getElementById('root'))
