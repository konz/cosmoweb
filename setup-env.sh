# Get the generated Cognito identity pool id
export IDENTITY_POOL_ID=$(aws cloudformation describe-stacks --stack-name cosmoweb --query "Stacks[0].Outputs[?OutputKey=='cognitoIdentityPoolId'].OutputValue" --output text)
# get the generated S3 bucket
export BUCKET=$(aws cloudformation describe-stacks --stack-name cosmoweb --query "Stacks[0].Outputs[?OutputKey=='bucketName'].OutputValue" --output text)

export IOT_ENDPOINT=$(aws iot describe-endpoint --output text)
export AWS_REGION=$(aws configure get region)
