import 'core-js/stable'
import 'cross-fetch/polyfill'
import 'regenerator-runtime/runtime'
import './global.scss'
import 'antd/dist/antd.css'
import './common.scss'
import './components.scss'
import './plugins'

import React from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'

import { App } from './App'

const container = document.getElementById('root')
if (module.hot) {
  createRoot(container).render(<App />)
} else {
  hydrateRoot(container, <App />)
}
