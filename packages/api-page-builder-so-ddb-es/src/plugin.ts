import fields from '@webiny/api-page-builder-so-ddb-es/operations/pages/fields'
import { PageStorageOperationsDdbEs } from '@webiny/api-page-builder-so-ddb-es/operations/pages/PageStorageOperations'
import {
  PageStorageOperationsProviderPlugin,
  Params,
} from '@webiny/api-page-builder/plugins/PageStorageOperationsProviderPlugin'
import { PageStorageOperations } from '@webiny/api-page-builder/types'

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
