import imageComponent from '@webiny/app/plugins/image'
import { plugins } from '@webiny/plugins'
import theme from 'theme'

import apolloLinks from './apolloLinks'
import formBuilder from './formBuilder'
import pageBuilder from './pageBuilder'

plugins.register([
  imageComponent(),
  pageBuilder,
  formBuilder,
  apolloLinks(),
  theme(),
])
