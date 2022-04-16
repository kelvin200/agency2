import { Route } from '@webiny/react-router'
import React from 'react'
import { Home } from '../pages/Home'

/**
 * When react-router is unable to find a proper route, redirect to "/".
 */
export const routeTrangChu = {
  type: 'route',
  name: 'route-trang-chu',
  route: <Route path="*" component={Home} />,
}