import { tagResources } from '@webiny/cli-plugin-deploy-pulumi/utils'
import { AppAdmin } from './app-admin'
import { S3 } from './s3'

interface Vars {
  APP_ADMIN_FOLDER: string
  APP_WEBSITE_FOLDER: string
  CLIENT_NAME: string
}
export const pulumi = ({
  APP_ADMIN_FOLDER,
  APP_WEBSITE_FOLDER,
  CLIENT_NAME,
}: Vars) => {
  // Add tags to all resources that support tagging.
  tagResources({
    Environment: process.env.WEBINY_ENV as string,
    ClientName: CLIENT_NAME,
  })

  const s3 = new S3(CLIENT_NAME, [APP_ADMIN_FOLDER, APP_WEBSITE_FOLDER])
  const appAdmin = new AppAdmin(CLIENT_NAME, APP_ADMIN_FOLDER, s3.bucket)

  return {
    appStorage: s3.bucket.id,
    appUrl: appAdmin.distribution.domainName.apply(value => `https://${value}`),
  }
}
