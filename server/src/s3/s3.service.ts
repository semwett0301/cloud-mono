import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';

import { S3ModuleInterface } from './interfaces';

@Injectable()
export class S3Service implements S3ModuleInterface {
  private s3: AWS.S3;

  constructor() {
    this.s3 = new AWS.S3({
      accessKeyId: process.env.S3_ACCESS_KEY,
      endpoint: process.env.S3_ENDPOINT,
      secretAccessKey: process.env.S3_SECRET_KEY,
    });
  }

  async getObject(objectId: string) {
    const params: AWS.S3.GetObjectRequest = {
      Bucket: process.env.S3_BUCKET,
      Key: objectId,
    };

    return await this.s3.getObject(params).promise();
  }
}
