import { Route } from '@webiny/react-router'
import React from 'react'
import { Home } from '../components/home'
import { Stocking } from '../components/stocking'

/**
 * When react-router is unable to find a proper route, redirect to "/".
 */
export const routeTrangChu = {
  type: 'route',
  name: 'route-trang-chu',
  route: <Route path="*" component={Home} />,
}

export const routeNhapHang = {
  type: 'route',
  name: 'route-nhap-hang',
  route: <Route path="/nhap-hang" component={Stocking} />,
}
