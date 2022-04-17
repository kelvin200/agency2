import manageFilePlugins from '@webiny/api-file-manager/handlers/manage'
import { createHandler } from '@webiny/handler-aws'

export const handler = createHandler(manageFilePlugins())
