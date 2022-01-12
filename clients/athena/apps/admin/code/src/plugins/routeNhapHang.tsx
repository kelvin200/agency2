import { Route } from '@webiny/react-router'
import React from 'react'
import { NhapHang } from '../components/nhapHang'

/**
 * When react-router is unable to find a proper route, redirect to "/".
 */
export const routeNhapHang = {
  type: 'route',
  name: 'route-nhap-hang',
  route: <Route path="/nhap-hang" component={NhapHang} />,
}
