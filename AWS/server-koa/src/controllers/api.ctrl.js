// const { db } = require("../config/database");
const { aws_option } = require("../config/aws");
const AWS = require("aws-sdk");
const {
  S3Client,
  ListBucketsCommand,
  ListObjectsV2Command,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");
const { bucket, region, accessKeyId, secretAccessKey } = aws_option;

exports.list = async (ctx, next) => {
  const client = new S3Client({ region });
  const command = new ListObjectsV2Command({
    Bucket: bucket,
    MaxKeys: 1,
  });
  try {
    let isTruncated = true;

    console.log("Your bucket contains the following objects:\n");
    let contents = "";

    while (isTruncated) {
      const { Contents, IsTruncated, NextContinuationToken } =
        await client.send(command);
      const contentsList = Contents.map((c) => ` • ${c.Key}`).join("\n");
      contents += contentsList + "\n";
      isTruncated = IsTruncated;
      command.input.ContinuationToken = NextContinuationToken;
    }
    console.log(contents);
    const list = contents.split("\n");
    ctx.body = {
      contents: list,
    };
  } catch (err) {
    console.error(err);
  }
};

exports.download = async (ctx, next) => {
  const client = new S3Client({ region });
  const command = new GetObjectCommand({
    Bucket: bucket,
    Key: accessKeyId,
  });

  try {
    const response = await client.send(command);
    // The Body object also has 'transformToByteArray' and 'transformToWebStream' methods.
    const str = await response.Body.transformToString();
    console.log(str);
    ctx.status = 200;
    ctx.body = {
      message: "downloading ...",
      str,
    };
  } catch (err) {
    console.error(err);
  }
};

exports.download2 = async (ctx, next) => {
  AWS.config.update({
    accessKeyId,
    secretAccessKey,
    region,
  });
  var s3 = new AWS.S3();
  var options = {
    Bucket: bucket,
    Key: "./installs/HPOmniceptSetup.exe",
  };
  var fileStream = s3.getObject(options).createReadStream();
  fileStream.pipe(ctx.response);
};
