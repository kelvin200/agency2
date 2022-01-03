import { SettingsStorageOperationsProviderDdbEsPlugin } from '@webiny/api-file-manager-ddb-es/operations/settings'
import { SystemStorageOperationsProviderDdbEsPlugin } from '@webiny/api-file-manager-ddb-es/operations/system'
import { FilesStorageOperationsProviderDdbEs } from './plugin'
import { upgrades } from './upgrades'

export default () => [
  new FilesStorageOperationsProviderDdbEs(),
  new SettingsStorageOperationsProviderDdbEsPlugin(),
  new SystemStorageOperationsProviderDdbEsPlugin(),
  upgrades(),
]
