import { Redirect,Route } from '@webiny/react-router'
import React from 'react'

/**
 * When react-router is unable to find a proper route, redirect to "/".
 */
export default {
  type: 'route',
  name: 'route-not-found',
  route: <Route path="*" render={() => <Redirect to={'/'} />} />,
}
