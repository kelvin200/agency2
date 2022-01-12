import * as aws from '@pulumi/aws'

export class AppAdmin {
  distribution: aws.cloudfront.Distribution

  constructor(CLIENT_NAME: string, APP_ADMIN_FOLDER: string, s3Bucket: aws.s3.Bucket) {
    const INDEX_PATH = `${APP_ADMIN_FOLDER}/index.html`

    this.distribution = new aws.cloudfront.Distribution(`${CLIENT_NAME}-${APP_ADMIN_FOLDER}-cdn`, {
      enabled: true,
      waitForDeployment: false,
      origins: [
        {
          originId: s3Bucket.arn.apply(n => `${n}-${APP_ADMIN_FOLDER}`),
          domainName: s3Bucket.bucketDomainName.apply(n => `${APP_ADMIN_FOLDER}.${n}`),
          customOriginConfig: {
            originProtocolPolicy: 'http-only',
            httpPort: 80,
            httpsPort: 443,
            originSslProtocols: ['TLSv1.2'],
          },
        },
      ],
      defaultRootObject: INDEX_PATH,
      defaultCacheBehavior: {
        compress: true,
        targetOriginId: s3Bucket.arn.apply(n => `${n}-${APP_ADMIN_FOLDER}`),
        viewerProtocolPolicy: 'redirect-to-https',
        allowedMethods: ['GET', 'HEAD', 'OPTIONS'],
        cachedMethods: ['GET', 'HEAD', 'OPTIONS'],
        forwardedValues: {
          cookies: { forward: 'none' },
          queryString: false,
        },
        // MinTTL <= DefaultTTL <= MaxTTL
        minTtl: 0,
        defaultTtl: 600,
        maxTtl: 600,
      },
      priceClass: 'PriceClass_100',
      // customErrorResponses: [{ errorCode: 404, responseCode: 404, responsePagePath: INDEX_PATH }],
      restrictions: {
        geoRestriction: {
          restrictionType: 'none',
        },
      },
      viewerCertificate: {
        cloudfrontDefaultCertificate: true,
      },
    })
  }
}
