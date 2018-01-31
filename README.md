# Cosmoweb

Pulse oxymetry live monitoring. Intended to be used with
[cosmopusher](https://github.com/konz/cosmopusher).

*Work in progress!*

## Installation

```bash
# setup the necessary infrastructure in AWS
aws cloudformation deploy --stack-name cosmoweb --template-file cloudformation/website.yaml --capabilities CAPABILITY_NAMED_IAM

# make AWS resources known to the build
source ./setup-env.sh

# install the required modules
npm install
# build the website
npm run build

# upload
aws s3 sync --delete dist s3://$BUCKET
```
