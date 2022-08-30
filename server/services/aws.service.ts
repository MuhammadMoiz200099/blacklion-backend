import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

export class AwsService {

    private s3: S3Client;

    constructor() {
        this.s3 = new S3Client({
            region: process.env.S3_AWS_BUCKET_REGION,
            credentials: {
                accessKeyId: process.env.S3_AWS_BUCKET_ACCESS_KEY_ID,
                secretAccessKey: process.env.S3_AWS_BUCKET_SECRET_KEY
            }
        })
    }

    async getFromAWSCloudS3(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const params = {
                    Bucket: process.env.S3_AWS_BUCKET_NAME,
                    Key: id
                };  
                const command = new GetObjectCommand(params);
                const url = await getSignedUrl(this.s3, command);
                return resolve(url);
            } catch (err) {
                return reject(err);
            }
        })
    }

    async uploadToAWSCloudS3(file) {
        return new Promise(async (resolve, reject) => {
            try {
                const params = {
                    Bucket: process.env.S3_AWS_BUCKET_NAME,
                    Body: file.buffer,
                    Key: file.originalname
                }
                const command = new PutObjectCommand(params);
                const send = await this.s3.send(command);
                return resolve(send);
            } catch (err) {
                return reject(err);
            }
        })
    }

    async removeFromAWSCloudS3(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const params = {
                    Bucket: process.env.S3_AWS_BUCKET_NAME,
                    Key: id
                };
                const command = new DeleteObjectCommand(params);
                const send = await this.s3.send(command);
                return resolve(send);
            } catch (err) {
                return reject(err);
            }
        })
    }

}

export default new AwsService();