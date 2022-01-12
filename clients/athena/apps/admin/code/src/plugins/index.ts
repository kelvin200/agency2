import { plugins } from '@webiny/plugins'
import apolloLinkPlugins from './apolloLinks'
import { routeNhapHang } from './routeNhapHang'
import { routeTrangChu } from './routeTrangChu'

plugins.register([apolloLinkPlugins, routeNhapHang, routeTrangChu])
