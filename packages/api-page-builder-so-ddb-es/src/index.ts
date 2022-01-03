import { CategoryStorageOperationsDdbEsProviderPlugin } from '@webiny/api-page-builder-so-ddb-es/operations/category'
import { MenuStorageOperationsDdbEsProviderPlugin } from '@webiny/api-page-builder-so-ddb-es/operations/menu'
import { PageElementStorageOperationsDdbEsProviderPlugin } from '@webiny/api-page-builder-so-ddb-es/operations/pageElement'
import { SettingsStorageOperationsDdbEsProviderPlugin } from '@webiny/api-page-builder-so-ddb-es/operations/settings'
import { SystemStorageOperationsDdbEsProviderPlugin } from '@webiny/api-page-builder-so-ddb-es/operations/system'
import { PageStorageOperationsDdbEsProviderPlugin } from './plugin'
import { upgrades } from './upgrades'

export default () => [
  new CategoryStorageOperationsDdbEsProviderPlugin(),
  new MenuStorageOperationsDdbEsProviderPlugin(),
  new PageElementStorageOperationsDdbEsProviderPlugin(),
  new PageStorageOperationsDdbEsProviderPlugin(),
  new SystemStorageOperationsDdbEsProviderPlugin(),
  new SettingsStorageOperationsDdbEsProviderPlugin(),
  upgrades(),
]
