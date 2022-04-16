import { Route } from '@m/react-router'
import React from 'react'
import { Stocking } from '../components/stocking'

/**
 * When react-router is unable to find a proper route, redirect to "/".
 */
export const routeNhapHang = {
  type: 'route',
  name: 'route-nhap-hang',
  route: <Route path="/nhap-hang" component={Stocking} />,
}
