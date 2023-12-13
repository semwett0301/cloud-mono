import * as AWS from "aws-sdk";

export interface S3ModuleInterface {
  getObject(objectId: string): Promise<AWS.S3.Types.GetObjectOutput>;
}
