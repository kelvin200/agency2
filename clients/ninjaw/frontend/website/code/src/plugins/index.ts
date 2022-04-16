import { plugins } from '@m/plugins'
import apolloLinkPlugins from './apolloLinks'
import { routeHome } from './routeHome'
import { routeNhapHang } from './routeNhapHang'

plugins.register([apolloLinkPlugins, routeNhapHang, routeHome])
