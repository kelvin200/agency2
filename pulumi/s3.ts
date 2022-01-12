import * as aws from '@pulumi/aws'

export class S3 {
  bucket: aws.s3.Bucket

  constructor(CLIENT_NAME, publicFolders: string[]) {
    this.bucket = new aws.s3.Bucket(CLIENT_NAME, {
      acl: 'private',
      forceDestroy: true,
    })

    this.bucket.bucket.apply(bucketName => {
      new aws.s3.BucketPolicy(
        `${CLIENT_NAME}-bucketPolicy`,
        {
          bucket: bucketName,
          policy: JSON.stringify({
            Version: '2012-10-17',
            Statement: [
              {
                Effect: 'Allow',
                Principal: '*',
                Action: ['s3:GetObject'],
                Resource: publicFolders.map(x => `arn:aws:s3:::${bucketName}/${x}`),
              },
            ],
          }),
        },
        { parent: this.bucket },
      )
    })
  }
}
