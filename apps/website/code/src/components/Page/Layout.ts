import { PbPageLayoutPlugin } from '@webiny/app-page-builder/types'
import { plugins } from '@webiny/plugins'
import { createElement,useMemo } from 'react'

const Layout = ({ page, settings, children }) => {
  const layouts = useMemo(() => {
    const layoutPlugins = plugins.byType<PbPageLayoutPlugin>('pb-page-layout')
    return layoutPlugins.map(pl => pl.layout)
  }, [])

  const themeLayout = layouts.find(l => l.name === page.settings.general.layout)

  if (!themeLayout) {
    return children
  }

  return createElement(themeLayout.component, { page, settings }, children)
}

export default Layout
