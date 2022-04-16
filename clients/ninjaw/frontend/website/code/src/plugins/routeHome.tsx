import { Route } from '@m/react-router'
import React from 'react'
import { Home } from '../pages/Home'

/**
 * When react-router is unable to find a proper route, redirect to "/".
 */
export const routeHome = {
  type: 'route',
  name: 'route-trang-chu',
  route: <Route path="*" component={Home} />,
}
