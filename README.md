# Cosmoweb

Pulse oxymetry live monitoring. Intended to be used with
[cosmopusher](https://github.com/konz/cosmopusher).

*Work in progress!*

## Installation

```bash
aws cloudformation deploy --stack-name cosmoweb --template-file cloudformation/website.yaml --capabilities CAPABILITY_NAMED_IAM

# Get the generated Cognito identity pool id
IDENTITY_POOL_ID=$(aws cloudformation describe-stacks --stack-name cosmoweb --query "Stacks[0].Outputs[?OutputKey=='cognitoIdentityPoolId'].OutputValue" --output text)
# get the generated S3 bucket
BUCKET=$(aws cloudformation describe-stacks --stack-name cosmoweb --query "Stacks[0].Outputs[?OutputKey=='bucketName'].OutputValue" --output text)

IOT_ENDPOINT=$(aws iot describe-endpoint --output text)
AWS_REGION=$(aws configure get region)

# install the required modules
npm install
# build the website
npm run build

# upload
aws s3 sync dist s3://$BUCKET
```
