import { pulumi } from '../../../pulumi'

export = async () =>
  pulumi({
    CLIENT_NAME: 'athena',
    APP_ADMIN_FOLDER: 'app-admin',
    APP_WEBSITE_FOLDER: 'app-website',
  })
