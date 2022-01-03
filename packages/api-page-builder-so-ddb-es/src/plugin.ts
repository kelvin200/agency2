import fields from '@webiny/api-page-builder-so-ddb-es/operations/pages/fields'
import {
  PageStorageOperationsProviderPlugin,
  Params,
} from '@webiny/api-page-builder/plugins/PageStorageOperationsProviderPlugin'
import { PageStorageOperations } from '@webiny/api-page-builder/types'
import { PageStorageOperationsDdbEs } from './PageStorageOperations'

export class PageStorageOperationsDdbEsProviderPlugin extends PageStorageOperationsProviderPlugin {
  public async provide({ context }: Params): Promise<PageStorageOperations> {
    /**
     * We need the installation plugin to insert the page builder elasticsearch index on before install.
     */
    context.plugins.register([fields()])

    return new PageStorageOperationsDdbEs({
      context,
    })
  }
}
