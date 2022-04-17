import { plugins } from '@webiny/plugins'

import apolloLinkPlugins from './apolloLinks'
import * as route from './route'

plugins.register([apolloLinkPlugins, ...Object.values(route)])
