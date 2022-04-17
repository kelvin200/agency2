import transformFilePlugins from '@webiny/api-file-manager/handlers/transform'
import { createHandler } from '@webiny/handler-aws'

export const handler = createHandler(transformFilePlugins())
