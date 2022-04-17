import downloadFilePlugins from '@webiny/api-file-manager/handlers/download'
import { createHandler } from '@webiny/handler-aws'

export const handler = createHandler(downloadFilePlugins())
