# Cosmoweb

Pulse oxymetry live monitoring. Intended to be used with
[cosmopusher](https://github.com/konz/cosmopusher).

*Work in progress!*

## Installation

```bash
aws cloudformation deploy --stack-name cosmoweb --template-file cloudformation/website.yaml --capabilities CAPABILITY_NAMED_IAM

source ./setup-env.sh

# install the required modules
npm install
# build the website
npm run build

# upload
aws s3 sync dist s3://$BUCKET
```
