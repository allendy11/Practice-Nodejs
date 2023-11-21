const region = process.env.AWS_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const bucket = process.env.AWS_BUCKET;
const s3api = process.env.AWS_S3_API;

const aws_options = {
  region,
  accessKeyId,
  secretAccessKey,
  bucket,
  s3api,
};
console.log(aws_options);
module.exports = { aws_options };
