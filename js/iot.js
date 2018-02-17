var awsIot = require('aws-iot-device-sdk');
var aws = require('aws-sdk');
require('./wake.js');

aws.config.region = REGION;
aws.config.credentials = new aws.CognitoIdentityCredentials({
    IdentityPoolId: IDENTITY_POOL_ID
});

var client = undefined;

var updateCredentials = (error) => {
  if (error) {
    console.log(error);
    return;
  }
  console.log("got credentials, valid until: ", aws.config.credentials.expireTime);

  if (!client) {
      client = awsIot.device({
          region: REGION,
          protocol: 'wss',
          accessKeyId: aws.config.credentials.accessKeyId,
          secretKey: aws.config.credentials.secretAccessKey,
          sessionToken: aws.config.credentials.sessionToken,
          port: 443,
          host: IOT_ENDPOINT
      });

      client.on('connect', onConnect);
      client.on('message', onMessage);
      client.on('close', onClose);
  } else {
      client.updateWebSocketCredentials(
          aws.config.credentials.accessKeyId,
          aws.config.credentials.secretAccessKey,
          aws.config.credentials.sessionToken);
  }

  var nextUpdate = aws.config.credentials.expireTime - Date.now() - (1000 * 60 * 5);
  console.log("next credentials refresh: ", new Date(Date.now() + nextUpdate));
  window.setTimeout(() => {
    aws.config.credentials.refresh(updateCredentials);
  }, nextUpdate);
};

aws.config.credentials.get(updateCredentials);
$(document).wake(() => {
  aws.config.credentials.refresh(updateCredentials);
});

var onConnect = () => {
    client.subscribe("cosmo/data");
    console.log('Connected');
};

var onMessage = (topic, message) => {
    data = JSON.parse(message.toString());
    time = new Date(Date.parse(data.time));
    $('#time').text(time.toLocaleTimeString() + " " + time.toLocaleDateString());
    color = data.spO2 < 90 ? "red" : "green";
    $('#spO2').html("<span style='color:" + color + "'>" + data.spO2 + "</span>");
    $('#pulse').text(data.pulse);
};

var onClose = () => {
    console.log('Connection failed');
};
