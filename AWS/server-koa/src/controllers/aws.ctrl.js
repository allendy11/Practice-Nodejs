const { aws_options } = require("../config/aws");
const { db, db_options } = require("../config/database");
const mime = require("mime-types");
const fs = require("fs");
const path = require("path");
const { S3Client } = require("@aws-sdk/client-s3");

const { region, accessKeyId, secretAccessKey, bucket, s3api } = aws_options;

exports.createBucket = async (ctx, next) => {
  const { CreateBucketCommand } = require("@aws-sdk/client-s3");

  const bucketName = ctx.request.body.name;
  console.log(`request create bucket name is ${bucketName}`);

  const client = new S3Client({ region: aws_options.region });
  const params = { Bucket: bucketName };
  const command = new CreateBucketCommand(params);

  try {
    const { Location } = await client.send(command);
    ctx.body = { message: `Bucket created with location ${Location}` };
  } catch (err) {
    console.error(err.message);
    ctx.throw(err.code || 500, err.message);
  }
};

exports.getBucketList = async (ctx, next) => {
  const { ListBucketsCommand } = require("@aws-sdk/client-s3");

  const client = new S3Client({ region: aws_options.region });
  const params = { Bucket: aws_options.bucket };
  const command = new ListBucketsCommand(params);
  try {
    const { Owner, Buckets } = await client.send(command);

    ctx.body = {
      owner: Owner.DisplayName,
      count: Buckets.length,
      list: Buckets,
    };
  } catch (err) {
    ctx.throw(err.status || 500, err.message);
  }
};

exports.getObjectFromBucket = async (ctx, next) => {
  const { ListObjectsV2Command } = require("@aws-sdk/client-s3");

  const { name } = ctx.request.params;
  const client = new S3Client({ region: aws_options.region });
  const command = new ListObjectsV2Command({
    Bucket: aws_options.bucket,
  });

  try {
    let isTruncated = true;

    console.log("Your bucket contains the following objects:\n");
    let contents = [];

    while (isTruncated) {
      const { Contents, IsTruncated, NextContinuationToken } =
        await client.send(command);
      // const contentsList = Contents.map((c) => ` • ${c.Key}`).join("\n");
      // contents += contentsList + "\n";
      // console.log(Contents);
      contents = Contents.slice();
      isTruncated = IsTruncated;
      command.input.ContinuationToken = NextContinuationToken;
    }
    // console.log(Contents);
    ctx.body = {
      contents,
    };
  } catch (err) {
    console.error(err);
  }
};
exports.getObject = async (ctx, next) => {
  try {
    const { GetObjectCommand } = require("@aws-sdk/client-s3");
    // let file_path = `logo.jpg`;
    let file_path = `installs/HPOmniceptSetup.exe`;
    const params = {
      Bucket: bucket,
      Key: file_path,
    };
    console.log(params);

    const s3Client = new S3Client({ region });

    const response = await s3Client.send(new GetObjectCommand(params));
    // console.log(response);
    const stream = response.Body;
    // console.log(stream);
    let buffer = Buffer.concat(await stream.toArray());
    console.log(buffer);
    var mimeType = mime.lookup("xml");
    console.log(mimeType);

    ctx.response.set("content-type", mimeType);

    // ctx.response.set("content-type", "application/xml");
    // ctx.response.set("content-disposition", "attachment; filename=logo.jpg");
    // ctx.body = ctx.req.pipe(buffer);
  } catch (err) {
    console.log(err);
    ctx.throw(err.status || err.message);
  }
};
exports.getImage = async (ctx, next) => {
  try {
    let _path = path.join(__dirname, "../images/test_img.jpg");
    var mimeType = mime.lookup(_path);
    const src = fs.createReadStream(_path);
    console.log(src);
    ctx.response.set("content-type", mimeType);
    // ctx.response.set("content-disposition", "attachment; filename=logo.jpg");
    ctx.body = src;
  } catch (err) {
    ctx.throw(err.status || err.message);
  }
};
