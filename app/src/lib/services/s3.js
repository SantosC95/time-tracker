import path from "path"
import fs from "fs-extra"
import AWS from "aws-sdk"
AWS.config.update({ region: 'us-east-1' });
const S3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    params: {
        Bucket: process.env.BUCKET
    }
});

export const saveImage = async ( filepath, key ) => {
    try {
        /* Determine Content Type */
        const contentType = path.extname(filepath).split('.')[1] === 'jpg' ?
            'jpeg' : path.extname(filepath).split('.')[1];        

        const body = await fs.readFile(filepath);
        const params = {
            Key: key,
            ContentType: `image/${contentType}`,
            Body: body
        }

        return S3.upload(params).promise()
    } catch (error) {
        console.log(`Error: ${error.message} | ${error.stack}`, error);
    }
}

export const deleteImage = async ( key ) => {
    const params = { Key: key };
    return S3.deleteObject(params).promise();
}