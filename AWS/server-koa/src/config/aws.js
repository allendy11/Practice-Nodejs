const dotenv = require("dotenv");
const path = require("path");

console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "production") {
  dotenv.config({ path: path.join(__dirname, "../../.env.production") });
} else if (process.env.NODE_ENV === "development") {
  dotenv.config({ path: path.join(__dirname, "../../.env.development") });
}

const region = process.env.AWS_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const bucket = process.env.AWS_BUCKET;
const aws_option = {
  bucket,
  region,
  accessKeyId,
  secretAccessKey,
};
console.log(aws_option);

module.exports = {
  aws_option,
};
